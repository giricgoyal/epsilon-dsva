import { useCallback } from 'react'
import { getClassName } from "../../../common/helpers"
import { Props } from "./types"

const NavItem = (props: Props) => {
    const {children, selected, value, onClick} = props
    const className = getClassName({
        'nav-list__list-item': true,
        'nav-list__list-item--selected': selected
    })

    const handleLinkClick = useCallback(() => {
        onClick(value)
    }, [value])
    

    return <li className={className}>
        <div onClick={handleLinkClick}>
            {children}
        </div>
    </li>
}

export default NavItem