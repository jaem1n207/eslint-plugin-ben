# Prefer lodash-es to lodash for better tree-shaking support (`ben/no-lodash`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

점진적으로 `lodash-es`로 마이그레이션하여 `lodash` 패키지를 제거하기 위함입니다.

Examples of **incorrect** code for this rule:

```js
import _ from 'lodash';
```

Examples of **correct** code for this rule:

```js
import { isArray } from 'lodash-es';
```

## When Not To Use It

`lodash`에서 `lodash-es`로 마이그레이션이 완료된 후, `lodash` 패키지를 사용하지 않게 되면 이 규칙을 사용하지 않는 것이 좋습니다.
