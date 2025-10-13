import { StatsTemp } from "./parts/StatsTemp"
import './style.css'

const RankCounter = () => {
    return (
        <div>
            <div className="stats">
                <StatsTemp type="Speed"/>
                <StatsTemp type="Stamina"/>
            </div>
        </div>
    )
}

export default RankCounter