import './RankResult.css'
import FinalRankIcon from './FinalRankIcon';

const RankResult = ({rating}: {rating: number;}) => {
    return (
        <div className='rank-result'>
            <div className="rank-result-content">
                <div>
                    <FinalRankIcon rating={rating} />
                </div>
                <div>
                    <p>Rating</p>
                    <p>{rating.toLocaleString('en-US')}</p>
                </div>
            </div>
        </div>
    )
}

export default RankResult