import {GetInitialProps} from '$types/dynamicRoute'

/**
 * @description initialProps에서 notFound page로 redirect 시킬 수 있습니다.
 * */
function NotFoundPage() {
    return <div>이 페이지는 노출되지 않습니다.</div>
}

export const getInitialProps: GetInitialProps = () => {
    return {
        notFound: true,
    }
}

export default NotFoundPage
