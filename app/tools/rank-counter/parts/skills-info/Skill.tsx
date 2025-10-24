'use client';
import { useEffect, useState } from 'react';
import './Skill.css';
import Image from 'next/image';
import { GreenButton } from '@/app/assets/button/buttons';

interface SkillData {
    name: string;
    condition?: Condition | null;
    cost: number;
    gold?: boolean;
    type?: "velocity" | "acceleration" | "navigation" | "gate" | "viewfield" | "recovery" | "greenspeed" | "greenstamina" | "greenpower" | "greenguts" | "greenwit" | "greenrandom" | "hesitation" | "panicking" | "ragebaiting" | "disturb" | "narrowfiled";
}

type Track = { turf: string; dirt: string };
type Distance = { short: string; mile: string; medium: string; long: string };
type Style = { front: string; pace: string; late: string; end: string };
type Aptitudes = { track: Track; distance: Distance; style: Style };
type Condition = keyof Track | keyof Distance | keyof Style;

type SkillProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skillsData: any,
    uniqueSkillPoints: number,
    setUniqueSkillPoints: React.Dispatch<React.SetStateAction<number>>,
    totalSkillPoints: number,
    aptitudes: Aptitudes,
    conditionToCategory: Record<Condition, keyof Aptitudes>,
    multiplierMap: Record<string, number>, onRemove: (index: number) => void;
    setSkills: React.Dispatch<React.SetStateAction<SkillData[]>>,
}

