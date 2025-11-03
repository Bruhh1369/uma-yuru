import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { Aptitudes } from "../../assets/types/aptitudes"

interface AptitudesStore {
    aptitudes: Aptitudes
    updateAptitude: (
        category: keyof Aptitudes,
        key: string,
        value: string
    ) => void
}

export const useAptitudesStore = create<AptitudesStore>()(
    immer((set) => ({
        aptitudes: {
            track: { turf: "a", dirt: "a" },
            distance: { short: "a", mile: "a", medium: "a", long: "a" },
            style: { front: "a", pace: "a", late: "a", end: "a" },
        },

        updateAptitude: (category, key, value) => {
            set((state) => {
                state.aptitudes[category][key] = value
            })
        },
    }))
)