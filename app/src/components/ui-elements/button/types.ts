import { ReactElement } from "react"

export type Props = {
    children: ReactElement | string
    onClick: Function
    value?: string
    selected?: boolean
}