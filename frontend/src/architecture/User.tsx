import { Schedule } from "./Schedule"
import apiPos from './fetchConnect'

export class User{
    private login: string
    private password: string

    private currentSchedule?: Schedule
    private openSchedules?: Schedule[]

    private listOfSchedules?: Schedule[]
    
    constructor(login: string, password: string){
        this.login = login
        this.password = password
    }

    public signIn(){

    }
    public async logIn(){ 
        if(this.login && this.password){
            console.log('hello')
            let ans = apiPos({'login': this.login, 'password': this.password}, '/logIn')
            ans.then(answer => answer)
            ans.catch(() => {return 'error_server'})
        } else return 'empty_fields'
    }

    public getListOfSchedules(){ }

    public addSchedule(){}
    public editSchedule(){}
    public deleteSchedule(){}

    public uploasSchedule(){}
}