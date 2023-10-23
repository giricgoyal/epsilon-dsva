import { ReactElement } from "react"

export type Props = {
    children: ReactElement | string
    selected: boolean
    value: string
    onClick: Function
}