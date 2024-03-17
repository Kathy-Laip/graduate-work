import { ScheduleSchool } from "./ScheduleSchool";
import { ScheduleUni } from "./ScheduleUni";

type ScheduleType = typeof ScheduleSchool | typeof ScheduleUni;

export class ScheduleFabrica{
    static list: { [key: string]: ScheduleType }  = {
        school: ScheduleSchool,
        uni: ScheduleUni
    }

    public create(name: string, type: string = 'school', createDate: Date){
        const ScheduleType = ScheduleFabrica.list[type]
        if(ScheduleType){
            const sch = new ScheduleType(name, type, createDate)

            return sch
        }else{
            return 'ERROR_CREATE'
        }

    }
}