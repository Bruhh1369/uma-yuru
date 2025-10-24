'use client'

import { useState , useEffect} from "react"
import './Stats.css'
import StatsItem from "./StatsItem"

const Stats = ({ setResult }: { setResult: React.Dispatch<React.SetStateAction<number>>; }) => {

    const [speed, setSpeed] = useState<number>(120)
    const [stamina, setStamina] = useState<number>(120)
    const [power, setPower] = useState<number>(120)
    const [guts, setGuts] = useState<number>(120)
    const [wit, setWit] = useState<number>(120)

    const [speedPoints, setSpeedPoints] = useState<number>(0)
    const [staminaPoints, setStaminaPoints] = useState<number>(0)
    const [powerPoints, setPowerPoints] = useState<number>(0)
    const [gutsPoints, setGutsPoints] = useState<number>(0)
    const [witPoints, setWitPoints] = useState<number>(0)

    useEffect(() => {
        setResult(speedPoints+powerPoints+staminaPoints+gutsPoints+witPoints)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speedPoints, staminaPoints, powerPoints, gutsPoints, witPoints])

    return (
        <div className="stats">
                <div className={`sutats ${process.env.NEXT_PUBLIC_DEBUG_MODE !== '1' ? 'pts-active' : ''}`}>
                    <StatsItem
                        setStat={setSpeed}
                        statCount={speed}
                        name='Speed'
                        statPoint={speedPoints}
                        setStatPoint={setSpeedPoints}
                    />
                    <StatsItem
                        setStat={setStamina}
                        statCount={stamina}
                        name='Stamina'
                        statPoint={staminaPoints}
                        setStatPoint={setStaminaPoints}
                    />
                    <StatsItem
                        setStat={setPower}
                        statCount={power}
                        name='Power'
                        statPoint={powerPoints}
                        setStatPoint={setPowerPoints}
                    />
                    <StatsItem
                        setStat={setGuts}
                        statCount={guts}
                        name='Guts'
                        statPoint={gutsPoints}
                        setStatPoint={setGutsPoints}
                    />
                    <StatsItem
                        setStat={setWit}
                        statCount={wit}
                        name='Wit'
                        statPoint={witPoints}
                        setStatPoint={setWitPoints}
                    />
                </div>
                {process.env.NEXT_PUBLIC_DEBUG_MODE === '1' && <h3 className="stats-total-points-panel">
                    {speedPoints + staminaPoints + powerPoints + gutsPoints + witPoints + " Total Points"}
                </h3>}
            </div>
    )
}

export default Stats