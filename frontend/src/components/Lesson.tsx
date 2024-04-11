import React, {useState} from "react";

type Les = {
    color: string,
    top: string,
    left: string,
    height: string,
    text: any
}

export const Lesson: React.FC<Les> = (props) => {
    return (
        <div className="lesson bdR5" style={{backgroundColor: props.color, top: props.top, left: props.left, height: props.height}}>
            <span>{props.text.name}</span>
            <span>{props.text.place}</span>
            <span>{props.text.teach}</span>
        </div>
    )
}