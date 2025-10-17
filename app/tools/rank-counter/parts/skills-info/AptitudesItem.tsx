'use client'

import { produce } from 'immer';
import './AptitudesItem.css'
import Image from 'next/image';

const rankIcons: Record<string, string> = {
    s: "/ranks/s.png",
    a: "/ranks/a.png",
    b: "/ranks/b.png",
    c: "/ranks/c.png",
    d: "/ranks/d.png",
    e: "/ranks/e.png",
    f: "/ranks/f.png",
    g: "/ranks/g.png",
};

const AptitudeIcon = ({ aptdDetails }: { aptdDetails: string }) => {
    const src = rankIcons[aptdDetails.toLowerCase()];

    if (!src) return <div style={{ width: 18, height: 18 }} />;

    return (
        <Image
            src={src}
            alt={`${aptdDetails.toUpperCase()} rank`}
            width={18}
            height={18}
            priority
        />
    );
};

const AptitudesItem = ({ type, setValue, aptdType, aptdDetails, aptdDetailsValue }: { type: string; setValue?: React.Dispatch<React.SetStateAction<string>>; aptdType?: string; aptdDetails?: string; aptdDetailsValue?: string; }) => {

    if (type === 'blank') return <div className="aptitudes-item">
        <p></p>
        <div className="apt-icon">
            <div style={{ width: '18px', height: '18px' }}></div>
        </div>
    </div>

    return (
        <div className="aptitudes-item" style={{ border: 'solid 2px #e2d4c9' }}>
            <p>{type}</p>
            <div className="apt-icon">
                <AptitudeIcon aptdDetails={aptdDetailsValue ?? ""} />
            </div>
            <select
                id="apt-rank-select"
                onChange={(e) => {
                    if (!aptdType || !aptdDetails) return;
                    setValue?.(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        produce((draft: any) => {
                            draft[aptdType][aptdDetails] = e.target.value;
                        })
                    );
                }}
            >
                {["s", "a", "b", "c", "d", "e", "f", "g"].map((rank) => (
                    <option key={rank} value={rank}>
                        {rank.toUpperCase()}
                    </option>
                ))}
            </select>

        </div>
    )
}

export default AptitudesItem