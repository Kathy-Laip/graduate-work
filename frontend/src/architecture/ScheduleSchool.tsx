import { IPlanSchool, ITeachSchool } from "../interfaces/interface"
import { Schedule } from "./Schedule"

export class ScheduleSchool extends Schedule{
    constructor(public name: string, public type: string, public createDate: string) {
        super(name, type, createDate)
    }
    public currentDir?: number

    public study_plan?: IPlanSchool[]
    public teachers?: ITeachSchool[]

    public addClass(classes: string, name_sub:string){}
}