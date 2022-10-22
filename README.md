## React Dynamic Route Template

React App에서 Next.js 처럼 page 폴더 구조를 사용하기 위한 프로젝트입니다.

### Dynamic Routing

-   페이지가 추가되거나, 삭제될 때 마다 Route를 매번 쓰기 귀찮은 문제를 해결할 수 있습니다.

-   Vite의 모듈 import 기능을 이용해, pages 하위 디렉토리 / 폴더를 통해 page routing을 만듭니다.

-   `[param]` 이라고 폴더 / 파일명을 설정하면 route path의 param도 가지고 올 수 있습니다.
    -   /sample/1/2 > 1과 2로 가지고올 수 있습니다. (src/pages/sample/[nestedParam]/[nestedParam2].tsx 를 확인해보세요.)

### 사용법

1. Page (Required)

    - default 로 export 된 Page Component가 필요합니다.

2. getInitialProps

    - 동기, 비동기로 페이지에 초기로 props를 가지고올 수 있습니다.
    - 특정 조건에 따라 redirect, notFound, serverError 페이지로 이동시킬 수 있습니다.
        - {notFound : true} 를 리턴하면, /404로 이동합니다.
        - {serverError : true} 를 리턴하면, /500으로 이동합니다.

3. loading (optional)

    - 페이지에 initialProps가 주입되기 전에, 표시할 Loading 컴포넌트 입니다.
