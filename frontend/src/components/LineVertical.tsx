import React from "react";

type LineH = {
    height: string,
    top: string,
    left?: string
}


export const LineVertical: React.FC<LineH> = (props) => {
    return (
        <>
            <div className="lineV" style={{height: props.height, top: props.top, left: props.left}}></div>
        </>
    )
}