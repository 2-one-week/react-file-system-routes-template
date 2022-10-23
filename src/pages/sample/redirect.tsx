import {GetInitialProps} from '$types/getInitialProps'

/**
 * @description initialProps에서 redirect를 시킬 수 있습니다.
 * */
function RedirectPage() {
    return <div>이 페이지는 노출되지 않습니다.</div>
}

export const getInitialProps: GetInitialProps = () => {
    return {
        redirect: {
            to: '/',
        },
    }
}

export default RedirectPage
