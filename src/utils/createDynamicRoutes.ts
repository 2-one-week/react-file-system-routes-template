import {Fragment} from 'react'
import {ChildrenWrapper, Page, PageInfos, PagesWithPath} from '$types/getInitialProps'

type DynamicRoutes = {Provider: ChildrenWrapper; NotFound: Page | null; Pages: PagesWithPath[]}

export function createDynamicRoutes(): DynamicRoutes {
    const BasicPages: Record<string, any> = import.meta.glob('/src/pages/(_app|404|500).tsx', {
        eager: true,
        import: 'default',
    })
    const DynamicPages: Record<string, {default: Page} & PageInfos> = import.meta.glob(
        '/src/pages/**/[a-zA-Z0-9[]*.tsx',
        {
            eager: true,
        },
    )

    const {Provider = Fragment, NotFound = null} = Object.entries(BasicPages).reduce(
        (result, [fileAbsolutePath, page]) => {
            const key = fileAbsolutePath.replace(/\/src\/pages\/|\.tsx$/g, '')
            switch (key) {
                case '_app':
                    result.Provider = page
                    return result
                case '404':
                    result.NotFound = page
                    return result
                default:
                    return result
            }
        },
        {} as {Provider: ChildrenWrapper; NotFound: Page},
    )

    const Pages: PagesWithPath[] = Object.entries(DynamicPages).map(
        ([fileAbsolutePath, {default: page, ...pageInfo}]) => {
            const path = fileAbsolutePath
                // page prefix 제거
                .replace(/^\/src\/pages/, '')
                // .tsx postfix제거
                .replace(/.tsx$/, '')
                // params [id] > :id로 변경
                .split('/')
                .map((value) => value.replace(/^\[(.+)\]$/, ':$1'))
                .join('/')
                // /index route 제거
                .replace(/\/index$/g, '/')
            return {path, component: page, ...pageInfo}
        },
    )

    return {Provider, NotFound, Pages}
}
