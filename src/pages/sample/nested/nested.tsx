import {GetInitialProps} from '$types/getInitialProps'

type NestedTestPageProps = {
    state: {
        text: {
            main: string
        }
    }
}

/**
 * @description nested된 폴더 구조에서도 사용할 수 있습니다.
 * */
export default function NestedTestPage({state}: NestedTestPageProps) {
    return (
        <div>
            <p>NestedTestPage</p>
            <p>{state.text.main}</p>
        </div>
    )
}

/**
 * @description getInitialProps를 통해 location을 state도 받아올 수 있습니다.
 */
export const getInitialProps: GetInitialProps<NestedTestPageProps, string, {text: {main: string}}> = ({location}) => {
    const stateFromRouter = location.state

    if (!stateFromRouter.text?.main) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            state: stateFromRouter,
        },
    }
}
