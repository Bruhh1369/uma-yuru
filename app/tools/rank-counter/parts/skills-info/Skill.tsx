'use client';
import { useState } from 'react';
import './Skill.css';
import Image from 'next/image';

const Skill = () => {
    const [starLevel, setStarLevel] = useState(0);

    const handleStarClick = (level: number) => {
        setStarLevel(prev => (prev === level ? level - 1 : level));
    };

    return (
        <div className="skill">
            <div className="skill-header">
                <div className="skill-header-content">
                    <div className="uma-icon">
                        <Image
                            src='https://images.start.gg/images/tournament/805954/image-5c808f7e6a9ea8b8bb540a60b0223e4d.png'
                            alt='uma-icon'
                            fill
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
                                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px"><path d="M333.33-259 480-347l146.67 89-39-166.67 129-112-170-15L480-709l-66.67 156.33-170 15 129 112.34-39 166.33ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-353.33Z"/></svg>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="skill-main">
                main
            </div>
        </div>
    );
};

export default Skill;
