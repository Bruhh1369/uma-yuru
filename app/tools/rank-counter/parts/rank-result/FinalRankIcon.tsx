import Image from "next/image";

const FinalRankIcon = ({ rating }: { rating: number }) => {
    const rankTable = [
        { max: 599, src: "/ranks/gp.png" },
        { max: 899, src: "/ranks/f.png" },
        { max: 1299, src: "/ranks/fp.png" },
        { max: 1799, src: "/ranks/e.png" },
        { max: 2299, src: "/ranks/ep.png" },
        { max: 2899, src: "/ranks/d.png" },
        { max: 3499, src: "/ranks/dp.png" },
        { max: 4899, src: "/ranks/c.png" },
        { max: 6499, src: "/ranks/cp.png" },
        { max: 8199, src: "/ranks/b.png" },
        { max: 9999, src: "/ranks/bp.png" },
        { max: 12099, src: "/ranks/a.png" },
        { max: 14499, src: "/ranks/ap.png" },
        { max: 15899, src: "/ranks/s.png" },
        { max: 17499, src: "/ranks/sp.png" },
        { max: 19199, src: "/ranks/ss.png" },
        { max: 19599, src: "/ranks/ssp.png" }
    ];
    const rank = rankTable.find((r) => rating <= r.max);

    if (!rank) return null

    return (
        <Image
            src={rank.src}
            alt="rank-icon"
            fill
            sizes="100%"
            priority
        />
    )
}

export default FinalRankIcon