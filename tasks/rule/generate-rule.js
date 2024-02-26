/**
 * This file is based on the code from the eslint-plugin-storybook project found at:
 * https://github.com/storybookjs/eslint-plugin-storybook/blob/main/tools/generate-rule.ts
 *
 * It has been modified to fit the specific needs of our project. I thank the contributors
 * of the eslint-plugin-storybook for their work and for making their code available for reuse
 * under the MIT license.
 */

const path = require('node:path');
const fs = require('node:fs/promises');
const cp = require('node:child_process');
const { exit } = require('node:process');

const dedent = require('dedent');
const prompts = require('prompts');
const _ = require('lodash');
const chalk = require('chalk');

/**
 * Regex for valid IDs
 * @type {RegExp}
 */
const rValidId = /^(?:[a-z0-9]+(?:-[a-z0-9]+)*)$/u;

/**
 * Determines if a given ruleId is valid. This is used by the prompt system.
 * @param {string} ruleId The rule ID to check.
 * @returns {boolean|string} True if valid, a string with an error message if not.
 */
const isRuleId = (ruleId) => {
  if (rValidId.test(ruleId)) {
    return true;
  }
  return 'Rule ID must be all lowercase with dashes as separators.';
};

/**
 * Validates that a value has been provided. This is used for validating
 * user input using prompts.
 * @param {string} value The inputted value.
 * @returns {boolean|string} True if valid, a string with an error message if not.
 */
const isNotEmpty = (value) => {
  if (value.trim() === '') {
    return 'Please provide a value';
  }
  return true;
};

/**
 * Questions to ask the user to create a new rule.
 * @type {import('prompts').PromptObject[]}
 */
const questions = [
  {
    type: 'text',
    name: 'authorName',
    message: 'What is your name? (to be given credit for the rule)',
    validate: isNotEmpty,
  },
  {
    type: 'text',
    name: 'ruleId',
    message: dedent(`Time to name your rule! Follow the ESLint rule naming conventions:

      - If your rule is disallowing something, prefix it with no- such as no-eval for disallowing eval() and no-debugger for disallowing debugger.
      - If your rule is enforcing the inclusion of something, use a short name without a special prefix.
      - Use dashes between words.
      What is the ID of this new rule?
    `),
    validate: isRuleId,
  },
  {
    type: 'text',
    name: 'ruleDescription',
    message: 'Type a short description of this rule',
    validate: isNotEmpty,
  },
  {
    type: 'text',
    name: 'invalidCode',
    message: 'Type a short example of the code that will fail:',
    initial: 'const foo = "bar";',
  },
];

const createRule = async () => {
  console.log(
    '👋 Please answer a few questions so I can provide everything you need for your new rule.',
  );
  console.log();
  const { authorName, ruleId, ruleDescription, invalidCode } = await prompts(questions, {
    onCancel: () => {
      console.log('Process canceled by the user.');
      exit(0);
    },
  });

  const ruleFile = path.resolve(__dirname, `../../lib/rules/${ruleId}.js`);
  const testFile = path.resolve(__dirname, `../../tests/lib/rules/${ruleId}.test.js`);
  const docFile = path.resolve(__dirname, `../../docs/rules/${ruleId}.md`);

  const templateRuleFile = await fs.readFile(path.resolve(__dirname, 'templates/_rule.js'), 'utf8');
  const templateTestFile = await fs.readFile(
    path.resolve(__dirname, './templates/_test.js'),
    'utf8',
  );
  const templateDocFile = await fs.readFile(path.resolve(__dirname, './templates/_doc.md'), 'utf8');

  const files = [
    {
      path: ruleFile,
      content: templateRuleFile,
    },
    {
      path: testFile,
      content: templateTestFile,
    },
    {
      path: docFile,
      content: templateDocFile,
    },
  ];

  let compiledFiles;
  try {
    compiledFiles = files.map((file) => {
      const compiled = _.template(file.content);
      return {
        path: file.path,
        content: compiled({
          ruleDescription,
          authorName,
          ruleId,
          invalidCode,
        }),
      };
    });

    const promises = compiledFiles.map((file) => fs.writeFile(file.path, file.content));
    await Promise.all(promises);

    console.log(chalk.green(`create lib/rules/${ruleId}.js`));
    console.log(chalk.green(`create tests/lib/rules/${ruleId}.test.js`));
    console.log(chalk.green(`create docs/rules/${ruleId}.md`));
  } catch (error) {
    console.error('An error occurred while creating the files:', error);
    if (compiledFiles) {
      // Rollback any files that were created before the error occurred
      await Promise.allSettled(compiledFiles.map((file) => fs.unlink(file.path).catch(() => {})));
    }
    exit(1);
  }

  const { shouldOpenInVSCode } = await prompts({
    type: 'confirm',
    name: 'shouldOpenInVSCode',
    message: 'Do you want to open the newly created files in VS Code?',
    initial: false,
  });

  if (shouldOpenInVSCode) {
    cp.execSync(`code "${ruleFile}"`);
    cp.execSync(`code "${testFile}"`);
    cp.execSync(`code "${docFile}"`);
  }

  console.log(
    `\n🚀 All done! Make sure to run \`${chalk.blue('npm run test')}\` as you write the rule and \`${chalk.blue('npm run update:eslint-docs')}\` when you are done.`,
  );
};

createRule().catch((error) => {
  console.error('An error occurred while creating the rule:', error);
  exit(1);
});
