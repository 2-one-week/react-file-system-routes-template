import {GetInitialProps} from '$types/dynamicRoute'

type JsonIDPageProps = {
    body: string
    title: string
}

function JsonIDPage({body, title}: JsonIDPageProps) {
    return (
        <div>
            {body} {title}
        </div>
    )
}

/**
 * @description initialProps가 로드되기전에 노출된 loading component 입니다. 커스텀하게 사용가능합니다.
 * */
export const loading = () => {
    return <div>로딩중입니다~ (custom)</div>
}

export const getInitialProps: GetInitialProps = async ({params}) => {
    const {id} = params

    const promise = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const {body, title} = await promise.json()

    return {
        props: {
            body,
            title,
        },
    }
}

export default JsonIDPage
