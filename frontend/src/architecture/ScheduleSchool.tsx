import { IPlanSchool, ITeachSchool } from "../interfaces/interface"
import { Schedule } from "./Schedule"

export class ScheduleSchool extends Schedule{
    public currentDir?: number

    public study_plan?: IPlanSchool[]
    public teachers?: ITeachSchool[]

    public addClass(classes: string, name_sub:string){}
}