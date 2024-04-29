from db_requests import *
import datetime
from datetime import datetime,  timedelta
from datetime import date
import pandas as pd
import math


# Лекция
# Для каждого направления вычислить если этот предмет у всех 
# проверить ведет ли у них общий преподаватель
# проверить что у всех одинаковые
# проверить есть ли уже в расписании данное занятие

# Посчитать занятия
# вычислить сколько минут уходит на одно занятие
# вычислить сколько академ часов уходит на одно занятие
# вычислить сколько недель в данном периоде
# вычисление количества занятий в неделю, если количество занятий больше, чем общее количество недель
# если занятий меньше, вычислить сколько занятий неоюходимо тогда провести в данном периоде


# выявить аудитории по типу, которые нам подходят 

# выявить свободные аудитории, в зависимости от расписания
# проверять ограничения по максимум пар в этот день для каждого направления
# проверять что для всех направлений данное аудитория в это время подходит, и нет пар
def merge(intervals):
    intervals = sorted(intervals, key=lambda x: x [0])
    ans = []
    for interval in intervals:
        if not ans or ans[-1][1] < interval[0]:
            ans.append(interval)
        else:
            ans[-1][1] = max(ans[-1][1], interval[1])
    
    return ans

def is_room_available(room, schedule):
    # ['257', '1211', 'суббота', array(['203', '12:10', '13:40'], dtype='<U21')] room 
    # ['201' '63' 'вторник' 'каждую неделю'] sch

    time, week = room[3][0], room[2]
    for item in schedule:
        if item[0] == time and item[2] == week:
            return False
    return True

def is_time_slot_available(room, schedule):
    # ['257', '1211', 'суббота', array(['203', '12:10', '13:40'], dtype='<U21')] room 
    # [201, 'понедельник'] sch
    week = room[2]
    count = 0
    
    for item in schedule:
        if item[2] == week:
            count += 1
    return count < 5

def is_room_half_available(room, schedule):
    # ['257', '1211', 'суббота', array(['203', '12:10', '13:40'], dtype='<U21'), 'нечет'] room 
    # ['201' '63' 'вторник' 'каждую неделю'] sch
    time, week, period = room[3][0][0], room[2], room[3][1]
    for item in schedule:
        if item[0] == time and item[2] == week and item[3] == 'каждую неделю':
            return False
        if item[0] == time and item[2] == week and item[3] == period:
            return False
    return True

def is_time_room_half_slot_available(room, schedule):
    # ['257', '1211', 'суббота', array(['203', '12:10', '13:40'], dtype='<U21', 'нечет'] room 
    # ['201' '63' 'вторник' 'каждую неделю'] sch
    week, period = room[2], room[3][1]
    count = 0
    for item in schedule:
        if(period == 'чет'):
            if item[1] == week and item[3] == 'нечет':
                count += 0
            elif item[1] == week and item[3] != period:
                count += 1
        elif(period == 'нечет'):
            if item[1] == week and item[3] == 'чет':
                count += 0
            elif item[1] == week and item[3] != period:
                count += 1
    return count < 5

def checkInt(arr, k):
    for i in range(len(arr)):
        if(arr[i][0] <= k and k <= arr[i][1]):
            return False
    return True


def fullLessonLectWithSchs(grafic_place, schs, schs_napr):
    global_places = []
    available_places = []
    for i in range(len(grafic_place)):
        filtering = 0
        for j in range(len(schs)):
            if(grafic_place[i][3][0] == schs[j][0] and grafic_place[i][0] == schs[j][1] and grafic_place[i][2] == schs[j][2]):
                filtering += 1
        if(filtering == 0):
            global_places.append(grafic_place[i])
                    
    # print(schs_napr, 'napr')
    for i in range(len(global_places)):
        flag = True
        for j in range(len(schs_napr)):
            if(len(schs_napr[j]) != 0 and flag == True):
                if is_room_available(global_places[i], schs_napr[j]) == False or is_time_slot_available(global_places[i], schs_napr[j]) == False:
                    flag = False
        if(flag):
            available_places.append(global_places[i])
    return available_places

