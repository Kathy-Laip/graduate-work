import { Schedule } from "./Schedule"
import apiPos from './fetchConnect'

export class User{
    public login: string
    public password: string

    public currentSchedule?: Schedule
    public openSchedules?: Schedule[]

    public listOfSchedules?: Schedule[]
    
    constructor(login: string, password: string){
        this.login = login
        this.password = password
    }

    public async signIn(){
        let ans = apiPos({'newLogin': this.login, 'newPassword': this.password}, '/newUser')  
        return ans      
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