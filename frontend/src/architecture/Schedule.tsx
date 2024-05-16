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

    constructor(id:number, name: string, type: string, createDate: string, settings?: ScheduleSettings){
        this.id = id
        this.name = name
        this.type = type
        this.createDate = createDate
        this.settings = settings
    }
}