export default async function apiPos(obj: object, url: string){
    try{
        let res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj)
        })
        let result = await res.json()
        return result
    }
    catch{
        alert('Ошибка сервера!')
    }
}