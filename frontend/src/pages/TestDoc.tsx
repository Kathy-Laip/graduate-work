import React, {useState} from "react";
import {read, utils} from 'xlsx'

async function apiData(obj: Object, strAPI: string) { // функия для отправки данных 
  try{
      let res = await fetch(strAPI,{
          method: 'POST',
          body: JSON.stringify(obj),
          headers:{
              'Content-Type': 'application/json'
          }
      })
      let result = await res.json()
      return result
  }
  catch{
      alert('Что-то не так с данными')
  }
}

interface President { // интерфейс данных
  Name: string;
  Index: number;
}


export const TextDoc: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [pres, setPres] = useState<President[]>([]);

    const handleFileChange = (e: any) => { //функция замены файла
      const file = e.target.files && e.target.files[0]; 
      setSelectedFile(file);
    };

    const handleUpload = () => { // функция загрузки содержимого и отправки данных на сервер при нажатии на кнопку
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const result = event.target.result;
          
          const workbook = read(result, { type: 'binary' });
          const ws = workbook.Sheets[workbook.SheetNames[0]]
          const data: President[] = utils.sheet_to_json<President>(ws); // generate objects
          setPres(data);
          
          let res = apiData({"data": pres}, '/')
          res.then(value => {
            console.log(value)
          })
          res.catch(value => {
            alert(value)
          })
        };
        reader.readAsBinaryString(selectedFile);
      }
    };

    return (
      <div>
        <input type="file"  id="avatar"  accept=".xlsx" onChange={handleFileChange} />
        <button className="btn1" onClick={handleUpload}>Upload</button>
      </div>
    );
}