'use client';
import { useEffect, useState } from 'react';
import './Skill.css';
import Image from 'next/image';
import { LabelGreenButton, LabelWhiteButton } from '@/app/assets/button/buttons';
import AptitudesC from './Aptitudes';

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
    setAptitudes: React.Dispatch<React.SetStateAction<Aptitudes>>,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SkillItem = ({ skillsData, d, i, setSkills, iconUrl }: { skillsData: any, d: SkillData, i: number, setSkills: React.Dispatch<React.SetStateAction<SkillData[]>>, iconUrl: string }) => {
    return (
        <div className={`skill-item ${d.gold ? 'gold-skill' : ''}`} key={i} onClick={() => {
            setSkills(prevSkills => {
                const exists = prevSkills.some(skill => skill.name === d.name);
                if (exists) {
                    // Hapus skill jika sudah ada (filter berdasarkan name)
                    return prevSkills.filter(skill => skill.name !== d.name);
                }
                // Tambah skill jika belum ada
                return [...prevSkills, d];
            });
        }}
        >
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
            <div className='exp-coll'>{skillsData.some((skill: SkillData) => skill.name === d.name) ? '-' : '+'}</div>
        </div>
    )
}

const Skill = ({ skillsData, uniqueSkillPoints, setUniqueSkillPoints, totalSkillPoints, aptitudes, conditionToCategory, multiplierMap, onRemove, setSkills, setAptitudes }: SkillProps) => {

    const [search, setSearch] = useState<string>("")
    const [skillsList, setSkillsList] = useState<SkillData[]>(null as unknown as SkillData[])

    useEffect(() => {
        fetch('/api/skills')
            .then(response => response.json())
            .then(data => setSkillsList(data))
            .catch(error => console.error('Error fetching skills:', error));
    }, [])

    const filteredSkillsList = (skillsList ?? []).filter(i => i.name.toLowerCase().includes(search.toLowerCase()))

    const [starLevel, setStarLevel] = useState(0);
    const [uniqueSkillLevel, setUniqueSkillLevel] = useState(1)

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
        narrowfield: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30071.png',
        greenspeed: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10011.png',
        greenstamina: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10021.png',
        greenpower: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10031.png',
        greenguts: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10041.png',
        greenwit: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10051.png',
        greenrandom: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10061.png',
    };

    const goldSkillTypeIconMap: Record<string, string | null> = {
        velocity: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20012.png',
        acceleration: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20042.png',
        navigation: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20052.png',
        gate: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20062.png',
        viewfield: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20092.png',
        recovery: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_20022.png',
        hesitation: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30012.png',
        panicking: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30022.png',
        ragebaiting: null,
        disturb: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30052.png',
        narrowfield: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_30072.png',
        greenspeed: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10012.png',
        greenstamina: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10022.png',
        greenpower: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10032.png',
        greenguts: null,
        greenwit: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10052.png',
        greenrandom: 'https://gametora.com/images/umamusume/skill_icons/utx_ico_skill_10062.png',
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
            <AptitudesC setAptdVal={setAptitudes} apdtTrack={aptitudes.track} aptdDistance={aptitudes.distance} aptdStyle={aptitudes.style} />
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
                    const iconUrl = d.gold ? goldSkillTypeIconMap[d.type ?? ""] || "" : skillTypeIconMap[d.type ?? ""] || "";

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
                {process.env.NEXT_PUBLIC_DEBUG_MODE === '1' && <h3 className="total-skill-pts">
                    <p>{totalSkillPoints} Pts</p>
                </h3>}
                <LabelGreenButton className='add-skill-button' htmlFor='add-skill-checkbox'>
                    Add Skill
                </LabelGreenButton>
            </div>
            <input type="checkbox" id="add-skill-checkbox" />
            <div className="add-skill-wrapper">
                <div className="add-skill-panel">
                    <div className="search-skill-panel">
                        <input type="search" id="search-skill" onChange={(e) => setSearch(e.target.value)} value={search} />
                        <LabelWhiteButton htmlFor='add-skill-checkbox' id='close-add-skill' >Close</LabelWhiteButton>
                    </div>
                    <div className="skill-lists">
                        {filteredSkillsList.map((d: SkillData, i: number) => {
                            const iconUrl = d.gold ? goldSkillTypeIconMap[d.type ?? ""] || "" : skillTypeIconMap[d.type ?? ""] || "";
                            return (
                                <SkillItem key={i} d={d} i={i} setSkills={setSkills} iconUrl={iconUrl} skillsData={skillsData} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skill;
