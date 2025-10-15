'use client'

import './AptitudesItem.css'
import Image from 'next/image';

const AptitudesItem = ({ type }: { type: string; }) => {

    if (type === 'blank') return <div className="aptitudes-item"></div>

    return (
        <div className="aptitudes-item" style={{ border: 'solid 2px #e2d4c9' }}>
            <p>{type}</p>
            <div className="apt-icon">
                <Image
                    src='/ranks/a.png'
                    alt="rank-icon"
                    width={18}
                    height={18}
                    priority
                />
            </div>
        </div>
    )
}

export default AptitudesItem