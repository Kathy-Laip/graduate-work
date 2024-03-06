import React from "react";
import { ICircle } from "../interfaces/interface";

type Circles ={
    circle: ICircle
}

export const Circle: React.FC<Circles> = (props) => {
    return (
        <div className="circle" style={{
            width: props.circle.width,
            height: props.circle.width, 
            top: props.circle.top,
            bottom: props.circle.bottom,
            left: props.circle.left,
            right: props.circle.right,
            zIndex: props.circle.zInd,
            backgroundColor: props.circle.color}}>
        </div>
    )
}