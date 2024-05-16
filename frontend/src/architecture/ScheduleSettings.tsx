export class ScheduleSettings{
    constructor(public period: number, 
        public acc_hour: number, public work_times: object[], 
        public start_date: string, 
        public end_date: string, public count_class: number,
        public arr_courses: object[]){
    }
}