import { Schedule } from "./Schedule";
import { IPlanUni, ITeachUni } from "../interfaces/interface";

export class ScheduleUni extends Schedule{
    constructor(public name: string, public type: string, public createDate: string) {
        super(name, type, createDate)
    }
    public currentCoorse?: number
    public currentDir?: string

    public study_plan?: IPlanUni[]
    public teachers?: ITeachUni[]

    public addClassLect(count: number, dirs: string[], period: string, name_sub: string){}
    public addClassPractic(group: string, period: string, name_sub: string){}
    public addClassLab(group: string, period: string, name_sub: string){}
    public addClassExam(group: string, name_sub: string){}
}