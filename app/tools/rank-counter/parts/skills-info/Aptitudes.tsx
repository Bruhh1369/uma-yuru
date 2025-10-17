'use client'

import './Aptitudes.css'
import AptitudesItem from './AptitudesItem'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Aptitudes = ({ setAptdVal, apdtTrack, aptdDistance, aptdStyle }: any) => {
    return (
        <div className="aptitudes">
            <div className="apt-heading">
                <p>Track</p>
                <p>Distance</p>
                <p>Style</p>
            </div>
            <div className="apt-items">
                <AptitudesItem type='Turf' setValue={setAptdVal} aptdType='track' aptdDetails='turf' aptdDetailsValue={apdtTrack.turf} />
                <AptitudesItem type='Sprint' setValue={setAptdVal} aptdType='distance' aptdDetails='short' aptdDetailsValue={aptdDistance.short} />
                <AptitudesItem type='Front' setValue={setAptdVal} aptdType='style' aptdDetails='front' aptdDetailsValue={aptdStyle.front} />
            </div>
            <div className="apt-items">
                <AptitudesItem type='Dirt' setValue={setAptdVal} aptdType='track' aptdDetails='dirt' aptdDetailsValue={apdtTrack.dirt} />
                <AptitudesItem type='Mile' setValue={setAptdVal} aptdType='distance' aptdDetails='mile' aptdDetailsValue={aptdDistance.mile} />
                <AptitudesItem type='Pace' setValue={setAptdVal} aptdType='style' aptdDetails='pace' aptdDetailsValue={aptdStyle.pace} />
            </div>
            <div className="apt-items">
                <AptitudesItem type='blank' />
                <AptitudesItem type='Medium' setValue={setAptdVal} aptdType='distance' aptdDetails='medium' aptdDetailsValue={aptdDistance.medium} />
                <AptitudesItem type='Late' setValue={setAptdVal} aptdType='style' aptdDetails='late' aptdDetailsValue={aptdStyle.late} />
            </div>
                <div className="apt-items">
                    <AptitudesItem type='blank' />
                    <AptitudesItem type='Long' setValue={setAptdVal} aptdType='distance' aptdDetails='long' aptdDetailsValue={aptdDistance.long} />
                    <AptitudesItem type='End' setValue={setAptdVal} aptdType='style' aptdDetails='end' aptdDetailsValue={aptdStyle.end} />
                </div>
        </div>
    )
}

export default Aptitudes