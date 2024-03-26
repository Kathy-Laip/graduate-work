import { IClass } from "../interfaces/interface"
import { ScheduleSettings } from "./ScheduleSettings"

export class Schedule{
    public id: number
    public name: string
    public type: string
    public createDate: string

    public settings?: ScheduleSettings

    public listOfClasses?: IClass[]
    public newClasses?: IClass[]

    public suggestion?: IClass[]

    constructor(id:number, name: string, type: string, createDate: string){
        this.id = id
        this.name = name
        this.type = type
        this.createDate = createDate
    }

    public getClasses(){}
    public getStudyPlan(){}
    public getTeachers(){}
    public getCourse() {}
    public getDirection(){}
    public getCafedra(){}

    public saveSettingsSchedule(){}

    public addDirection(){}
    public editDirection(){}

    public addCafedra(){}
    public editCafedra(){}

    public addNewClasses(classes: IClass[]){}

    public saveChanges(){}
}