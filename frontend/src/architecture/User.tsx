import { Schedule } from "./Schedule"

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

    private signIn(){ }
    private logIn(){ }

    private getListOfSchedules(){ }

    private addSchedule(){}
    private editSchedule(){}
    private deleteSchedule(){}

    private uploasSchedule(){}
}