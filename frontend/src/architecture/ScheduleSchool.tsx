import { IPlanSchool, ITeachSchool } from "../interfaces/interface"
import { Schedule } from "./Schedule"
import { ScheduleSettings } from "./ScheduleSettings"
import apiPos from '../architecture/fetchConnect'

export class ScheduleSchool extends Schedule{
    public settings?: ScheduleSettings
    constructor(public id: number, public name: string, public type: string, public createDate: string, settings?: ScheduleSettings) {
        super(id, name, type, createDate, settings)
        this.settings = settings
    }

    public currentDir?: number

    public study_plan?: IPlanSchool[]
    public teachers?: ITeachSchool[]

    public saveSettingsSchedule(flag: string, semestr: number, accHour: number, grafic: any, audit: any, start: string, end: string, courses: any){
        if(flag === 'first'){
            let ans = apiPos({'id': this.id, 'semester': semestr, 'accHour': accHour, 'grafic': grafic, 'audit': audit, 'start': start, 'end': end, 'courses': courses}, '/settingsFirstSchool')
            return ans
        }else if(flag === 'second'){
            let ans = apiPos({'id': this.id, 'semester': semestr, 'accHour': accHour, 'grafic': grafic, 'audit': audit, 'start': start, 'end': end, 'courses': courses}, '/settingsSecondSchool')
            return ans
        }
    }


    public addDirection(type:string, courseNumber: number, nameCourse: any, data: string[]){
        let ans = apiPos({'id': this.id, 'numberCourse': courseNumber, 'nameCourse': nameCourse, 'data': data}, '/addPlanSchool')
        return ans
    }

    public deleteDirection(numberCourse: number, name_course: any){
        let ans = apiPos({'id': this.id, 'numberCourse': numberCourse, 'name_course': name_course}, '/deletePlanSchool')
        return ans
    }

    public editDirection(numberCourse: number, name_course: any, data: any){
        let ans = apiPos({'id': this.id, 'numberCourse': numberCourse, 'name_course': name_course, 'data': data}, '/editPlanSchool')
        return ans
    }

    public addCafedra(nameKafedra: string, data: any){
        let ans = apiPos({'id': this.id, 'nameKafedra': nameKafedra, 'data': data}, '/addCafedraSchool')
        return ans
    }

    public deleteCafedra(nameCafedra: string){
        let ans = apiPos({'id': this.id, 'nameCafedra': nameCafedra}, '/deleteCafedraSchool')
        return ans
    }

    public editCafedra(nameCafedra: string, data: any){
        let ans = apiPos({'id': this.id, 'nameCafedra': nameCafedra, 'data': data}, '/editCafedraSchool')
        return ans
    }

    public addClass(classes: string, name_sub:string){}
}