const Skill = ({ skillsData, uniqueSkillPoints, setUniqueSkillPoints, totalSkillPoints, aptitudes, conditionToCategory, multiplierMap, onRemove, setSkills }: SkillProps) => {

    const [search, setSearch] = useState<string>("")
    const skillsList: SkillData[] = [
        { name: "Professor of Curvature", cost: 508, gold: true, condition: null, type: "velocity" },
        { name: "Corner Adept ○", cost: 217, gold: false, condition: null, type: "velocity" },
        { name: "Straightaway Adept", cost: 217, gold: false, condition: null, type: "velocity" },
        { name: "Homestretch Haste", cost: 217, gold: false, condition: null, type: "velocity" },
        { name: "Ramp Up", cost: 217, gold: false, condition: null, type: "velocity" },
        { name: "Groundwork", cost: 217, gold: false, condition: null, type: "acceleration" },
        { name: "Uma Stan", cost: 217, gold: false, condition: null, type: "velocity" },
        { name: "Prudent Positioning", cost: 129, gold: false, condition: null, type: "navigation" },
        { name: "Tail Held High", cost: 217, gold: false, condition: null, type: "velocity" },
        { name: "Highlander", cost: 217, gold: false, condition: null, type: "acceleration" },
        { name: "Playtime's Over", cost: 217, gold: false, condition: null, type: "velocity" },
        { name: "Slipstream", cost: 217, gold: false, condition: null, type: "velocity" },
        { name: "Corner Acceleration ○", cost: 217, gold: false, condition: null, type: "acceleration" },
        { name: "Straightaway Acceleration", cost: 217, gold: false, condition: null, type: "acceleration" },
        { name: "Nimble Navigator", cost: 129, gold: false, condition: null, type: "acceleration" },
        { name: "Concentration", cost: 508, gold: true, condition: null, type: "gate" },
        { name: "Focus", cost: 129, gold: false, condition: null, type: "gate" },
        { name: "Go With The Flow", cost: 217, gold: false, condition: null, type: "navigation" },
        { name: "Plan x", cost: 508, gold: true, condition: "short", type: "acceleration" },
        { name: "Countermeasure", cost: 217, gold: false, condition: "short", type: "acceleration" },
        { name: "Turbo Sprint", cost: 508, gold: true, condition: "short", type: "acceleration" },
        { name: "Sprinting Gear", cost: 217, gold: false, condition: "short", type: "acceleration" },
        { name: "Killer Tunes", cost: 508, gold: true, condition: "medium", type: "velocity" },
        { name: "Up-Tempo", cost: 217, gold: false, condition: "medium", type: "velocity" },
        { name: "ShatterProof", cost: 508, gold: true, condition: "pace", type: "acceleration" },
        { name: "Changing Gears", cost: 508, gold: true, condition: "mile", type: "velocity" },
        { name: "Shifting Gears", cost: 217, gold: false, condition: "mile", type: "velocity" },
        { name: "Ignited Spirit SPD", cost: 263, gold: false, condition: null, type: "velocity" },
        { name: "Ignited Spirit PWR", cost: 263, gold: false, condition: null, type: "acceleration" },
        { name: "Ignited Spirit GUTS", cost: 263, gold: false, condition: null, type: "velocity" },
        { name: "Ignited Spirit WIT", cost: 263, gold: false, condition: null, type: "navigation" },
        { name: "Unyielding Spirit", cost: 217, gold: false, condition: "mile", type: "velocity" },
        { name: "Mile Corners ○", cost: 217, gold: false, condition: "mile", type: "velocity" },
        { name: "Mile Corners ◎", cost: 262, gold: false, condition: "mile", type: "velocity" },
        { name: "Mile Straightaways ○", cost: 217, gold: false, condition: "mile", type: "velocity" },
        { name: "Mile Straightaways ◎", cost: 262, gold: false, condition: "mile", type: "velocity" },
        { name: "Productive Plan", cost: 217, gold: false, condition: "mile", type: "velocity" },
        { name: "Updrafters", cost: 217, gold: false, condition: "mile", type: "acceleration" },
        { name: "Acceleration", cost: 217, gold: false, condition: "mile", type: "acceleration" },
        { name: "Huge Lead", cost: 262, gold: false, condition: "short", type: "velocity" },
        { name: "Sprint Corners ○", cost: 217, gold: false, condition: "short", type: "velocity" },
        { name: "Sprint Corners ◎", cost: 217, gold: false, condition: "short", type: "velocity" },
        { name: "Sprint Straightaways ○", cost: 217, gold: false, condition: "short", type: "velocity" },
        { name: "Sprint Straightaways ◎", cost: 217, gold: false, condition: "short", type: "velocity" },
        { name: "Gap Closer", cost: 217, gold: false, condition: "short", type: "velocity" },
        { name: "Meticulous Measure", cost: 217, gold: false, condition: "short", type: "navigation" },
        { name: "Hawkeye", cost: 129, gold: false, condition: "medium", type: "viewfield" },
        { name: "Thunderbolt Step", cost: 174, gold: false, condition: "medium", type: "navigation" },
        { name: "Steadfast", cost: 239, gold: false, condition: "medium", type: "velocity" },
        { name: "Medium Corners ○", cost: 217, gold: false, condition: "medium", type: "velocity" },
        { name: "Medium Corners ◎", cost: 262, gold: false, condition: "medium", type: "velocity" },
        { name: "Medium Straightaways ○", cost: 217, gold: false, condition: "medium", type: "velocity" },
        { name: "Medium Straightaways ◎", cost: 262, gold: false, condition: "medium", type: "velocity" },
        { name: "Long Straightaways ○", cost: 217, gold: false, condition: "long", type: "velocity" },
        { name: "Long Straightaways ◎", cost: 262, gold: false, condition: "long", type: "velocity" },
        { name: "Long Corners ○", cost: 217, gold: false, condition: "long", type: "velocity" },
        { name: "Long Corners ◎", cost: 262, gold: false, condition: "long", type: "velocity" },
        { name: "Keeping The Lead", cost: 217, gold: false, condition: "long", type: "velocity" },
        { name: "Pressure", cost: 239, gold: false, condition: "long", type: "velocity" },
        { name: "Inside Scoop", cost: 217, gold: false, condition: "long", type: "velocity" },
        { name: "Early Lead", cost: 217, gold: false, condition: "front", type: "acceleration" },
        { name: "Second Wind", cost: 217, gold: false, condition: "front", type: "acceleration" },
        { name: "Final Push", cost: 217, gold: false, condition: "front", type: "acceleration" },
        { name: "Fast-Paced", cost: 217, gold: false, condition: "front", type: "velocity" },
        { name: "Leader's Pride", cost: 217, gold: false, condition: "front", type: "velocity" },
        { name: "Front Runner Straightaways ○", cost: 217, gold: false, condition: "front", type: "velocity" },
        { name: "Front Runner Straightaways ◎", cost: 262, gold: false, condition: "front", type: "velocity" },
        { name: "Front Runner Corners ○", cost: 217, gold: false, condition: "front", type: "velocity" },
        { name: "Front Runner Corners ◎", cost: 262, gold: false, condition: "front", type: "velocity" },
        { name: "Dodging Danger", cost: 129, gold: false, condition: "front", type: "navigation" },
        { name: "Swinging Maestro", cost: 508, gold: true, condition: null, type: "recovery" },
        { name: "Corner Recovery ○", cost: 217, gold: false, condition: null, type: "recovery" },
        { name: "Breath Of Fresh Air", cost: 508, gold: true, condition: null, type: "recovery" },
        { name: "CoolDown", cost: 508, gold: true, condition: "long", type: "recovery" },
        { name: "Calm In A Crowd", cost: 217, gold: false, condition: null, type: "recovery" },
        { name: "Pace Strategy", cost: 217, gold: false, condition: null, type: "recovery" },
        { name: "Lay Low", cost: 217, gold: false, condition: null, type: "recovery" },
        { name: "Straightaway Recovery", cost: 217, gold: false, condition: null, type: "recovery" },
        { name: "Shake It Out", cost: 217, gold: false, condition: null, type: "recovery" },
        { name: "Triple 7s", cost: 217, gold: false, condition: null, type: "recovery" },
        { name: "Ignited Spirit STA", cost: 263, gold: false, condition: null, type: "recovery" },
        { name: "Moxie", cost: 217, gold: false, condition: "front", type: "recovery" },
        { name: "Stamina To Spare", cost: 217, gold: false, condition: "pace", type: "recovery" },
        { name: "Preferred Position", cost: 217, gold: false, condition: "pace", type: "recovery" },
        { name: "Hydrate", cost: 217, gold: false, condition: "pace", type: "recovery" },
        { name: "A Small Breather", cost: 217, gold: false, condition: "late", type: "recovery" },
        { name: "After-School Stroll", cost: 217, gold: false, condition: "end", type: "recovery" },
        { name: "Levelheaded", cost: 217, gold: false, condition: "end", type: "recovery" },
        { name: "Wait-and-See", cost: 217, gold: false, condition: "short", type: "recovery" },
        { name: "Watchful Eye", cost: 217, gold: false, condition: "mile", type: "recovery" },
        { name: "Rosy Outlook", cost: 217, gold: false, condition: "medium", type: "recovery" },
        { name: "Soft Step", cost: 217, gold: false, condition: "medium", type: "recovery" },
        { name: "Deep Breath", cost: 217, gold: false, condition: "long", type: "recovery" },
        { name: "Extra Tank", cost: 217, gold: false, condition: "long", type: "recovery" },
        { name: "Passing Pro", cost: 217, gold: false, condition: "long", type: "recovery" },
        { name: "Standing By", cost: 239, gold: false, condition: "end", type: "recovery" },
        { name: "Right-Handed ○", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Right-Handed ◎", cost: 174, gold: false, condition: null, type: "greenspeed" },
        { name: "Left-Handed ○", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Left-Handed ◎", cost: 174, gold: false, condition: null, type: "greenspeed" },
        { name: "Spring Runner ○", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Spring Runner ◎", cost: 174, gold: false, condition: null, type: "greenspeed" },
        { name: "Summer Runner ○", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Summer Runner ◎", cost: 174, gold: false, condition: null, type: "greenspeed" },
        { name: "Fall Runner ○", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Fall Runner ◎", cost: 174, gold: false, condition: null, type: "greenspeed" },
        { name: "Winter Runner ○", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Winter Runner ◎", cost: 174, gold: false, condition: null, type: "greenspeed" },
        { name: "Outer Post Proficiency ○", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Outer Post Proficiency ◎", cost: 174, gold: false, condition: null, type: "greenspeed" },
        { name: "Maverick ○", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Maverick ◎", cost: 174, gold: false, condition: null, type: "greenspeed" },
        { name: "Long Shot ○", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Long Shot ◎", cost: 174, gold: false, condition: null, type: "greenspeed" },
        { name: "Sympathy", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Lone Wolf", cost: 129, gold: false, condition: null, type: "greenspeed" },
        { name: "Tokyo Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Tokyo Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Nakayama Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Nakayama Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Hanshin Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Hanshin Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Kyoto Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Kyoto Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Chuckyo Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Chuckyo Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Sapporo Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Sapporo Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Hakodate Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Hakodate Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Fukushima Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Fukushima Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Niigata Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Niigata Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Kokura Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Kokura Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Oi Racecourse ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Oi Racecourse ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Standard Distance ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Standard Distance ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Non-Standard Distance ○", cost: 129, gold: false, condition: null, type: "greenstamina" },
        { name: "Non-Standard Distance ◎", cost: 174, gold: false, condition: null, type: "greenstamina" },
        { name: "Unquenched Thirst", cost: 217, gold: false, condition: null, type: "greenstamina" },
        { name: "Firm Condition ○", cost: 129, gold: false, condition: null, type: "greenpower" },
        { name: "Firm Condition ◎", cost: 174, gold: false, condition: null, type: "greenpower" },
        { name: "Wet Condition ○", cost: 129, gold: false, condition: null, type: "greenpower" },
        { name: "Wet Condition ◎", cost: 174, gold: false, condition: null, type: "greenpower" },
        { name: "Competitive Spirit ○", cost: 129, gold: false, condition: null, type: "greenpower" },
        { name: "Competitive Spirit ◎", cost: 174, gold: false, condition: null, type: "greenpower" },
        { name: "Sunny Days ○", cost: 129, gold: false, condition: null, type: "greenguts" },
        { name: "Sunny Days ◎", cost: 174, gold: false, condition: null, type: "greenguts" },
        { name: "Cloudy Days ○", cost: 129, gold: false, condition: null, type: "greenguts" },
        { name: "Cloudy Days ◎", cost: 174, gold: false, condition: null, type: "greenguts" },
        { name: "Rainy Days ○", cost: 129, gold: false, condition: null, type: "greenguts" },
        { name: "Rainy Days ◎", cost: 174, gold: false, condition: null, type: "greenguts" },
        { name: "Snowy Days ○", cost: 129, gold: false, condition: null, type: "greenguts" },
        { name: "Snowy Days ◎", cost: 174, gold: false, condition: null, type: "greenguts" },
        { name: "Target in Sight ○", cost: 129, gold: false, condition: null, type: "greenguts" },
        { name: "Target in Sight ◎", cost: 174, gold: false, condition: null, type: "greenguts" },
        { name: "Inner Post Proficiency ○", cost: 129, gold: false, condition: null, type: "greenwit" },
        { name: "Inner Post Proficiency ◎", cost: 174, gold: false, condition: null, type: "greenwit" },
        { name: "Lucky Seven", cost: 174, gold: false, condition: null, type: "greenrandom" },
        { name: "Front Runner Savvy ○", cost: 174, gold: false, condition: "front", type: "greenwit" },
        { name: "Front Runner Savvy ◎", cost: 217, gold: false, condition: "front", type: "greenwit" },
        { name: "Pace Chaser Savvy ○", cost: 174, gold: false, condition: "pace", type: "greenwit" },
        { name: "Pace Chaser Savvy ◎", cost: 217, gold: false, condition: "pace", type: "greenwit" },
        { name: "Late Surger Savvy ○", cost: 174, gold: false, condition: "late", type: "greenwit" },
        { name: "Late Surger Savvy ◎", cost: 217, gold: false, condition: "late", type: "greenwit" },
        { name: "End Closer Savvy ○", cost: 174, gold: false, condition: "end", type: "greenwit" },
        { name: "End Closer Savvy ◎", cost: 217, gold: false, condition: "end", type: "greenwit" },
        { name: "", cost: 217, gold: false, condition: "long", type: "recovery" },
    ]

    const filteredSkillsList = skillsList.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))

    const [starLevel, setStarLevel] = useState(0);
    const [uniqueSkillLevel, setUniqueSkillLevel] = useState(1)

    const [showAddSkillPanel, setShowAddSkillPanel] = useState<boolean>(false)

    const handleStarClick = (level: number) => {
        setStarLevel(prev => (prev === level ? level - 1 : level));
    };

    useEffect(() => {
        setUniqueSkillPoints(starLevel <= 2 ? 120 * uniqueSkillLevel : 170 * uniqueSkillLevel)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [starLevel, uniqueSkillLevel])

    const skillTypeIconMap: Record<string, string> = {
        velocity: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20011.png',
        acceleration: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20041.png',
        navigation: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20051.png',
        gate: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20061.png',
        viewfield: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20091.png',
        recovery: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20021.png',
        hesitation: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30011.png',
        panicking: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30021.png',
        ragebaiting: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30041.png',
        disturb: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30051.png',
        narrowfiled: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30071.png',
        greenspeed: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10011.png',
        greenstamina: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10021.png',
        greenpower: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10031.png',
        greenguts: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10041.png',
        greenwit: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10051.png',
        greenrandom: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10061.png',
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
                            sizes='100%'
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
                            <option value="6">6</option>
                        </select>
                    </div>
                    {process.env.NEXT_PUBLIC_DEBUG_MODE === '1' && <div className="skill-pts">
                        <p>{uniqueSkillPoints} Pts</p>
                    </div>}
                </div>
                {skillsData.map((d: SkillData, i: number) => {

                    function costCounter() {
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
                    const iconUrl = skillTypeIconMap[d.type ?? ""] || "";

                    return (
                        <div className={`skill-item ${d.gold ? 'gold-skill' : ''}`} key={i} onClick={() => onRemove && onRemove(i)}>
                            <div className="skill-icon">
                                <Image
                                    src={iconUrl}
                                    alt='skill-icon'
                                    fill
                                    sizes='100%'
                                />
                            </div>
                            <div className="skill-name">
                                <p>{d.name}</p>
                            </div>
                            {process.env.NEXT_PUBLIC_DEBUG_MODE === '1' && <div className="skill-pts">
                                <p>{finalCost} Pts</p>
                            </div>}
                        </div>
                    )
                })}
            </div>
            <div className="skill-footer">
                <GreenButton className='add-skill-button' onClick={() => setShowAddSkillPanel(prev => !prev)}>
                    Add Skill
                </GreenButton>
                {process.env.NEXT_PUBLIC_DEBUG_MODE === '1' && <h3 className="total-skill-pts">
                    <p>{totalSkillPoints} Pts</p>
                </h3>}
            </div>
            {showAddSkillPanel && <div className="add-skill-wrapper">
                <div className="add-skill-panel">
                    <div className="search-skill-panel">
                        <input type="search" id="search-skill" onChange={(e) => setSearch(e.target.value)} value={search} />
                        <button id="close-add-skill" onClick={() => setShowAddSkillPanel(prev => !prev)}>X</button>
                    </div>
                    <div className="skill-lists">
                        {filteredSkillsList.map((d: SkillData, i: number) => {
                            const iconUrl = skillTypeIconMap[d.type ?? ""] || "";
                            return (
                                <div className={`skill-item ${d.gold ? 'gold-skill' : ''}`} key={i} onClick={() => setSkills(prev => [...prev, d])}>
                                    <div className="skill-icon">
                                        <Image
                                            src={iconUrl}
                                            alt='skill-icon'
                                            fill
                                            sizes='100%'
                                        />
                                    </div>
                                    <div className="skill-name">
                                        <p>{d.name}</p>
                                    </div>
                                    {process.env.NEXT_PUBLIC_DEBUG_MODE === '1' && <div className="skill-pts">
                                        <p>{d.cost} Pts</p>
                                    </div>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Skill;
