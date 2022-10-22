/**
 * @description 500 페이지
 * /500 로도 접근 가능합니다.
 * getInitialProps에서 return { serverError : true } 를 한다면, 해당 페이지가 노출되게 됩니다.
 * */

function InternalServerErrorPage() {
    return <div>InternalServerErrorPage</div>
}

export default InternalServerErrorPage
