import { Schedule } from "./Schedule"
import apiPos from './fetchConnect'

export class User{
    public login: string
    public password: string

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
        let ans = apiPos({'login': this.login, 'password': this.password}, '/logIn')
        return ans
    }

    public getListOfSchedules(){ }

    public addSchedule(){}
    public editSchedule(){}
    public deleteSchedule(){}

    public uploasSchedule(){}
}