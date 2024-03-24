import { Schedule } from "./Schedule"
import { ScheduleSchool } from "./ScheduleSchool";
import { ScheduleUni } from "./ScheduleUni";
import { ScheduleFabrica } from "./ScheduleFabrica"
import { switchBlock } from "../constants/const"
import { Messages } from "../components/Message"
import apiPos from './fetchConnect'

export class User{
    public login: string
    public password: string

    public currentSchedule?: Schedule
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
    public editSchedule(){}
    public deleteSchedule(){}

    public uploasSchedule(){}
}