def halflessonLectWithSchs(schs, grafic_place, schs_napr):
    sch_half = []
    global_places = []
    available_places = []

    for i in range(len(schs)):
        flag = False
        if(schs[i][3] == 'каждую неделю'): 
            sch_half.append(schs[i])
        elif(schs[i][3] == 'чет' or schs[i][3] == 'нечет'):
            for j in range(len(schs)):
                if(i != j):
                    if(schs[j][0] == schs[i][0] and schs[j][1] == schs[i][1] and schs[j][2] == schs[i][2]):
                        flag = True
            if(flag):
                schs[i] = [schs[i][0],schs[i][1], schs[i][2], 'каждую неделю']
                sch_half.append(schs[i])
            else:
                sch_half.append(schs[i])
        else:
            schs[i] = [schs[i][0],schs[i][1], schs[i][2], 'каждую неделю']
            sch_half.append(schs[i])

    for i in range(len(grafic_place)):
        filtering = 0
        for j in range(len(sch_half)):
            if(grafic_place[i][3][0] == sch_half[j][0] and grafic_place[i][0] == sch_half[j][1] and grafic_place[i][2] == sch_half[j][2] and sch_half[j][3] == 'каждую неделю'):
                filtering += 1
            elif(grafic_place[i][3][0] == sch_half[j][0] and grafic_place[i][0] == sch_half[j][1] and grafic_place[i][2] == sch_half[j][2] and sch_half[j][3] == 'чет'):
                global_places.append([grafic_place[i][0], grafic_place[i][1], grafic_place[i][2], [grafic_place[i][3], 'нечет']])
                filtering += 1
            elif(grafic_place[i][3][0] == sch_half[j][0] and grafic_place[i][0] == sch_half[j][1] and grafic_place[i][2] == sch_half[j][2] and sch_half[j][3] == 'нечет'):
                global_places.append([grafic_place[i][0], grafic_place[i][1], grafic_place[i][2], [grafic_place[i][3], 'чет']])
                filtering += 1
        if(filtering == 0):
            global_places.append([grafic_place[i][0], grafic_place[i][1], grafic_place[i][2], [grafic_place[i][3], 'нечет']])
            global_places.append([grafic_place[i][0], grafic_place[i][1], grafic_place[i][2], [grafic_place[i][3], 'чет']])
    
    for i in range(len(global_places)):
        flag = True
        for j in range(len(schs_napr)):
            if(len(schs_napr[j]) != 0 and flag == True):
                if is_time_room_half_slot_available(global_places[i], schs_napr[j]) == False:
                    flag = False
        if(flag):
            available_places.append(global_places[i])
    return available_places

def weeksLessonLectWithSchs(schs, grafic_place, weeks, count_weeks):
    sch_busy = []
    global_places = []

    for i in range(len(schs)):
        flag = False
        if(schs[i][3] == 'каждую неделю'): 
            sch_busy.append(schs[i])
        elif(schs[i][3] == 'чет' or schs[i][3] == 'нечет'):
            for j in range(len(schs)):
                if(i != j):
                    if(schs[j][0] == schs[i][0] and schs[j][1] == schs[i][1] and schs[j][2] == schs[i][2]):
                        flag = True
            if(flag):
                schs[i] = [schs[i][0],schs[i][1], schs[i][2], 'каждую неделю']
                sch_busy.append(schs[i])
            else:
                sch_busy.append(schs[i])
        else:
            flag = True
            for j in range(len(sch_busy)):
                if(sch_busy[j][0] == schs[i][0] and sch_busy[j][1] == schs[i][1] and sch_busy[j][2] == schs[i][2]):
                    flag = False
            if(flag):
                weeks_true = schs[i][3].split(' ')[1]
                if(weeks_true == 'неделя'):
                    weeks_busy = [[int(schs[i][3].split(' ')[0].split('-')[0]), int(schs[i][3].split(' ')[0].split('-')[1])]]   
                    for j in range(len(schs)):
                        if(i != j):
                            if(schs[j][0] == schs[i][0] and schs[j][1] == schs[i][1] and schs[j][2] == schs[i][2]):
                                weeks_true = schs[j][3].split(' ')[1]
                                if(weeks_true == 'неделя'):
                                    weeks_busy.append([int(schs[j][3].split(' ')[0].split('-')[0]), int(schs[j][3].split(' ')[0].split('-')[1])])
                    weeks_b = merge(weeks_busy)
                    sch_busy.append([schs[i][0],schs[i][1], schs[i][2], weeks_b])
    
    for i in range(len(grafic_place)):
        filtering = 0
        for j in range(len(sch_busy)):
            if(grafic_place[i][3][0] == sch_busy[j][0] and grafic_place[i][0] == sch_busy[j][1] and grafic_place[i][2] == sch_busy[j][2] and sch_busy[j][3] == 'каждую неделю'):
                filtering += 1
            elif(grafic_place[i][3][0] == sch_busy[j][0] and grafic_place[i][0] == sch_busy[j][1] and grafic_place[i][2] == sch_busy[j][2] and sch_busy[j][3] == 'чет'):
                filtering += 1
            elif(grafic_place[i][3][0] == sch_busy[j][0] and grafic_place[i][0] == sch_busy[j][1] and grafic_place[i][2] == sch_busy[j][2] and sch_busy[j][3] == 'нечет'):
                filtering += 1
            elif(grafic_place[i][3][0] == sch_busy[j][0] and grafic_place[i][0] == sch_busy[j][1] and grafic_place[i][2] == sch_busy[j][2] and sch_busy[j][3][0]):
                filtering += 1
                for k in range(1, weeks - count_weeks + 1):
                    if(checkInt(sch_busy[j][3], k) and checkInt(sch_busy[j][3], k + count_weeks)):
                        global_places.append([grafic_place[i][0], grafic_place[i][1], grafic_place[i][2], [grafic_place[i][3], [k, k + count_weeks]]])
                
        if(filtering == 0):
            for j in range(1, weeks - count_weeks + 1):
                global_places.append([grafic_place[i][0], grafic_place[i][1], grafic_place[i][2], [grafic_place[i][3], [j, j + count_weeks]]])
    return global_places


