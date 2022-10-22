import {GetInitialProps} from '$types/dynamicRoute'
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

type Item = {
    userId: number
    id: number
    title: string
    body: string
}

type JsonPlaceHolderTestPageProps = {
    items: Item[]
}

function JsonPlaceHolderTestPage({items}: JsonPlaceHolderTestPageProps) {
    const navigate = useNavigate()
    const handleGoDetail = useCallback((id: number) => {
        navigate(`/sample/${id}`)
    }, [])

    return (
        <div>
            <ul>
                {items.map(({userId, id}, index) => {
                    return (
                        <li style={{border: '1px solid black', listStyle: 'none'}} key={index}>
                            <p>userId : {userId}</p>
                            <p onClick={() => handleGoDetail(id)}>id : {id}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

/**
 * @description page의 초기 props를 initial props로 비동기로 집어넣을 수 있는 예제입니다.
 * */
export const getInitialProps: GetInitialProps<JsonPlaceHolderTestPageProps> = async () => {
    const promise = await fetch('https://jsonplaceholder.typicode.com/posts')
    const result = await promise.json()
    return {
        props: {items: result},
    }
}

export default JsonPlaceHolderTestPage
