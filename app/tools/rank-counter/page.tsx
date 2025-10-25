'use client'

import './style.css'
import Stats from './parts/stats-calc/Stats'
import { useState } from 'react'
import Skills from './parts/skills-info/Skills'
import RankResult from './parts/rank-result/RankResult'

const RankCounter = () => {

    const [statsEvaluationPoints, setStatsEvaluationPoints] = useState<number>(0)
    const [skillsEvaluationPoints, setSkillsEvaluationPoints] = useState<number>(0)

    return (
        <div className='stats-section'>
            <Stats setResult={setStatsEvaluationPoints} />
            <Skills setResult={setSkillsEvaluationPoints}/>
            <RankResult rating={statsEvaluationPoints+skillsEvaluationPoints}/>
        </div>
    )
}

export default RankCounter