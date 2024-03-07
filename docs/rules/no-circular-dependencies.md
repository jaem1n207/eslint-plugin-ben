# Detect circular dependencies between modules (`ben/no-circular-dependencies`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule Details

`ben/no-circular-dependencies` 규칙은 모듈 간의 순환 의존성을 감지하고 경고합니다. 순환 의존성은 모듈 A가 모듈 B를 필요로 하고, 동시에 모듈 B가 직접적이거나 간접적으로 모듈 A를 필요로 하는 상황을 의미합니다. 이러한 순환 의존성은 프로젝트의 유지보수성을 저하시키고, 초기화 및 실행 순서 문제를 야기할 수 있습니다.

Examples of **correct** code for this rule:

```js
// A.js
const B = require('./B');
module.exports = () => {
  console.log('B', B);
};

// B.js
const A = require('./A');
module.exports = () => {
  console.log('A', A);
};

// C.js
const A = require('./A');
const B = require('./B');
A();
B();
```

### Options

#### `maxDepth`

이 옵션은 순환 의존성을 감지할 때 고려할 최대 깊이를 지정합니다. `maxDepth`가 1로 설정된 경우, 직접적인 순환 의존성만을 감지하며, 더 깊은 순환 의존성은 무시합니다. (기본값: Number.MAX_SAFE_INTEGER)

`.eslintrc` 파일 또는 ESLint 설정에 다음과 같이 규칙을 추가하여 사용할 수 있습니다:

```json
{
  "rules": {
    "ben/no-circular-dependencies": [2, { "maxDepth": 1 }]
  }
}
```

위의 설정은 직접적인 순환 의존성만을 감지하도록 규칙을 구성합니다. `maxDepth` 옵션을 조정하여 다른 깊이의 순환 의존성을 감지하도록 설정할 수 있습니다.

이 규칙은 모든 import 선언을 추적하여 모듈 간의 의존성 그래프를 구성합니다. 프로그램의 분석이 끝날 때(Program:exit), 이 규칙은 구성된 의존성 그래프를 사용하여 순환 의존성을 감지합니다. 감지된 순환 의존성은 ESLint 경고로 보고됩니다.

## When Not To Use It

의존성 순환 문제가 없다고 판단되면 이 규칙을 사용하지 않는 것이 좋습니다.

순환 의존성은 프로젝트의 구조를 개선함으로써 해결할 수 있습니다. 예를 들어, 공통 기능을 별도의 모듈로 분리하거나, 인터페이스를 사용하여 의존성을 역전시키는 방법 등이 있습니다
