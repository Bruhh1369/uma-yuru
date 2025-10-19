'use client';
import { useEffect, useState } from 'react';
import './Skill.css';
import Image from 'next/image';

interface SkillData {
    name: string;
    condition: string;
    cost: number;
    gold?: boolean;
}

type Track = { turf: string; dirt: string };
type Distance = { short: string; mile: string; medium: string; long: string };
type Style = { front: string; pace: string; late: string; end: string };
type Aptitudes = { track: Track; distance: Distance; style: Style };
type Condition = keyof Track | keyof Distance | keyof Style;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Skill = ({ skillsData, uniqueSkillPoints, setUniqueSkillPoints, totalSkillPoints, aptitudes, conditionToCategory, multiplierMap }: { skillsData: any; uniqueSkillPoints: number; setUniqueSkillPoints: React.Dispatch<React.SetStateAction<number>>; totalSkillPoints: number; aptitudes: Aptitudes; conditionToCategory: Record<Condition, keyof Aptitudes>; multiplierMap: Record<string, number>;}) => {
    const [starLevel, setStarLevel] = useState(0);
    const [uniqueSkillLevel, setUniqueSkillLevel] = useState(1)

    const handleStarClick = (level: number) => {
        setStarLevel(prev => (prev === level ? level - 1 : level));
    };

    useEffect(() => {
        setUniqueSkillPoints(starLevel <= 2 ? 120 * uniqueSkillLevel : 170 * uniqueSkillLevel)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [starLevel, uniqueSkillLevel])

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
                        <select id="unique-skill-level-select" onChange={(e) => setUniqueSkillLevel(Number(e.target.value))}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="skill-pts">
                        <p>{uniqueSkillPoints} Pts</p>
                    </div>
                </div>
                {skillsData.map((d: SkillData, i: number) => {

                    function costCounter() { // condition list: turf, dirt, short, mile, medium, long, front, pace, late, end
                        // aptituudes and multipier list: s&a=1.1, b&c=0.9, d&e&f=0.8 g=0.7
                        if (!d.condition) return d.cost
                        const category = conditionToCategory[d.condition as Condition];
                        if (!category) return d.cost;
                        const group = aptitudes[category] as Record<string, string>;
                        const grade = group[d.condition];
                        if (!grade) return d.cost;
                        const multiplier = multiplierMap[grade] ?? 1;

                        return Math.round(d.cost * multiplier);
                    }

                    const finalCost = costCounter()

                    return (
                        <div className={`skill-item ${d.gold ? 'gold-skill' : ''}`} key={i}>
                            <div className="skill-name">
                                <p>{d.name}</p>
                            </div>
                            <div className="skill-pts">
                                <p>{finalCost} Pts</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="skill-footer">
                <button className="add-skill">
                    <p>Add Skill</p>
                </button>
                <h3 className="total-skill-pts">
                    <p>{totalSkillPoints} Pts</p>
                </h3>
            </div>
        </div>
    );
};

export default Skill;
