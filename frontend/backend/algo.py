from db_requests import *
import datetime
from datetime import datetime
import pandas as pd


# Как считать занятия
# Лекция
# Для каждого направления вычислить если этот предмет у всех и совпадают ли часы академические, а также проверить ведет ли у них общий преподаватель
# А также проверить есть ли уже в расписании данное занятие

# Посчитать занятия
# И выявить сколько занятий в неделю требуются и полные ли они есть ли периодичность

# В таблицы с расписаниями создать колонку с типом периодичности: каждую неделю/чет/нечет/1-6 неделя для каждого вставленного занятия 

# Выявить аудитории по типу, которые нам подходят 

# Если занятий на неделе несколько требуется
# выявить когда вообще можно поставить занятие, в зависимости от того, что уже есть занятые аудитории
# проверять ограничения по максимум пар в этот день, а также поставить так чтобы окон было максимум одно
# Вывести с информацией все комбинации, отправить на клиент 

def is_room_available(room, schedule):
    # ['257', '1211', 'суббота', array(['203', '12:10', '13:40'], dtype='<U21')] room 
    # [201, 'понедельник'] sch
    time, week = room[3][0], room[2]
    for item in schedule:
        if item[0] == time and item[1] == week:
            return False
    return True

def is_time_slot_available(room, schedule):
    # ['257', '1211', 'суббота', array(['203', '12:10', '13:40'], dtype='<U21')] room 
    # [201, 'понедельник'] sch
    week = room[2]
    count = 0
    for item in schedule:
        if item[1] == week:
            count += 1
    return count < 5


