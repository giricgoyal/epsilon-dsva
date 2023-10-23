import { Props } from "./types"
import './styles.scss'

const GraphContainer = (props: Props) => {
    const {children} = props

    return <div className="graph-container">
        {children}
    </div>
}

export default GraphContainer