export class ScheduleSettings{
    constructor(public first_setting: boolean, public period: number, 
        public acc_hour: number, public work_times: object[], 
        public place_work: object[], public start_date: Date, 
        public end_date: Date, public count_class: number,
        public arr_courses: object[]){
    }
}