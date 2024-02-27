# 라이브러리에 기여하기

커뮤니티의 모든 분들의 기여에 감사합니다!

> eslint-plugin-ben의 모든 기여자는 행동 강령을 준수해야 합니다.
> [전문](.github/CODE_OF_CONDUCT.md)을 읽고 어떤 행동이 용납되고 어떤 행동이 용납되지 않는지 이해하시기 바랍니다.

## 시작하는 방법

`eslint`를 처음 사용하는 경우 프로젝트에 익숙해지는 데 도움이 되는 몇 가지 리소스를 소개합니다:

- [Youtube: Master the art of the AST and take control of your JS](https://www.youtube.com/watch?v=2W9tUnALrLg&ab_channel=Codegram)을 통해 AST(추상 구문 트리)의 기본 개념과 `eslint`의 내부 작동 방식을 알아보세요.
- [AST explorer](https://astexplorer.net/) 도구에 익숙해져 보세요. `docs/rules`에서 규칙을 살펴보고, 규칙에 패턴을 만든 다음, 해당 AST를 분석하세요.
- 사용자 지정 규칙을 만드는 방법에 대한 블로그를 살펴보세요. [One blog post](https://blog.yonatan.dev/writing-a-custom-eslint-rule-to-spot-undeclared-props/). [Second blog post](https://betterprogramming.pub/creating-custom-eslint-rules-cdc579694608).
- 공식 `eslint` [개발자 가이드](https://eslint.org/docs/latest/contribute/architecture/)를 읽어보세요.

### 시작점 모듈 생성

작업하기 전에, 프로젝트의 시작점이 되는 모듈을 생성해야 합니다:

```sh
npm run build
```

### 규칙 추가

규칙을 추가하기 위해 아래 명령을 실행합니다:

```sh
npm run generate-rule
```

생성된 파일(`lib/rules<rule-name>.js`, `tests/lib/rules/<rule-name>.test.js`, `docs/rules/<rule-name>.md`)을 업데이트합니다.

### 규칙 테스트

테스트 케이스를 작성할 시간이 충분하다면 더할 나위 없이 좋습니다! 핵심 기여자나 다른 PR이 작업을 안전하게 계속할 수 있는 좋은 출발점이 될 수 있습니다.

### 문서 업데이트

규칙을 개선하려면 `lib/rules`의 규칙 파일 이름과 일치하는 `docs/rules`의 문서의 규칙 설명을 업데이트하세요. `npm run update:eslint-docs`를 실행하면 `README.md` 및 규칙 문서 헤더가 업데이트됩니다.

버그 수정으로 인해 문서가 변경될 필요는 없지만 기존 문서를 훑어보고 제거해야 할 관련 경고가 있는지 확인하는 것이 좋습니다.

### 코드 퀄리티 유지

커밋 전, 아래 명령어를 실행하여 코드 품질을 유지해주세요:

```sh
npm run all-in-one
```

기본적으로 git hook을 이용해 품질을 검사하지만 위 명령어를 통해 한 번 더 확인해보는 게 좋습니다.

## Issues

eslint-plugin-ben 라이브러리는 다음을 통해 기여할 수 있습니다:

- [문서 개선](./README.md)
- [이슈 탭에서 버그 보고하기](https://github.com/jaem1n207/eslint-plugin-ben/issues/new/choose)
- [새로운 기능 또는 패키지 요청](https://github.com/jaem1n207/eslint-plugin-ben/issues/new/choose)
- [이슈 목록](https://github.com/jaem1n207/eslint-plugin-ben/issues)

## PR

> [풀 리퀘스트 열기](https://github.com/jaem1n207/eslint-plugin-ben/compare) <br/>

먼저 기여에 감사하며, 무언가를 구현하고 싶다면 PR을 생성하면 됩니다.
PR의 제목은 다음 형식과 일치해야 합니다:

```
<type>[rule-scope]: <description>
```

> 모든 PR을 메인으로 병합하기 때문에 기록에 있는 커밋의 수나 스타일은 신경 쓰지 않는다. <br/>
> 편한 스타일로 자유롭게 커밋하세요.

### Type

**type은 다음 중 하나여야 합니다**.

- feat - 새로운 규칙이 추가된 경우
- fix - 새로운 규칙을 추가하지 않는 모든 수정 사항
- docs - 문서만 변경한 경우
- test - 테스트만 변경한 경우
- chore - 위를 제외한 모든 경우

### Rule scope

변경한 규칙의 이름입니다. (예: no-self-import, no-unused-modules)<br/>
여러 규칙을 변경한 경우 규칙 범위를 작성하는 것은 선택 사항입니다.

### Description

PR 내용에 대한 명확하고 간결한 설명을 작성해주세요.
