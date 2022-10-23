import {withInitialPropsWhenMount} from '$hocs/withInitialPropsWhenMount'
import type {GetInitialProps} from '$types/getInitialProps'

type SampleComponentProps = {
    text: string
}

function SampleComponent({text}: SampleComponentProps) {
    return <div>{text}</div>
}

function loading() {
    return <div>로오오오딩중</div>
}

const getInitialProps: GetInitialProps = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                props: {
                    text: '이거 initialProps 되나요?',
                },
            })
        }, 3000)
    })
}

export const Sample = withInitialPropsWhenMount({component: SampleComponent, loading, getInitialProps})
