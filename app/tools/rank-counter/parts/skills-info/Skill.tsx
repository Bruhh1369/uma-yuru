'use client';
import { useState } from 'react';
import './Skill.css';
import Image from 'next/image';

interface SkillData {
    name: string;
    cost: number;
    gold?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Skill = ({ skillsData }: { skillsData: any }) => {
    const [starLevel, setStarLevel] = useState(0);
    const [uniqueSkillLevel, setUniqueSkillLevel] = useState(1)

    const handleStarClick = (level: number) => {
        setStarLevel(prev => (prev === level ? level - 1 : level));
    };

    return (
        <div className="skill">
            <div className="skill-header">
                <div className="skill-header-content">
                    <div className="uma-icon">
                        <Image
                            src='https://images.start.gg/images/tournament/805954/image-5c808f7e6a9ea8b8bb540a60b0223e4d.png'
                            alt='uma-icon'
                            style={{ borderRadius: '3px' }}
                            fill
                        />
                    </div>
                    <div className="uma-star">
                        <div className="star-panel">
                            {[1, 2, 3, 4, 5].map(level => (
                                <p
                                    key={level}
                                    onClick={() => handleStarClick(level)}
                                    className={`star ${level <= starLevel ? 'active' : ''}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px"><path d="M333.33-259 480-347l146.67 89-39-166.67 129-112-170-15L480-709l-66.67 156.33-170 15 129 112.34-39 166.33ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-353.33Z" /></svg>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="skill-main">
                <div className="skill-item unique-skill">
                    <div className="skill-name">
                        <p>Unique Skill Lvl {uniqueSkillLevel}</p>
                        <select id="unique-skill-level-select" onChange={(e) => setUniqueSkillLevel(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="skill-pts">
                        <p>{starLevel <= 2 ? 120 * uniqueSkillLevel : 170 * uniqueSkillLevel} Pts</p>
                    </div>
                </div>
                {skillsData.map((d: SkillData, i: number) => {
                    return (
                        <div className={`skill-item ${d.gold ? 'gold-skill' : ''}`} key={i}>
                            <div className="skill-name">
                                <p>{d.name}</p>
                            </div>
                            <div className="skill-pts">
                                <p>{d.cost} Pts</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Skill;