def algo(work_id, info, type_inst):
    type_less = info['type']
    info_groups = info['groups']
    subj = info['sub']
    typeLess = 1

    if(type_inst == 'uni' and type_less == 'lect'):
        arr = []
        tech_id = []

        for i in range(len(info_groups)):
            course_id = getCourseID(info_groups[i]['courseNumber'], work_id)
            dir_id = getDirection(course_id, info_groups[i]['napr'])
            ans = getSubjLect(dir_id, subj)
            if(ans == False or len(ans) == 0):
                return 'не у всех направлений есть данный предмет'
            else: arr.append(ans[0])
            ans2 = getTeach(dir_id, subj)
            if(all(ans2)):
                tech_id.append(ans2[0])
            else: return 'нет преподавателя для одного из направлений! пожалуйста, перепроверьте данные о преподавателях!'

        if(len(arr) > 1):
            for i in range(1, len(arr)):
                if(arr[i][1] != arr[i-1][1]):
                    return 'не у всех направлений совпадают часы по лекциям'
        
        if(len(tech_id) > 1):
            for i in range(1, len(tech_id)):
                if(tech_id[i][0] != tech_id[i][0]):
                    return 'не у всех направлений один и тот же преподаватель, чтобы объединить занятия'


        for i in range(len(info_groups)):
            course_id = getCourseID(info_groups[i]['courseNumber'], work_id)
            dir_id = getDirection(course_id, info_groups[i]['napr'])
            hasLect = getHasLessonLect(dir_id, subj, work_id)
            if(len(hasLect) > 0):
                return 'для направлений уже существует занятие!'

        infoWorkID = getDataInfo(work_id)
        start, end, acc_hour = infoWorkID[0]
        delta = end - start
        weeks = delta.days//7

        grafic = getGrafic(work_id)
        datetime1 = datetime.strptime(grafic[0][1], '%H:%M')
        datetime2 = datetime.strptime(grafic[0][2], '%H:%M')
        difference = datetime2 - datetime1
        minutes = difference.total_seconds() / 60 # сколько минут за занятие

        
        one_less = minutes/acc_hour # количество академ часов за один урок
        count_lessons = int(int(arr[0][1])/one_less) # количество занятий по уч плану

        count_weeks = -1
        count_times = -1
        if(count_lessons < weeks):
            count_weeks = count_lessons 
        else:
            count_times = count_lessons/weeks

        count_seat = 0
        for i in range(len(info_groups)):
            course_id = getCourseID(info_groups[i]['courseNumber'], work_id)
            dir_id = getDirection(course_id, info_groups[i]['napr'])
            getclass = getClasses(dir_id)
            count_seat += getclass[0][0]
        

        
        places = getPlaces(work_id, typeLess, count_seat)
        if(places == False or places == []):
            return 'нет аудиторий для данного занятия! возможно стоит перестроить расписание!'
        if(len(places) > 0):
            global_places = []
            available_places = []

            all_ava_place = []
            schs = getSch(work_id)

            schs_napr = []

            for i in range(len(info_groups)):
                course_id = getCourseID(info_groups[i]['courseNumber'], work_id)
                dir_id = getDirection(course_id, info_groups[i]['napr'])
                ans = getSchDir(work_id, dir_id)
                if(ans != False):
                    schs_napr.append(ans)
                elif (ans == False):
                    return 'ошибка получения расписаний для направлений, попробуйте позже!'

            grafic_place = []
            # преобразование, в какие пары работают какие аудитории
            for i in range(len(places)):
                place_start = datetime.strptime(places[i][5], '%H:%M')
                place_end = datetime.strptime(places[i][6], '%H:%M')
                for j in range(len(grafic)):
                    grafic_start = datetime.strptime(grafic[j][1], '%H:%M')
                    grafic_end = datetime.strptime(grafic[j][2], '%H:%M')
                    if(place_start <= grafic_start and grafic_end <= place_end):
                        grafic_place.append([places[i][0], places[i][1], places[i][2], grafic[j]])

                if(count_weeks == -1 and count_times >= 1):
                    count_int = count_times/10
                    count_else = count_times - count_int

                     # выявление свободных аудиторий
                    if(schs != False and schs != []):
                        for i in range(len(grafic_place)):
                            filtering = 0
                            for j in range(len(schs)):
                                if(grafic_place[i][3][0] == schs[j][0] and grafic_place[i][0] == schs[j][1] and grafic_place[i][2] == schs[j][2]):
                                    filtering += 1
                            if(filtering == 0):
                                global_places.append(grafic_place[i])

                        for i in range(len(global_places)):
                            flag = True
                            for j in range(len(schs_napr)):
                                if(len(schs_napr[j]) != 0 and flag == True):
                                    if is_room_available(global_places[i], schs_napr[j]) == False or is_time_slot_available(global_places[i], schs_napr[j]) == False:
                                        flag = False
                            if(flag):
                                available_places.append(global_places[i])
                        all_ava_place['full'] = available_places
                    
                        global_places = []
                        available_places = [] 
                        if(count_else == 0.5):
                            sch_half = []
                            for i in range(len(schs)):
                                flag = True
                                for j in range(len(schs)):
                                    if(i != j):
                                        if(schs[j][0] == schs[i][0] and schs[j][1] == schs[i][1] and schs[j][2] == schs[i][2]):
                                            flag = False
                                if(flag):
                                    sch_half.append(schs[i])
                            for i in range(len(grafic_place)):
                                filtering = 0
                                for j in range(len(sch_half)):
                                    if(grafic_place[i][3][0] == sch_half[j][0] and grafic_place[i][0] == sch_half[j][1] and grafic_place[i][2] == sch_half[j][2]):
                                        filtering += 1
                                if(filtering == 0):
                                    global_places.append(grafic_place[i])
                            for i in range(len(global_places)):
                                flag = True
                                for j in range(len(schs_napr)):
                                    if(len(schs_napr[j]) != 0 and flag == True):
                                        if is_room_available(global_places[i], schs_napr[j]) == False or is_time_slot_available(global_places[i], schs_napr[j]) == False:
                                            flag = False
                                if(flag):
                                    available_places.append(global_places[i])
                            all_ava_place['half'] = available_places
                        return all_ava_place

                    elif(schs == []):
                        global_places = global_places
                        return global_places
                    else:
                        return 'ошибка получения расписания, попробуйте позже!'


                if(count_weeks != -1 and count_times == -1):
                    if(count_weeks//weeks == 0.5):
                        if(schs != False and schs != []):
                            sch_half = []
                            for i in range(len(schs)):
                                flag = True
                                for j in range(len(schs)):
                                    if(i != j):
                                        if(schs[j][0] == schs[i][0] and schs[j][1] == schs[i][1] and schs[j][2] == schs[i][2]):
                                            flag = False
                                if(flag):
                                    sch_half.append(schs[i])

                            for i in range(len(grafic_place)):
                                filtering = 0
                                for j in range(len(sch_half)):
                                    if(grafic_place[i][3][0] == sch_half[j][0] and grafic_place[i][0] == sch_half[j][1] and grafic_place[i][2] == sch_half[j][2]):
                                        filtering += 1
                                if(filtering == 0):
                                    global_places.append(grafic_place[i])

                            for i in range(len(global_places)):
                                flag = True
                                for j in range(len(schs_napr)):
                                    if(len(schs_napr[j]) != 0 and flag == True):
                                        if is_room_available(global_places[i], schs_napr[j]) == False or is_time_slot_available(global_places[i], schs_napr[j]) == False:
                                            flag = False
                                if(flag):
                                    available_places.append(global_places[i])
                            all_ava_place['half'] = available_places
                            return all_ava_place
                    elif(schs == []):
                        global_places = global_places
                        return global_places
                    else:
                        return 'ошибка получения расписания, попробуйте позже!'

            

            



        # sch = getSchedule()

        # return places
        
        # return [weeks, acc_hour, count_lessons, one_less, count_weeks, count_times]
        



    # return 'ok'

    # grafic = getGrafic(work_id)

    # type_ID = getType(type_less)
    # places = getPlaces(work_id, type_ID)
    