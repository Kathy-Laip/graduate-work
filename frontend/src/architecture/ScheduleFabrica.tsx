import { Schedule } from "./Schedule";
import { ScheduleSchool } from "./ScheduleSchool";
import { ScheduleUni } from "./ScheduleUni";

export class ScheduleFabrica{
    public create(id: number, name: string, type: string, createDate: string){
        if(type === 'uni'){
            return new ScheduleUni(id, name, type, createDate)

        }else if(type === 'school'){
            return new ScheduleSchool(id, name, type, createDate)
        }
        else{
            return 'ERROR_CREATE'
        }

    }
}