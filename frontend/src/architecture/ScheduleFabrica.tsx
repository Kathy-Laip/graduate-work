import { Schedule } from "./Schedule";
import { ScheduleSchool } from "./ScheduleSchool";
import { ScheduleUni } from "./ScheduleUni";

export class ScheduleFabrica{
    public create(name: string, type: string, createDate: string){
        if(type === 'uni'){
            return new ScheduleUni(name, type, createDate)

        }else if(type === 'school'){
            return new ScheduleSchool(name, type, createDate)
        }
        else{
            return 'ERROR_CREATE'
        }

    }
}