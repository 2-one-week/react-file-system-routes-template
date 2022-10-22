import type {ExoticComponent, ReactNode} from 'react'
import type {Location, Params} from 'react-router-dom'

export type ChildrenProps = {children: ReactNode}

export type ChildrenWrapper = ExoticComponent<ChildrenProps>

export type Page = () => JSX.Element // eslint-disable-line no-undef

export type GetInitialPropsArgs<ParamsOrKey> = {
    params: Readonly<[ParamsOrKey] extends [string] ? Params<ParamsOrKey> : Partial<ParamsOrKey>>
    location: Location
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
          notFound: boolean
      }
    | {
          serverError: boolean
      }

export type GetInitialProps<
    InitialProps = {[key: string]: any},
    ParamsOrKey extends string | Record<string, string | undefined> = string,
> = ({
    params,
    location,
}: GetInitialPropsArgs<ParamsOrKey>) =>
    | GetInitialPropsReturns<InitialProps>
    | Promise<GetInitialPropsReturns<InitialProps>>

export type PageInfos = {
    loading?: Page
    getInitialProps?: GetInitialProps
}

export type PagesWithPath = {
    path: string
    page: Page
} & PageInfos
