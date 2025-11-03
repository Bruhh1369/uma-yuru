import { Track, Distance, Style } from './aptitudes'

export type Condition = keyof Track | keyof Distance | keyof Style;

export type SkillData = {
    name: string;
    condition?: Condition | null;
    cost: number;
    gold?: boolean;
    type?: "velocity" | "acceleration" | "navigation" | "gate" | "viewfield" | "recovery" | "greenspeed" | "greenstamina" | "greenpower" | "greenguts" | "greenwit" | "greenrandom" | "hesitation" | "panicking" | "ragebaiting" | "disturb" | "narrowfiled";
};