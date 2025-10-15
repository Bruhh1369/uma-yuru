'use client'

import './style.css'
import Stats from './parts/stats-calc/Stats'
import { useState } from 'react'
import Skills from './parts/skills-info/Skills'

const RankCounter = () => {

    const [statsEvaluationPoints, setStatsEvaluationPoints] = useState<number>(0)

    return (
        <div className='stats-section'>
            <Stats setResult={setStatsEvaluationPoints} />
            <Skills />
            {statsEvaluationPoints}
        </div>
    )
}

export default RankCounter