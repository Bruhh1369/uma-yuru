'use client'

import React from 'react'
import { useEffect } from 'react';
import { getTotalStatusPoints } from '../../../../scripts/stat-calc'
import RankIcon from './RankIcon';
import './StatsItem.css'

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

export default StatsItem