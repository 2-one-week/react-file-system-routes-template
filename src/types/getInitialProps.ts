import type {ExoticComponent, ReactNode} from 'react'
import type {Location, Params} from 'react-router-dom'

export type ChildrenProps = {children: ReactNode}

export type ChildrenWrapper = ExoticComponent<ChildrenProps>

export type Page = (props: any) => JSX.Element // eslint-disable-line no-undef

export type GetInitialPropsArgs<RouterParamsOrKey, RouterLocationState> = {
    params: Readonly<[RouterParamsOrKey] extends [string] ? Params<RouterParamsOrKey> : Partial<RouterParamsOrKey>>
    location: Omit<Location, 'state'> & {
        state: Readonly<RouterLocationState>
    }
}

export type GetInitialPropsReturns<T> =
    | {
          props: T | Promise<T>
      }
    | {
          redirect: {
              to: string
              replace?: boolean
          }
      }
    | {
          notFound: true
      }
    | {
          serverError: true
      }

export type GetInitialProps<
    InitialPropsType = {[key: string]: any},
    RouterParamsOrKey extends string | Record<string, string | undefined> = string,
    RouterLocationState extends unknown = Record<string, string | undefined>,
> = ({
    params,
    location,
}: GetInitialPropsArgs<RouterParamsOrKey, RouterLocationState>) =>
    | GetInitialPropsReturns<InitialPropsType>
    | Promise<GetInitialPropsReturns<InitialPropsType>>

export type PageInfos = {
    loading?: Page
    getInitialProps?: GetInitialProps
}

export type PagesWithPath = {
    path?: string
    component: Page
} & PageInfos
