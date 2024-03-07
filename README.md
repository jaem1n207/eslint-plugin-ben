# eslint-plugin-ben

ESLint rules for me

## 설치

### `eslint` 설치

[ESLint](https://eslint.org/)를 먼저 설치해주세요:

```sh
npm i eslint --save-dev
```

그 다음, `.eslintrc.js` 파일을 생성해주세요:

```javascript
module.exports = {
  root: true,
};
```

### eslint-plugin-ben 설치

`eslint-plugin-ben`를 설치해주세요:

```sh
npm install eslint-plugin-ben --save-dev
```

이 플러그인에는 **추천 설정이 함께 제공**됩니다. `.eslintrc` 파일에서 `extends` 속성에 `plugin:ben/recommended`를 추가해주세요:

```json
{
  "extends": ["plugin:ben/recommended"]
}
```

> 제공되는 프리셋을 사용하지 않는 경우 개별 규칙을 설정하고 일부 구성을 추가해야 합니다...

## 규칙 재설정하기

특정 규칙을 재설정하고 싶다면, `rules` 섹션에서 해당 규칙을 오버라이드할 수 있습니다. 예를 들어, `no-lodash` 규칙을 비활성화하고 `no-moment` 규칙을 오류로 표시하려면 다음과 같이 설정하세요.

```json
{
  "extends": ["plugin:ben/recommended"],
  "rules": {
    "ben/no-lodash": "off",
    "ben/no-moment": "error"
  }
}
```

## 구성

<!-- prettier-ignore-start -->

<!-- begin auto-generated configs list -->

|    | Name          |
| :- | :------------ |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->

<!-- prettier-ignore-end -->

## 규칙들

<!-- prettier-ignore-start -->

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                               | Description                                                | 💼 | ⚠️ | 🔧 |
| :----------------------------------------------------------------- | :--------------------------------------------------------- | :- | :- | :- |
| [no-circular-dependencies](docs/rules/no-circular-dependencies.md) | detect circular dependencies between modules               | ✅  |    |    |
| [no-lodash](docs/rules/no-lodash.md)                               | prefer lodash-es to lodash for better tree-shaking support |    | ✅  | 🔧 |
| [no-moment](docs/rules/no-moment.md)                               | prefer date-fns to moment for better tree-shaking support  |    | ✅  | 🔧 |

<!-- end auto-generated rules list -->

<!-- prettier-ignore-end -->

## 기여하기

eslint-plugin-ben 라이브러리에 기여하고 싶다면 아래 문서를 참고해주세요.

[CONTRIBUTING](/CONTRIBUTING.md)
