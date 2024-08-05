export default function Square({ column, row, transparentEffectDirection, blockColor, zIndex }) {
    return (
        <>
            <div className="absolute w-full h-full inset-0 z-0" style={{
                backgroundSize: `${column}rem ${row}rem`,
                backgroundImage: `linear-gradient(to right, ${blockColor} 1px, transparent 1px), linear-gradient(to bottom, ${blockColor} 1px, transparent 1px)`,
                zIndex: zIndex || "-10",
            }} />
            {transparentEffectDirection == "bottomToTop" && (
                <div className="absolute inset-0 -z-[9] h-full w-full bg-gradient-to-t from-[#12131a] via-[#12131a]/50" style={{
                    zIndex: zIndex ? zIndex + 1 : "-10",
                }} />
            )}
            {transparentEffectDirection == "leftRightBottomTop" && (
                <>
                    <div className="absolute h-full w-full bg-gradient-to-t from-[#12131a] via-[#12131a]/50" style={{
                        zIndex: zIndex ? zIndex + 1 : "-10",
                    }} />
                    <div className="absolute inset-0 -z-[9] h-full w-full bg-gradient-to-b from-[#12131a] via-[#12131a]/50" style={{
                        zIndex: zIndex ? zIndex + 1 : "-10",
                    }} />
                    <div className="absolute inset-0 -z-[9] h-full w-full bg-gradient-to-l from-[#12131a] via-[#12131a]/50" style={{
                        zIndex: zIndex ? zIndex + 1 : "-10",
                    }} />
                    <div className="absolute inset-0 -z-[9] h-full w-full bg-gradient-to-r from-[#12131a] via-[#12131a]/50" style={{
                        zIndex: zIndex ? zIndex + 1 : "-10",
                    }} />
                </>
            )}
        </>
    );
}