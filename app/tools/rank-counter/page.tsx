'use client'

import './style.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getTotalStatusPoints } from '../../scripts/stat-calc'

const RankIcon = ({ statCount }: { statCount: number }) => {
    const rankTable = [
        { max: 49, src: "/ranks/g.png" },
        { max: 99, src: "/ranks/gp.png" },
        { max: 149, src: "/ranks/f.png" },
        { max: 199, src: "/ranks/fp.png" },
        { max: 249, src: "/ranks/e.png" },
        { max: 299, src: "/ranks/ep.png" },
        { max: 349, src: "/ranks/d.png" },
        { max: 399, src: "/ranks/dp.png" },
        { max: 499, src: "/ranks/c.png" },
        { max: 599, src: "/ranks/cp.png" },
        { max: 699, src: "/ranks/b.png" },
        { max: 799, src: "/ranks/bp.png" },
        { max: 899, src: "/ranks/a.png" },
        { max: 999, src: "/ranks/ap.png" },
        { max: 1049, src: "/ranks/s.png" },
        { max: 1099, src: "/ranks/sp.png" },
        { max: 1149, src: "/ranks/ss.png" },
        { max: 1200, src: "/ranks/ssp.png" }
    ];
    const rank = rankTable.find((r) => statCount <= r.max);

    if (!rank) return null

    return (
        <Image
            src={rank.src}
            alt="rank-icon"
            width={40}
            height={40}
            priority
        />
    )
}

interface StatsItemProps {
    statCount: number;
    name: string;
    setStat: React.Dispatch<React.SetStateAction<number>>;
    statPoint: number;
    setStatPoint: React.Dispatch<React.SetStateAction<number>>;
}

const StatsItem = ({ statCount, name, setStat, statPoint, setStatPoint }: StatsItemProps) => {

    useEffect(() => {
        setStatPoint(getTotalStatusPoints(statCount))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statCount])

    return (
        <div className="stat-item">
            <div className="stat-header">{name}</div>
            <div className="stat-content">
                <RankIcon statCount={statCount} />
                <div className='stat-text-content'>
                    <div className="stat-input">
                        <input
                            type="number"
                            max={1200}
                            min={0}
                            value={statCount}
                            style={{ display: "block", width: "50px" }}
                            onChange={(e) => {
                                const value = Math.max(0, Math.min(Number(e.target.value), 1200))
                                setStat(value)
                            }}
                        />
                    </div>
                    <p className='maxstat'>/1200</p>
                </div>
            </div>
            <div className="stat-points">
                {statPoint + ' Pts'}
            </div>
        </div>
    );
};


const RankCounter = () => {

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

    return (
        <div className='stats-section'>
            <div className="stats">
                <div className="sutats">
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
                <h3 className="stats-total-points-panel">
                    {speedPoints + staminaPoints + powerPoints + gutsPoints + witPoints + " Total Points"}
                </h3>
            </div>
        </div>
    )
}

export default RankCounter