import { Schedule } from "./Schedule";
import { ScheduleSchool } from "./ScheduleSchool";
import { ScheduleSettings } from "./ScheduleSettings";
import { ScheduleUni } from "./ScheduleUni";

export class ScheduleFabrica{
    public create(id: number, name: string, type: string, createDate: string, setting?: any, courseCount?: number, grafic?: any, courses?:any){
        if(type === 'uni'){
            if(setting && courseCount && grafic && courses){
                // console.log(settings)
                let settings = new ScheduleSettings(setting.period, setting.acc_hour, grafic, setting.start, setting.end, courseCount, courses)
                // console.log(sets)
                return new ScheduleUni(id, name, type, createDate, settings)
            }else{
                return new ScheduleUni(id, name, type, createDate)
            }

        }else if(type === 'school'){
            if(setting && courseCount && grafic && courses){
                let settings = new ScheduleSettings(setting.period, setting.acc_hour, grafic, setting.start, setting.end, courseCount, courses)
                return new ScheduleSchool(id, name, type, createDate, settings)
            }else{
                return new ScheduleSchool(id, name, type, createDate)
            }
        }
        else{
            return 'ERROR_CREATE'
        }

    }
}