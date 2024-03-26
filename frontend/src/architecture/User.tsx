import { Schedule } from "./Schedule"
import { ScheduleSchool } from "./ScheduleSchool";
import { ScheduleUni } from "./ScheduleUni";
import apiPos from './fetchConnect'
import {ISCH} from '../interfaces/interface'

export class User{
    public login: string
    public password: string

    public currentSchedule?: ScheduleSchool | ScheduleUni | 'ERROR_CREATE'
    public openSchedules?: Schedule[]

    public listOfSchedules: (ScheduleSchool|ScheduleUni|'ERROR_CREATE')[] = []
    
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

    public async getListOfSchedules(){ 
        console.log(this.login, this.password)
        let ans = apiPos({'login': this.login, 'password': this.password}, '/getSchedules')
        return ans
    }

    public async addSchedule(theme: string, type: string){
        const dateObj = new Date();
        const month   = dateObj.getUTCMonth() + 1; // months from 1-12
        const day     = dateObj.getUTCDate();
        const year    = dateObj.getUTCFullYear();

        const hour = dateObj.getHours()
        const minutes = dateObj.getMinutes()
        const sec = dateObj.getSeconds()

        const newDate = year + "-" + month + "-" + day + ' ' + hour + ':' + minutes + ':' + sec;
        let ans = apiPos({'theme': theme, 'type': type, 'date': newDate, 'login': this.login, 'password': this.password}, '/addSchedule')
        return ans

    }

    public async editSchedule(newTheme: string, data: any){
        let ans = apiPos({'login': this.login, 'password': this.password, 'newTheme': newTheme, 'data': data}, '/editThemeSch')
        return ans
    }

    public async editScheduleType(newType: string, data: any){
        let ans = apiPos({'login': this.login, 'password': this.password, 'newType': newType, 'data': data}, '/editTypeSch')
        return ans
    }

    public async editScheduleAll(newTheme: string, newType: string, data: any){
        let ans = apiPos({'login': this.login, 'password': this.password, 'newTheme': newTheme, 'newType': newType,'data': data}, '/editAllSch')
        return ans
    }

    public async deleteSchedule(data: any){
        let ans = apiPos({'login': this.login, 'password': this.password, 'data': data}, '/deleteSch')
        return ans
    }

    public uploasSchedule(){}
}