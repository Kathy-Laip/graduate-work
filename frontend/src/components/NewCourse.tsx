import React, { useState } from "react";

type Course = {
    number: number,
    change: Function
}

export const NewCouse: React.FC<Course> = (props) => {
    const [file, setFile] = useState<File|null>()
    const [name, setName] = useState<string>('Выберите файл')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]; 
        setFile(file)
        setName(file!.name)
        props.change(event)
    }

    return(
        <div key={props.number} className="datePeriod">
            <span>{props.number}</span>
            <form method="post" encType="multipart/form-data">
                <label className="input-file">
                    <input type="file" className='cs' name={`file-${props.number}`} onChange={handleFileChange} />		
                    <span>{name}</span>
                </label>
            </form>
        </div>
    )
}