def algo(work_id, info, type_inst):
    type_less = info['type']
    info_groups = info['groups']
    subj = info['sub']
    typeLess = 1
    typePractic = 2
    typeLab = 3

    if(type_inst == 'uni' and type_less == 'lect'):
        arr = []
        tech_id = []

        for i in range(len(info_groups)):
            course_id = getCourseID(info_groups[i]['courseNumber'], work_id)
            dir_id = getDirection(course_id, info_groups[i]['napr'])
            if(dir_id == False): return {'otv': 'error', 'mes': 'нет информации про все направления, перепроверьте всю информацию о направлениях!'}
            else:
                ans = getSubjLect(dir_id, subj)
                if(ans == False or len(ans) == 0):
                    return {'otv': 'error', 'mes':'не у всех направлений есть данный предмет'}
                else:
                    arr.append(ans[0])
                        
                ans2 = getTeach(dir_id, subj)
                print(ans2)
                if(len(ans2) > 0):
                    tech_id.append(ans2[0])
                else: return {'otv': 'error', 'mes':'нет преподавателя для одного из направлений! пожалуйста, перепроверьте данные о преподавателях!'}

        if(len(arr) > 1):
            for i in range(1, len(arr)):
                if(arr[i][1] != arr[i-1][1]):
                    return {'otv': 'error', 'mes':'не у всех направлений совпадают часы по лекциям'}
        
        if(len(tech_id) > 1):
            for i in range(1, len(tech_id)):
                if(tech_id[i][0] != tech_id[i][0]):
                    return {'otv': 'error', 'mes':'не у всех направлений один и тот же преподаватель, чтобы объединить занятия'}


        for i in range(len(info_groups)):
            course_id = getCourseID(info_groups[i]['courseNumber'], work_id)
            dir_id = getDirection(course_id, info_groups[i]['napr'])
            hasLect = getHasLesson(dir_id, subj, work_id)
            if(len(hasLect) > 0):
                return {'otv': 'error', 'mes':'для направлений уже существует занятие!'}

        teach = getTeacher(tech_id[0][0])
        teach = teach[0]

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
        if(int(arr[0][1]) == 0): return {'otv': 'error', 'mes':'невозможно поставить занятие, количество часов равно нулю'}
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
            return {'otv': 'error', 'mes':'нет аудиторий для данного занятия! возможно стоит перестроить расписание!'}
        elif(len(places) > 0):
            all_ava_place = {}
            schs = getSch(work_id)

            if(schs != False):
                schs_napr = []

                for i in range(len(info_groups)):
                    course_id = getCourseID(info_groups[i]['courseNumber'], work_id)
                    dir_id = getDirection(course_id, info_groups[i]['napr'])
                    ans = getSchDir(work_id, dir_id)
                    
                    if(ans != False):
                        schs_napr.append(ans)
                    elif (ans == False):
                        return {'otv': 'error', 'mes':'ошибка получения расписаний для направлений, попробуйте позже!'}
                

                grafic_place = []
                # преобразование, в какие пары работают какие аудитории
                for i in range(len(places)):
                    place_start = datetime.strptime(places[i][5], '%H:%M')
                    place_end = datetime.strptime(places[i][6], '%H:%M')
                    for j in range(len(grafic)):
                        grafic_start = datetime.strptime(grafic[j][1], '%H:%M')
                        grafic_end = datetime.strptime(grafic[j][2], '%H:%M')
                        if(place_start <= grafic_start and grafic_end <= place_end):
                            grafic_place.append([places[i][0], places[i][1], places[i][2], [grafic[j][0], grafic[j][1], grafic[j][2]]])
                    

                if(count_weeks == -1 and count_times >= 1):

                    count_int = int(count_times)
                    count_else = count_times - count_int

                    all_ava_place['full'] = fullLessonLectWithSchs(grafic_place, schs, schs_napr)
                
                    if(count_else == 0.5 and count_else != 0):
                        all_ava_place['half'] = halflessonLectWithSchs(schs, grafic_place, schs_napr)
                    if(count_else != 0.5 and count_else != 0):
                        count_les = math.ceil(count_else * weeks)
                        all_ava_place['weeks'] = weeksLessonLectWithSchs(schs, grafic_place, weeks, count_les)
                    return {'otv':'OK','data': {'count': {'full': count_int, 'ost': count_else, 'weeks': weeks}, 'info':all_ava_place, 'teach': teach}}

                if(count_weeks != -1 and count_times == -1):
                    if(count_weeks/weeks == 0.5):
                        all_ava_place['half'] = halflessonLectWithSchs(schs, grafic_place, schs_napr)
                    else:
                        all_ava_place['weeks'] = weeksLessonLectWithSchs(schs, grafic_place, weeks, count_weeks)
                    return {'otv':'OK','data':{'count': {'countLess':count_weeks, 'weeks': weeks}, 'info': all_ava_place, 'teach': teach}}
                else: 
                    return {'otv': 'error', 'mes':'ошибка подсчета периодичности занятий, попробуйте еще раз позже!'}
            else:
                return {'otv': 'error', 'mes':'ошибка получения расписания для фильтрации свободных аудиторий'}
        else:
            return {'otv': 'error', 'mes':'ошибка получения расписания аудиторий'}
    if(type_inst == 'uni' and type_less == 'practic'):
        # 'type': 'practic', 'groups': {'courseNumber': 1, 'napr': 'ФИИТ', 'groups': ['09-331', '09-332']}, 'sub': 'Информационные технологии'

        arr = []
        arr_class = []
        teach_arr = []
        course_id = getCourseID(info_groups['courseNumber'], work_id)
        dir_id = getDirection(course_id, info_groups['napr'])
        ans = getSubjPractic(dir_id, subj)
        
        if(ans == False or len(ans[0]) == 0):
            return {'otv': 'error', 'mes':'у данного направления нет практических занятий по данному предмету'}
        else: 
            arr.append(ans[0])

            for i in range(len(info_groups['groups'])):
                ans = getClass(dir_id, info_groups['groups'][i])
                if(ans != False):
                    arr_class.append(ans)
                else:
                    return {'otv': 'error', 'mes':'данные о группах неполные, перепроверьте информацию!'}

            for i in range(len(arr_class)):
                ans = getTeachsAndPractic(arr_class[i], subj)
                if(all(ans) and len(ans) > 0):
                    teach_arr.append(ans)
                else:
                    return {'otv': 'error', 'mes':'не у всех групп есть преподаватели по практике, перепроверьте информацию!'}
            
        
            if(len(teach_arr) > 1):
                for i in range(1, len(teach_arr)):
                    if(teach_arr[i][0] != teach_arr[i-1][0]):
                        return {'otv': 'error', 'mes':'не у всех групп один и тот же преподаватель, чтобы объединить занятия'}

        teach = getTeacher(teach_arr[0][0])
        teach = teach[0]


        course_id = getCourseID(info_groups['courseNumber'], work_id)
        dir_id = getDirection(course_id, info_groups['napr'])
        hasLect = []
        for i in range(len(arr_class)):
            ans = getHasLessonGroup(arr_class[i], subj, work_id)
            if(len(ans) > 0):
                hasLect.append(ans)
        if(len(hasLect) > 0):
            return {'otv': 'error', 'mes':'для групп/группы уже существует занятие!'}

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
        if(int(arr[0][1]) == 0): return {'otv': 'error', 'mes':'невозможно поставить занятие, количество часов равно нулю'}
        count_lessons = int(int(arr[0][1])/one_less) # количество занятий по уч плану

        count_weeks = -1
        count_times = -1
        if(count_lessons < weeks):
            count_weeks = count_lessons 
        else:
            count_times = count_lessons/weeks

        count_seat = 0
        for i in range(len(info_groups['groups'])):
            count_seat += getClasseCount(dir_id, info_groups['groups'][i])
    
        
        places = getPlaces(work_id, typePractic, count_seat)
        if(places == False or places == []):
            return {'otv': 'error', 'mes':'нет аудиторий для данного занятия! возможно стоит перестроить расписание!'}
        elif(len(places) > 0):
            all_ava_place = {}
            schs = getSch(work_id)

            if(schs != False):
                schs_napr = []

                course_id = getCourseID(info_groups['courseNumber'], work_id)
                dir_id = getDirection(course_id, info_groups['napr'])
                ans = getSchDir(work_id, dir_id)
                if(ans != False):
                    schs_napr.append(ans)
                elif (ans == False):
                    return {'otv': 'error', 'mes':'ошибка получения расписаний для направлений, попробуйте позже!'}

                grafic_place = []
                # преобразование, в какие пары работают какие аудитории
                for i in range(len(places)):
                    place_start = datetime.strptime(places[i][5], '%H:%M')
                    place_end = datetime.strptime(places[i][6], '%H:%M')
                    for j in range(len(grafic)):
                        grafic_start = datetime.strptime(grafic[j][1], '%H:%M')
                        grafic_end = datetime.strptime(grafic[j][2], '%H:%M')
                        if(place_start <= grafic_start and grafic_end <= place_end):
                            grafic_place.append([places[i][0], places[i][1], places[i][2], [grafic[j][0], grafic[j][1], grafic[j][2]]])

                if(count_weeks == -1 and count_times >= 1):

                    count_int = int(count_times)
                    count_else = count_times - count_int


                    all_ava_place['full'] = fullLessonLectWithSchs(grafic_place, schs, schs_napr)
                
                    if(count_else == 0.5 and count_else != 0):
                        all_ava_place['half'] = halflessonLectWithSchs(schs, grafic_place, schs_napr)
                    if(count_else != 0.5 and count_else != 0):
                        count_les = math.ceil(count_else * weeks)
                        all_ava_place['weeks'] = weeksLessonLectWithSchs(schs, grafic_place, weeks, count_les)
                    return {'otv':'OK','data': {'count': {'full': count_int, 'ost': count_else, 'weeks': weeks}, 'info':all_ava_place, 'teach': teach}}

                if(count_weeks != -1 and count_times == -1):
                    if(count_weeks/weeks == 0.5):
                        all_ava_place['half'] = halflessonLectWithSchs(schs, grafic_place, schs_napr)
                    else:
                        all_ava_place['weeks'] = weeksLessonLectWithSchs(schs, grafic_place, weeks, count_weeks)
                    return {'otv':'OK','data':{'count': {'countLess':count_weeks, 'weeks': weeks}, 'info':all_ava_place, 'teach': teach}}
                else: 
                    return {'otv': 'error', 'mes':'ошибка подсчета периодичности занятий, попробуйте еще раз позже!'}
                
            else:
                return {'otv': 'error', 'mes':'ошибка получения расписания для фильтрации свободных аудиторий'}
        else:
            return {'otv': 'error', 'mes':'ошибка получения расписания аудиторий'}

    if(type_inst == 'uni' and type_less == 'lab'):
        # 'type': 'practic', 'groups': {'courseNumber': 1, 'napr': 'ФИИТ', 'groups': ['09-331', '09-332']}, 'sub': 'Информационные технологии'

        arr = []
        arr_class = []
        teach_arr = []
        course_id = getCourseID(info_groups['courseNumber'], work_id)
        dir_id = getDirection(course_id, info_groups['napr'])
        ans = getSubjLab(dir_id, subj)
        
        if(ans == False or len(ans[0]) == 0):
            return {'otv': 'error', 'mes':'у данного направления нет практических занятий по данному предмету'}
        else: 
            arr.append(ans[0])
            
            for i in range(len(info_groups['groups'])):
                ans = getClass(dir_id, info_groups['groups'][i])
                
                if(ans != False):
                    arr_class.append(ans)
                else:
                    return {'otv': 'error', 'mes':'данные о группах неполные, перепроверьте информацию!'}

            for i in range(len(arr_class)):
                ans = getTeachsAndPractic(arr_class[i], subj)
                if(all(ans) and len(ans) > 0):
                    teach_arr.append(ans)
                else:
                    return {'otv': 'error', 'mes':'не у всех групп есть преподаватели по практике, перепроверьте информацию!'}
            
        
            if(len(teach_arr) > 1):
                for i in range(1, len(teach_arr)):
                    if(teach_arr[i][0] != teach_arr[i-1][0]):
                        return {'otv': 'error', 'mes':'не у всех групп один и тот же преподаватель, чтобы объединить занятия'}

        teach = getTeacher(teach_arr[0][0])
        teach = teach[0]


        course_id = getCourseID(info_groups['courseNumber'], work_id)
        dir_id = getDirection(course_id, info_groups['napr'])
        hasLect = []
        for i in range(len(arr_class)):
            ans = getHasLessonGroup(arr_class[i], subj, work_id)
            if(len(ans) > 0):
                hasLect.append(ans)
        if(len(hasLect) > 0):
            return {'otv': 'error', 'mes':'для групп/группы уже существует занятие!'}

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
        if(int(arr[0][1]) == 0): return {'otv': 'error', 'mes':'невозможно поставить занятие, количество часов равно нулю'}
        count_lessons = int(int(arr[0][1])/one_less) # количество занятий по уч плану

        count_weeks = -1
        count_times = -1
        if(count_lessons < weeks):
            count_weeks = count_lessons 
        else:
            count_times = count_lessons/weeks

        count_seat = 0
        for i in range(len(info_groups['groups'])):
            count_seat += getClasseCount(dir_id, info_groups['groups'][i])
    
        
        places = getPlaces(work_id, typeLab, count_seat)
        if(places == False or places == []):
            return {'otv': 'error', 'mes':'нет аудиторий для данного занятия! возможно стоит перестроить расписание!'}
        elif(len(places) > 0):
            all_ava_place = {}
            schs = getSch(work_id)

            if(schs != False):
                schs_napr = []

                course_id = getCourseID(info_groups['courseNumber'], work_id)
                dir_id = getDirection(course_id, info_groups['napr'])
                ans = getSchDir(work_id, dir_id)
                if(ans != False):
                    schs_napr.append(ans)
                elif (ans == False):
                    return {'otv': 'error', 'mes':'ошибка получения расписаний для направлений, попробуйте позже!'}

                grafic_place = []
                # преобразование, в какие пары работают какие аудитории
                for i in range(len(places)):
                    place_start = datetime.strptime(places[i][5], '%H:%M')
                    place_end = datetime.strptime(places[i][6], '%H:%M')
                    for j in range(len(grafic)):
                        grafic_start = datetime.strptime(grafic[j][1], '%H:%M')
                        grafic_end = datetime.strptime(grafic[j][2], '%H:%M')
                        if(place_start <= grafic_start and grafic_end <= place_end):
                            grafic_place.append([places[i][0], places[i][1], places[i][2], [grafic[j][0], grafic[j][1], grafic[j][2]]])

                if(count_weeks == -1 and count_times >= 1):

                    count_int = int(count_times)
                    count_else = count_times - count_int

                    all_ava_place['full'] = fullLessonLectWithSchs(grafic_place, schs, schs_napr)
                
                    if(count_else == 0.5 and count_else != 0):
                        all_ava_place['half'] = halflessonLectWithSchs(schs, grafic_place, schs_napr)
                    if(count_else != 0.5 and count_else != 0):
                        count_les = math.ceil(count_else * weeks)
                        all_ava_place['weeks'] = weeksLessonLectWithSchs(schs, grafic_place, weeks, count_les)
                    return {'otv':'OK','data': {'count': {'full': count_int, 'ost': count_else, 'weeks': weeks}, 'info':all_ava_place, 'teach': teach}}

                if(count_weeks != -1 and count_times == -1):
                    if(count_weeks/weeks == 0.5):
                        all_ava_place['half'] = halflessonLectWithSchs(schs, grafic_place, schs_napr)
                    else:
                        all_ava_place['weeks'] = weeksLessonLectWithSchs(schs, grafic_place, weeks, count_weeks)
                    return {'otv':'OK','data':{'count': {'countLess':count_weeks, 'weeks': weeks}, 'info':all_ava_place, 'teach': teach}}
                else: 
                    return {'otv': 'error', 'mes':'ошибка подсчета периодичности занятий, попробуйте еще раз позже!'}
                
            else:
                return {'otv': 'error', 'mes':'ошибка получения расписания для фильтрации свободных аудиторий'}
        else:
            return {'otv': 'error', 'mes':'ошибка получения расписания аудиторий'}

    if(type_inst == 'uni' and type_less == 'exam'):
        # {'type': 'exam', 'groups': {'courseNumber': 1, 'napr': 'ФИИТ', 'groups': '09-331'}, 'sub': 'Дискретная математика'}
        course_id = getCourseID(info_groups['courseNumber'], work_id)
        dir_id = getDirection(course_id, info_groups['napr'])
        class_id = getClass(dir_id, info_groups['groups'])

        teach_id = getTeach(dir_id, subj)
        teacherFio = getTeacher(teach_id[0][0])


        weeks_day = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

        examFlag = getExamSub(dir_id, subj)
        if(len(examFlag) > 0 and examFlag[0] == '+'):
            schs = getSchDate(work_id)

            if(len(schs) >= 0):
                for i in range(len(schs)):
                    # or (schs[i][3].split(' ')[1] and schs[i][3].split(' ')[1]== 'неделя')
                    if(schs[i][3] != 'экзамен'):
                        return {'otv': 'error', 'mes':'для составления расписания экзаменов, необходимо, чтобы не было никаких занятий в этот период'}

                schs_class = getSchClass(work_id, class_id)
                
                if(len(schs_class) >= 0):                
                    infoWorkID = getDataInfo(work_id)
                    start, end, acc_hour = infoWorkID[0]

                    date_range = [start + timedelta(days=x) for x in range((end - start).days + 1)]
                    
                    busy_date = []
                    for i in range(len(schs_class)):
                        if(schs_class[i][4] not in busy_date):
                            busy_date.append(schs_class[i][4])
                    for i in range(len(busy_date)):
                        busy_date[i] = date.fromisoformat(busy_date[i])

                    free_date = []

                    for i in range(len(date_range)):
                        flag = True
                        if(date_range[i].weekday() == 6): flag = False
                        if(flag):
                            for j in range(len(busy_date)):
                                if(abs(date_range[i] - busy_date[j]).days <= 2):
                                    flag = False
                        if(flag):
                            free_date.append(date_range[i])

                    count_seat = 0
                    for i in range(len(info_groups['groups'])):
                        count_seat += getClasseCount(dir_id, info_groups['groups'][i])

                    places = getPlacesExam(work_id, count_seat)

                    if(places == False or places == []):
                        return {'otv': 'error', 'mes':'нет аудиторий для данного занятия! возможно стоит перестроить расписание!'}
                    elif(len(places) > 0):
                        grafic_place = []
                        grafic = getGrafic(work_id)
                        # преобразование, в какие пары работают какие аудитории
                        for i in range(len(places)):
                            
                            place_start = datetime.strptime(places[i][5], '%H:%M')
                            place_end = datetime.strptime(places[i][6], '%H:%M')
                            for j in range(len(grafic)):
                                grafic_start = datetime.strptime(grafic[j][1], '%H:%M')
                                grafic_end = datetime.strptime(grafic[j][2], '%H:%M')
                                if(place_start <= grafic_start and grafic_end <= place_end):
                                    grafic_place.append([places[i][0], places[i][1], places[i][2], [grafic[j][0], grafic[j][1], grafic[j][2]]])

                        mb_date_time = []

                        for i in range(len(free_date)):
                            for j in range(len(grafic_place)):
                                if(free_date[i].weekday() == weeks_day.index(grafic_place[j][2])):
                                    mb_date_time.append([free_date[i], grafic_place[j][0], grafic_place[j][1], grafic_place[j][2], grafic_place[j][3]])
    
                        mb_date_free = []
                        for i in range(len(mb_date_time)):
                            flag = True
                            for j in range(len(schs)):
                                if(mb_date_time[i][0] == date.fromisoformat(schs[j][4]) and mb_date_time[i][3] == schs[j][2] and mb_date_time[i][1] == schs[j][1] and mb_date_time[i][4][0] == schs[j][0]):
                                    flag = False
                            if(flag):
                                mb_date_free.append(mb_date_time[i])

                        return {'otv':'OK','data':mb_date_free, 'teach': teacherFio[0]}
                    else:
                        return {'otv': 'error', 'mes':'ошибка получения расписания аудиторий'}

                else: return {'otv': 'error', 'mes':'ошибка получения расписания для группы, попробуйте позже'}

            else:
                return {'otv': 'error', 'mes':'ошибка получения расписания для фильтрации свободных аудиторий'}


        else: 
            return {'otv': 'error', 'mes':'для данного предмета по плану не предусмотрена сдача экзамена'}

    if(type_inst == 'uni' and type_less == 'min_exam'):
        # {'type': 'exam', 'groups': {'courseNumber': 1, 'napr': 'ФИИТ', 'groups': '09-331'}, 'sub': 'Дискретная математика'}
        course_id = getCourseID(info_groups['courseNumber'], work_id)
        dir_id = getDirection(course_id, info_groups['napr'])
        class_id = getClass(dir_id, info_groups['groups'])

        teach_id = getTeachClass(class_id, subj)
        teacherFio = getTeacher(teach_id[0][0])

        weeks_day = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

        examFlag = getMinExamSub(dir_id, subj)
        if(len(examFlag) > 0 and examFlag[0] == '+'):
            schs = getSchDate(work_id)
            if(len(schs) >= 0):
                for i in range(len(schs)):
                    if(schs[i][3] != 'зачет'):
                        return {'otv': 'error', 'mes':'для составления расписания зачетов, необходимо, чтобы не было никаких занятий в этот период'}

                schs_class = getSchClass(work_id, class_id)
                if(len(schs_class) >= 0):                
                    infoWorkID = getDataInfo(work_id)
                    start, end, acc_hour = infoWorkID[0]

                    date_range = [start + timedelta(days=x) for x in range((end - start).days + 1)]

                    busy_date = []
                    half_min_exam = {}
                    for i in range(len(schs_class)):
                        if(schs_class[i][4] not in half_min_exam):
                            half_min_exam[schs_class[i][4]] = 1
                        else:
                            half_min_exam[schs_class[i][4]] += 1

                    for k, v in half_min_exam.items():
                        if(v > 1):
                            busy_date.append(k)
                    for i in range(len(busy_date)):
                        busy_date[i] = date.fromisoformat(busy_date[i])

                    free_date = []

                    for i in range(len(date_range)):
                        flag = True
                        if(date_range[i].weekday() == 6): flag = False
                        if(flag):
                            for j in range(len(busy_date)):
                                if(abs(date_range[i] - busy_date[j]).days < 2):
                                    flag = False
                        if(flag):
                            free_date.append(date_range[i])


                    count_seat = 0
                    for i in range(len(info_groups['groups'])):
                        count_seat += getClasseCount(dir_id, info_groups['groups'][i])


                    places = getPlacesExam(work_id, count_seat)
                    
                    if(places == False or places == []):
                        return {'otv': 'error', 'mes':'нет аудиторий для данного занятия! возможно стоит перестроить расписание!'}
                    elif(len(places) > 0):
                        grafic_place = []
                        grafic = getGrafic(work_id)
                        # преобразование, в какие пары работают какие аудитории
                        for i in range(len(places)):
                            
                            place_start = datetime.strptime(places[i][5], '%H:%M')
                            place_end = datetime.strptime(places[i][6], '%H:%M')
                            for j in range(len(grafic)):
                                grafic_start = datetime.strptime(grafic[j][1], '%H:%M')
                                grafic_end = datetime.strptime(grafic[j][2], '%H:%M')
                                if(place_start <= grafic_start and grafic_end <= place_end):
                                    grafic_place.append([places[i][0], places[i][1], places[i][2], [grafic[j][0], grafic[j][1], grafic[j][2]]])

                        mb_date_time = []

                        for i in range(len(free_date)):
                            for j in range(len(grafic_place)):
                                if(free_date[i].weekday() == weeks_day.index(grafic_place[j][2])):
                                    mb_date_time.append([free_date[i], grafic_place[j][0], grafic_place[j][1], grafic_place[j][2], grafic_place[j][3]])
    
                        mb_date_free = []
                        for i in range(len(mb_date_time)):
                            flag = True
                            for j in range(len(schs)):
                                if(mb_date_time[i][0] == date.fromisoformat(schs[j][4]) and mb_date_time[i][3] == schs[j][2] and mb_date_time[i][1] == schs[j][1] and mb_date_time[i][4][0] == schs[j][0]):
                                    flag = False
                            if(flag):
                                mb_date_free.append(mb_date_time[i])

                        return {'otv':'OK','data':mb_date_free, 'teach': teacherFio[0]}
                    else:
                        return {'otv': 'error', 'mes':'ошибка получения расписания аудиторий'}

                else: return {'otv': 'error', 'mes':'ошибка получения расписания для группы, попробуйте позже'}

            else:
                return {'otv': 'error', 'mes':'ошибка получения расписания для фильтрации свободных аудиторий'}


        else: 
            return {'otv': 'error', 'mes':'для данного предмета по плану не предусмотрена сдача зачета'}




    else:
        return {'otv': 'error', 'mes':'ошибка введенных данных! попробуйте позже'}
    

