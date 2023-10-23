import { useCallback } from "react"
import { Props } from "./types"
import './styles.scss'
import { getClassName } from "../../../common/helpers"

const Button = (props: Props) => {
    const {children, onClick, value, selected} = props
    const handleButtonClick = useCallback(() => {
        onClick(value)
    }, [value])

    const className = getClassName({
        'button': true,
        'button--selected': !!selected
    })

    return <button
        className={className}
        onClick={handleButtonClick}
    >
        {children}
    </button>
}

export default Button