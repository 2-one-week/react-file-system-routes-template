import {ReactNode} from 'react'

/**
 * @description 모든 페이지에 적용하고 싶은 provider가 있다면 적용할 수 있습니다. ex) Recoil Root
 * 404, 500 page에도 적용됩니다.
 * */
function Provider({children}: {children: ReactNode}) {
    return <>{children}</>
}

export default Provider
