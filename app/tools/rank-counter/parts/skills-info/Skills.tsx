import { useState } from "react";
import Aptitudes from "./Aptitudes";

type Track = { turf: string; dirt: string };
type Distance = { short: string; mile: string; medium: string; long: string };
type Style = { front: string; pace: string; late: string; end: string };
type Aptitudes = { track: Track; distance: Distance; style: Style };
type Condition = keyof Track | keyof Distance | keyof Style;
type Skill = { name: string; condition: Condition | null; cost: number };

const Skills = () => {

    const [skills, setSkills] = useState<Skill[]>([
        { name: "Professor of curvature", condition: null, cost: 217 },
        { name: "Swinging maestro", condition: "turf", cost: 217 },
        { name: "sss", condition: "pace", cost: 217 },
        { name: "end", condition: "end", cost: 217 }
    ])

    const [aptitudes, setAptitudes] = useState<Aptitudes>({
        track: {
            turf: "a",
            dirt: "b"
        },
        distance: {
            short: "g",
            mile: "a",
            medium: "a",
            long: "a"
        },
        style: {
            front: "a",
            pace: "a",
            late: "a",
            end: "e"
        }
    })

    const multiplierMap: Record<string, number> = {
        s: 1.1,
        a: 1.1,
        b: 0.9,
        c: 0.9,
        d: 0.8,
        e: 0.8,
        f: 0.8,
        g: 0.7
    };

    const conditionToCategory: Record<Condition, keyof Aptitudes> = {
        turf: "track",
        dirt: "track",
        short: "distance",
        mile: "distance",
        medium: "distance",
        long: "distance",
        front: "style",
        pace: "style",
        late: "style",
        end: "style"
    };

    const mapped = skills.map(skill => {
        if (!skill.condition) return skill.cost;
        const category = conditionToCategory[skill.condition];
        if (!category) return skill.cost;
        const group = aptitudes[category] as Record<string, string>;
        const grade = group[skill.condition];
        if (!grade) return skill.cost;
        const multiplier = multiplierMap[grade] ?? 1;

        return Math.round(skill.cost * multiplier);
    })

    const total = mapped.reduce((t, c) => { return t + c }, 0)

    return (
        <div className="apt-and-skill">
            <Aptitudes />
        </div>
    )
}

export default Skills