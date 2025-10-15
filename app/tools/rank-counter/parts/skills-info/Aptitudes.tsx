'use client'

import './Aptitudes.css'
import AptitudesItem from './AptitudesItem'

const Aptitudes = () => {
    return (
        <div className="aptitudes">
            <div className="apt-types">
                <p>Track</p>
                <p>Distance</p>
                <p>Style</p>
            </div>
            <div className="apts">
                <AptitudesItem type='Turf' />
                <AptitudesItem type='Dirt' />
                <AptitudesItem type='blank' />
                <AptitudesItem type='blank' />
                <AptitudesItem type='Sprint' />
                <AptitudesItem type='Mile' />
                <AptitudesItem type='Medium' />
                <AptitudesItem type='Long' />
                <AptitudesItem type='Front' />
                <AptitudesItem type='Pace' />
                <AptitudesItem type='Late' />
                <AptitudesItem type='End' />
            </div>
        </div>
    )
}

export default Aptitudes