import {GetInitialProps} from '$types/dynamicRoute'

type RootPageProps = {
    sample: string
    소개메세지: string
}

function RootPage({sample, 소개메세지}: RootPageProps) {
    return (
        <div>
            <p>root index page {sample}</p>
            <p>{소개메세지}</p>
        </div>
    )
}

/**
 * @description page의 초기 props를 initial props로 static 하게 집어넣을 수 있는 예제입니다.
 * */
export const getInitialProps: GetInitialProps<RootPageProps> = () => {
    return {
        props: {
            sample: 'sample',
            소개메세지: 'page의 초기 props를 initial props로 static 하게 집어넣을 수 있는 예제입니다.',
        },
    }
}

export default RootPage
