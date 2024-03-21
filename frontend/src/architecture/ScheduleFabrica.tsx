import { Schedule } from "./Schedule";
import { ScheduleSchool } from "./ScheduleSchool";
import { ScheduleUni } from "./ScheduleUni";

type ScheduleType = typeof ScheduleSchool | typeof ScheduleUni;

export class ScheduleFabrica{
    static list: { [key: string]: ScheduleType }  = {
        'school': ScheduleSchool,
        'uni': ScheduleUni
    }

    public create(name: string, type: string, createDate: string){
        const SchType = ScheduleFabrica.list[type]
        if(SchType){
            return new SchType(name, type, createDate)

        }else{
            return 'ERROR_CREATE'
        }

    }
}