import {Fragment, useMemo} from 'react'
import {createRoot, hydrateRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {withInitialPropsWhenMount} from '$hocs/withInitialPropsWhenMount'
import {createDynamicRoutes} from '$utils/createDynamicRoutes'

function DynamicRoutes() {
    const {Provider, NotFound, Pages} = useMemo(() => createDynamicRoutes(), [])
    return (
        <Provider>
            <Routes>
                {Pages.map((Page) => {
                    const {path} = Page
                    const PageWithInitialProps = withInitialPropsWhenMount(Page)
                    return <Route key={path} path={path} element={<PageWithInitialProps />} />
                })}
                <Route path="*" element={NotFound ? <NotFound /> : <Fragment />} />
            </Routes>
        </Provider>
    )
}

function App() {
    return (
        <BrowserRouter>
            <DynamicRoutes />
        </BrowserRouter>
    )
}

let rootElement: HTMLElement | null = null

function initializeReactApp() {
    const hasToLoadReact = !rootElement
    if (hasToLoadReact) {
        rootElement = document.getElementById('root')
        if (rootElement) {
            const root = createRoot(rootElement)
            root.render(<App />)
        }
    } else {
        if (rootElement) {
            hydrateRoot(rootElement, <App />)
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeReactApp)
