# Prefer date-fns to moment for better tree-shaking support (`ben/no-moment`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

점진적으로 `date-fns`로 마이그레이션하여 `moment` 패키지를 제거하기 위함입니다.

Examples of **incorrect** code for this rule:

```js
import moment from 'moment';
```

Examples of **correct** code for this rule:

```js
import { format } from 'date-fns';
```

## When Not To Use It

`moment`에서 `date-fns`로 마이그레이션이 완료된 후, `moment` 패키지를 사용하지 않게 되면 이 규칙을 비활성화할 수 있습니다.
