import React from "react";

type LineH = {
    width: string,
    top: string,
    left?: string
}


export const LineHorizont: React.FC<LineH> = (props) => {
    return (
        <>
            <div className="lineH" style={{width: props.width, top: props.top, left: props.left}}></div>
        </>
    )
}