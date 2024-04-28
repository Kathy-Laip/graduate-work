import { Schedule } from "./Schedule";
import { IPlanUni, ITeachUni } from "../interfaces/interface";
import { ScheduleSettings } from "./ScheduleSettings"
import apiPos from '../architecture/fetchConnect'

export class ScheduleUni extends Schedule{
    public settings?: ScheduleSettings
    constructor(public id: number, public name: string, public type: string, public createDate: string, settings?: ScheduleSettings) {
        super(id, name, type, createDate, settings)
        this.settings = settings
    }
    public currentCoorse?: number
    public currentDir?: string

    public study_plan?: IPlanUni[]
    public teachers?: ITeachUni[]

    public saveSettingsSchedule(flag: string, semestr: number, accHour: number, grafic: any, audit: any, start: string, end: string, courses: any){
        if(flag === 'first'){
            let ans = apiPos({'id': this.id, 'semester': semestr, 'accHour': accHour, 'grafic': grafic, 'audit': audit, 'start': start, 'end': end, 'courses': courses}, '/settingsFirst')
            return ans
        }else if(flag === 'second'){
            let ans = apiPos({'id': this.id, 'semester': semestr, 'accHour': accHour, 'grafic': grafic, 'audit': audit, 'start': start, 'end': end, 'courses': courses}, '/settingsSecond')
            return ans
        }
    }

    public addDirection(type:string, courseNumber: number, nameCourse: string, data: string[]){
        let ans = apiPos({'id': this.id, 'numberCourse': courseNumber, 'nameCourse': nameCourse, 'data': data}, '/addPlanUni')
        return ans
    }

    public deleteDirection(numberCourse: number, name_course: string){
        let ans = apiPos({'id': this.id, 'numberCourse': numberCourse, 'name_course': name_course}, '/deletePlanUni')
        return ans
    }

    public editDirection(numberCourse: number, name_course: string, data: any){
        let ans = apiPos({'id': this.id, 'numberCourse': numberCourse, 'name_course': name_course, 'data': data}, '/editPlanUni')
        return ans
    }

    public addCafedra(nameKafedra: string, data: any){
        let ans = apiPos({'id': this.id, 'nameKafedra': nameKafedra, 'data': data}, '/addCafedraUni')
        return ans
    }

    public deleteCafedra(nameCafedra: string){
        let ans = apiPos({'id': this.id, 'nameCafedra': nameCafedra}, '/deleteCafedraUni')
        return ans
    }

    public editCafedra(nameCafedra: string, data: any){
        let ans = apiPos({'id': this.id, 'nameCafedra': nameCafedra, 'data': data}, '/editCafedraUni')
        return ans
    }

    public addClassLect(data: any){
        let ans = apiPos({'work_id': this.id, 'data': data}, '/addLessonLectUni')
        return ans
    }

    public addClassPractic(data: any){
        let ans = apiPos({'work_id': this.id, 'data': data}, '/getLessonPracticUni')
        return ans
    }
    public addClassLab(data: any){
        let ans = apiPos({'work_id': this.id, 'data': data}, '/getLessonLabUni')
        return ans
    }

    public addClassExam(data: any){
        let ans = apiPos({'work_id': this.id, 'data': data}, '/getLessonExamUni')
        return ans
    }

    public addClassMinExam(data:any){
        let ans = apiPos({'work_id': this.id, 'data': data}, '/getLessonMinExamUni')
        return ans
    }

    public getClasses(data: any){
        let ans = apiPos({'work_id': this.id, 'data': data}, '/getScheduleUni')
        return ans
    }

    public getSubject(data: any){
        let ans = apiPos({'work_id': this.id, 'data': data}, '/getSubjectUni')
        return ans
    }

    public addLessons(data: any){
        let ans = apiPos({'work_id': this.id, 'data': data}, '/addLessonsUni')
        return ans
    }

    public deleteLesson(id: number){
        let ans = apiPos({'id': id}, '/deleteLessonUni')
        return ans
    }

    public addExamOrMin(data: any){
        let ans = apiPos({'work_id': this.id, 'data': data}, '/addExamOrMin')
        return ans
    }
}