def algoSchool(work_id, info):    
    subj = info['subj']
    course = str(info['courseNum'])
    initial_class = info['initial_class']
    weeks_name = ['понедельник','вторник','среда','четверг','пятнциа','суббота']

    dir = getDataCourseDirs(work_id)
    dir_id = ''
    for i in range(len(dir)):
        if(dir[i][2] == course):
            dir_id = dir[i][1]
    if(dir_id == ''):
        return {'otv': 'error', 'mes':'ошибка получения направления, перепроверьте даннные о параллелях'}
    class_ID = getClass(dir_id, initial_class)
    if class_ID == False:
        return {'otv': 'error', 'mes':'ошибка получения класса, перепроверьте данные о классх'}
    
    subj_info = getSubjectSchool(class_ID, subj)
    if(len(subj_info) == 0):
        return {'otv': 'error', 'mes':'для данного класса нет в учебном плане введенного вами предмета'}
    count = subj_info[0][1]

    # sch_has = getHasLessonGroup(class_ID, subj, work_id)
    # if(len(sch_has) > 0):
    #     return 'для данного класса уже сущевтует занятие!'

    teacher_id = getTeacherSchool(class_ID, subj)
    print(teacher_id, class_ID)
    if(len(teacher_id) == 0):
        return {'otv': 'error', 'mes':'для данного класса нет преподавателя для проведения занятия'}
    
    teacher_id = teacher_id[0]

    fio_teach = getTeacherName(teacher_id)
    if(len(fio_teach) == 0):
        return {'otv': 'error', 'mes':'для данного класса нет преподавателя для проведения занятия'}
    fio_teach = fio_teach[0]

    grafic = getGrafic(work_id)
    place = getPlaceTeacher(fio_teach)
    if(len(place) == 0):
        return {'otv': 'error', 'mes':'у учителя нет кабинета для проведения занятия, проверьте данные'}

    sch_napr = getSchClassSchool(work_id, class_ID)
    teach_sch = getSchTeacherSchool(work_id, teacher_id)

    sch_grafic = []
    sch_free_time = []
    sch_full = []
    for i in range(len(weeks_name)):
        for j in range(len(grafic)):
            sch_grafic.append([place[0], place[1], weeks_name[i], grafic[j][0], grafic[j][1], grafic[j][2]])
    #  540  302  понедельник  306   8:30   9:15 sch_grafic
    # 306  540  понедельник sch_napr

    for i in range(len(sch_grafic)):
        flag = True
        for j in range(len(sch_napr)):
            if(sch_grafic[i][2] == sch_napr[j][2] and sch_grafic[i][3] == sch_napr[j][0]):
                flag = False
        if(flag):
            sch_free_time.append(sch_grafic[i])

    for i in range(len(sch_free_time)):
        flag = True
        for j in range(len(teach_sch)):
            if(sch_free_time[i][2] == teach_sch[j][2] and sch_free_time[i][3] == teach_sch[j][0]):
                flag = False
        if(flag):
            sch_full.append(sch_free_time[i])



    return {'otv':'OK', 'data': sch_full, 'teach': fio_teach, 'count': count}


