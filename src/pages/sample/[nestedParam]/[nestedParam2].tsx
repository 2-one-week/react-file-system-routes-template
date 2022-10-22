import {GetInitialProps} from '$types/dynamicRoute'
import {useParams} from 'react-router-dom'

type NestedParam2PageProps = {
    id: string
}

type NestedParam2PageParams = {nestedParam: string; nestedParam2: string}

function NestedIdTestPage({id, nestedParam, nestedParam2}: NestedParam2PageProps & NestedParam2PageParams) {
    const {nestedParam: nestedParamFromUseParams, nestedParam2: nestedParam2FromUseParams} = useParams()
    return (
        <div>
            <p>nested param으로 내려온 값을 사용할 수 있습니다</p>
            <p>/sample/1/2 라면, 1, 2 값을 사용할 수 있습니다.</p>
            <p>props로 내려온 id : {id}</p>
            <p>props로 내려온 nestedParam : {nestedParam}</p>
            <p>props로 내려온 nestedParam2 : {nestedParam2}</p>
            <p>useParam을 통해 가져온 nestedParam : {nestedParamFromUseParams}</p>
            <p>useParam을 통해 가져온 nestedParam2 : {nestedParam2FromUseParams}</p>
        </div>
    )
}

export const getInitialProps: GetInitialProps<NestedParam2PageProps, NestedParam2PageParams> = ({params}) => {
    // react router dom > useParams의 param을 사용할 수 있습니다.
    const {nestedParam, nestedParam2} = params
    return {
        props: {id: '그냥 아이디 props', nestedParam, nestedParam2},
    }
}

export default NestedIdTestPage
