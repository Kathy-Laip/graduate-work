import { IPlanSchool, ITeachSchool } from "../interfaces/interface"
import { Schedule } from "./Schedule"
import { ScheduleSettings } from "./ScheduleSettings"

export class ScheduleSchool extends Schedule{
    public settings?: ScheduleSettings
    constructor(public id: number, public name: string, public type: string, public createDate: string, settings?: ScheduleSettings) {
        super(id, name, type, createDate, settings)
    }

    public currentDir?: number

    public study_plan?: IPlanSchool[]
    public teachers?: ITeachSchool[]

    public addClass(classes: string, name_sub:string){}
}