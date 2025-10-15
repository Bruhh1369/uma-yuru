import Image from "next/image";

const RankIcon = ({ statCount }: { statCount: number }) => {
    const rankTable = [
        { max: 49, src: "/ranks/g.png" },
        { max: 99, src: "/ranks/gp.png" },
        { max: 149, src: "/ranks/f.png" },
        { max: 199, src: "/ranks/fp.png" },
        { max: 249, src: "/ranks/e.png" },
        { max: 299, src: "/ranks/ep.png" },
        { max: 349, src: "/ranks/d.png" },
        { max: 399, src: "/ranks/dp.png" },
        { max: 499, src: "/ranks/c.png" },
        { max: 599, src: "/ranks/cp.png" },
        { max: 699, src: "/ranks/b.png" },
        { max: 799, src: "/ranks/bp.png" },
        { max: 899, src: "/ranks/a.png" },
        { max: 999, src: "/ranks/ap.png" },
        { max: 1049, src: "/ranks/s.png" },
        { max: 1099, src: "/ranks/sp.png" },
        { max: 1149, src: "/ranks/ss.png" },
        { max: 1200, src: "/ranks/ssp.png" }
    ];
    const rank = rankTable.find((r) => statCount <= r.max);

    if (!rank) return null

    return (
        <Image
            src={rank.src}
            alt="rank-icon"
            width={40}
            height={40}
            priority
        />
    )
}

export default RankIcon