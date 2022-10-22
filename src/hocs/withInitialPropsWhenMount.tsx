import {PagesWithPath} from '$types/dynamicRoute'
import {useEffect, useMemo, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

export function withInitialPropsWhenMount({
    path,
    page: Page,
    loading: LoadingComponent,
    getInitialProps,
}: PagesWithPath) {
    function PageWithInitialProps() {
        // Page에 주입될 Props
        const [props, setProps] = useState<any>(null)

        // react router dom의 값을 getInitialProps에 주입
        const params = useParams()
        const location = useLocation()
        const navigate = useNavigate()

        const shouldLoadInitialProps = useMemo(function checkShouldLoadInitialProps() {
            return Boolean(getInitialProps)
        }, [])

        useEffect(
            function getInitialPropsWhenPageMount() {
                async function loadInitialProps() {
                    if (!shouldLoadInitialProps || !getInitialProps) {
                        return
                    }

                    const deferredPropsResult = await getInitialProps({params, location})

                    if ('redirect' in deferredPropsResult) {
                        const {to = '/', replace = false} = deferredPropsResult.redirect
                        navigate(to, {replace})
                        return
                    }

                    if ('notFound' in deferredPropsResult) {
                        const isNotFoundResult = deferredPropsResult.notFound ?? false
                        if (isNotFoundResult) {
                            navigate('/404', {replace: true})
                        }
                        return
                    }

                    if ('serverError' in deferredPropsResult) {
                        const isServerErrorResult = deferredPropsResult.serverError ?? false
                        if (isServerErrorResult) {
                            navigate('/500', {replace: true})
                        }
                        return
                    }
                    setProps(deferredPropsResult.props)
                }
                loadInitialProps()
            },
            [shouldLoadInitialProps], // eslint-disable-line react-hooks/exhaustive-deps
        )

        if (!Page) {
            throw new Error(
                '[Dynamic Routes]: 페이지가 설정되어있지 않습니다. export default Component를 내보내주세요.',
            )
        }

        // getInitialProps가 없는 경우, 그냥 페이지 렌더링
        if (!shouldLoadInitialProps) {
            return <Page />
        }

        // getInitialProps가 있는 경우, 로딩 여부 확인
        const readyToRender = shouldLoadInitialProps && props
        if (!readyToRender) {
            return LoadingComponent ? <LoadingComponent /> : null
        }

        // getInitialProps를 가지고 와서 props 주입
        return <Page {...props} />
    }
    return PageWithInitialProps
}
