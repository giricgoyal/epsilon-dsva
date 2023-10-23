import { PAGE_CUSTOMERS, PAGE_SALES } from '../../constants'
import { NavContext } from './context'
import NavItem from './nav-item'
import './styles.scss'

const Navigation = () => {
    return <NavContext.Consumer>
        {({selectedTab, setSelectedTab}) => (
            <nav>
            <ul className='nav-list'>
                <NavItem 
                    value={PAGE_SALES} 
                    onClick={setSelectedTab}
                    selected={selectedTab === PAGE_SALES}
                >
                    Sales
                </NavItem>
                <NavItem 
                    value={PAGE_CUSTOMERS} 
                    onClick={setSelectedTab}
                    selected={selectedTab === PAGE_CUSTOMERS}
                >
                    Customers
                </NavItem>
            </ul>
        </nav>
        )}
    </NavContext.Consumer>
}

export default Navigation