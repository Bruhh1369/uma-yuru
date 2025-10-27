import ProtectedImage from "@/app/assets/custom/ProtectedImage";

const FinalRankIcon = ({ rating }: { rating: number }) => {
    const rankTable = [
        { max: 899, src: "/ranks/final/f.png" },
        { max: 599, src: "/ranks/final/gp.png" },
        { max: 1299, src: "/ranks/final/fp.png" },
        { max: 1799, src: "/ranks/final/e.png" },
        { max: 2299, src: "/ranks/final/ep.png" },
        { max: 2899, src: "/ranks/final/d.png" },
        { max: 3499, src: "/ranks/final/dp.png" },
        { max: 4899, src: "/ranks/final/c.png" },
        { max: 6499, src: "/ranks/final/cp.png" },
        { max: 8199, src: "/ranks/final/b.png" },
        { max: 9999, src: "/ranks/final/bp.png" },
        { max: 12099, src: "/ranks/final/a.png" },
        { max: 14499, src: "/ranks/final/ap.png" },
        { max: 15899, src: "/ranks/final/s.png" },
        { max: 17499, src: "/ranks/final/sp.png" },
        { max: 19199, src: "/ranks/final/ss.png" },
        { max: 19599, src: "/ranks/final/ssp.png" }
    ];
    const rank = rankTable.find((r) => rating <= r.max);

    if (!rank) return null

    return (
        <ProtectedImage
            src={rank.src}
            alt="rank-icon"
            fill
            sizes="100%"
            priority
        />
    )
}

export default FinalRankIcon