import {Sample} from '$components/Sample'
import {GetInitialProps} from '$types/getInitialProps'
import {Link} from 'react-router-dom'

type RootPageProps = {
    sample: string
    소개메세지: string
}

function RootPage({sample, 소개메세지}: RootPageProps) {
    return (
        <div>
            <p>root index page {sample}</p>
            <p>{소개메세지}</p>
            <ul>
                <Link to="/404">
                    <li>404 페이지로 (path = "/404")</li>
                </Link>
                <Link to="/500">
                    <li>500 페이지로 (path = "/500")</li>
                </Link>
                <Link to="/sample">
                    <li>sample (비동기 initialProps 예시) 페이지로 (path = "/sample")</li>
                </Link>
                <Link to="/sample/notfound">
                    <li>notfound 예시 페이지로 (path = "/sample/notfound")</li>
                </Link>
                <Link to="/sample/redirect">
                    <li>redirect 예시 페이지로 (path = "/sample/redirect")</li>
                </Link>
                <Link to="/sample/1">
                    <li>/sample/[특정아이디] 예시 페이지로 (path = "/sample/[id]")</li>
                </Link>
                <Link to="/sample/nested/nested">
                    <li>/sample/nested/nested 폴더 nested route 예시 페이지로 (path = "/nested/nested")</li>
                </Link>
                <Link to="/sample/123/123">
                    <li>
                        /sample/123/123 폴더 여러 Param을 받을 수 있도록 예시 페이지로 (path =
                        "/sample/[nestedParams]/[nestedParams2]")
                    </li>
                </Link>
            </ul>
            <Sample />
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
