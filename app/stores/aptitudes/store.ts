import { create } from 'zustand'
import { produce } from 'immer'
import type { Aptitudes } from '../../assets/types/aptitudes'

interface AptitudeStore {
    aptitudes: Aptitudes
    updateAptitude: <K extends keyof Aptitudes>(
        category: K,
        key: keyof Aptitudes[K],
        value: string
    ) => void
}

export const useAptitudeStore = create<AptitudeStore>((set) => ({
    aptitudes: {
        track: { turf: 'a', dirt: 'a' },
        distance: { short: 'a', mile: 'a', medium: 'a', long: 'a' },
        style: { front: 'a', pace: 'a', late: 'a', end: 'a' }
    },
    updateAptitude: (category, key, value) =>
        set(produce((state) => {
            state.aptitudes[category][key] = value
        }))
}))
