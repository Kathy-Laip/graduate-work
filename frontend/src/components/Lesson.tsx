import React, {useState} from "react";

type Les = {
    color: string,
    top: string,
    left: string,
    height: string,
    text: any,
    data? : string,
    width?: string
}

export const Lesson: React.FC<Les> = (props) => {
    return (
        <div className="lesson bdR5" style={{backgroundColor: props.color, top: props.top, left: props.left, height: props.height, width: props.width}}>
            <span>{props.text.name}</span>
            <span>Аудитория: {props.text.place}</span>
            <span>{props.text.teach}</span>
            <span>{props.text.period}</span>
            <span>{props.data}</span>
        </div>
    )
}