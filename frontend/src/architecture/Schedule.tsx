import { IClass } from "../interfaces/interface"
import { ScheduleSettings } from "./ScheduleSettings"
import apiPos from '../architecture/fetchConnect'

export class Schedule{
    public id: number
    public name: string
    public type: string
    public createDate: string

    public settings?: ScheduleSettings
    public cafedras?: []

    public listOfClasses? = Array.from({length: 10}, () => '')
    public newClasses?: IClass[]

    public suggestion?: IClass[]

    constructor(id:number, name: string, type: string, createDate: string, settings?: ScheduleSettings){
        this.id = id
        this.name = name
        this.type = type
        this.createDate = createDate
        this.settings = settings
    }

    public getStudyPlan(){}
    public getTeachers(){}
    public getCourse() {}
    public getDirection(){}

    public saveSettingsSchedule(flag: string, semestr: number, accHour: number, grafic: any, audit: any, start: string, end: string, courses: any){

    }

    public addDirection(type:string, courseNumber: number, nameCourse: string, data: string[]){

    }

    public deleteDirection(numberCourse: number, name_course: string){

    }

    public editDirection(numberCourse: number, name_course: string, data: any){

    }

    public addCafedra(nameKafedra: string, data: any){

    }

    public deleteCafedra(nameCafedra: string){}
    public editCafedra(nameCafedra: string, data: any){}

    public addNewClasses(classes: IClass[]){}

    public saveChanges(){}

    public getClasses(data: any){
    }
}