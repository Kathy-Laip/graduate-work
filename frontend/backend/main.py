from config import Config
from flask import Flask, request
from db_requests import *
import json
from algo import *
import pandas as pd
import datetime
import timeit
from functools import partial
import matplotlib.pyplot as plt


app = Flask(__name__)
app.config.from_object(Config)

# @app.route("/", methods=["POST"])
# def signInUser():
#     info = json.loads(request.get_data())
#     text = info['data']
#     flag = True
#     print(text)
#     return json.dumps({'otvet': flag})

@app.route('/logIn', methods=['POST'])
def logIn():
    info = json.loads(request.get_data())
    login = info['login']
    password = info['password']

    data = getDataUser(login)

    print(login, password, data)

    if(data is False): return json.dumps({'otv': 'error_data'})
    if(len(data) == 0): return json.dumps({'otv': 'invalid_login'})
    if(data[0][0] != password): return json.dumps({'otv': 'invalid_password'})
    else: 
        return json.dumps({'otv': 'good'})

@app.route('/newUser', methods=['POST'])
def newUser():
    info = json.loads(request.get_data())
    newLogin = info['newLogin']
    newPassword = info['newPassword']

    data = getDataUser(newLogin)
    if(data is False): return json.dumps({'otv': 'error_data'})
    if(len(data) != 0): return json.dumps({'otv': 'has_login'})

    if(insertNewUser(newLogin, newPassword)): return json.dumps({'otv': 'OK'})
    else: return json.dumps({'otv': 'error_data'})

    
@app.route('/addSchedule', methods=['POST'])
def addSchedule():
    info = json.loads(request.get_data())
    theme = info['theme']
    date = info['date']
    login = info['login']
    password = info['password']
    type = info['type'].lower()

    typeID = getType(type)
    userID = getUser(login, password)

    if(typeID and userID):
        if(len(checkTheme(userID, theme)) > 0):
            return json.dumps({'otv': 'error_theme'})
        if(addProject(userID, theme, date, typeID)):
            return json.dumps({'otv': 'OK'})
        else:
            return json.dumps({'otv': 'error_add'})
    else: return json.dumps({'otv': 'error_data'})

@app.route('/getSchedules', methods=['POST'])
def getSchedules():
    info = json.loads(request.get_data())
    login = info['login']
    password = info['password']

    userID = getUser(login, password)
    if(userID):
        schedules = getWorks(userID)
        
        if(len(schedules) >= 0):
            works = []
            for sch in schedules:
                works.append({
                    'id': sch[0],
                    'theme': sch[1],
                    'date' : sch[2],
                    'type': sch[3]
                })
            works_f = sorted(works, key=lambda x: x['date'], reverse=True)

            for sch in works_f:
                sch['date'] = str(sch['date'])
            
            for sch in works_f:
                sett = settingsWork(sch['id'])
                courseNumb = getCourseCount(sch['id'])
                if(sett is not None):
                    sch['settings'] = {'period': sett[0], 'acc_hour': sett[1], 'start': str(sett[2]), 'end': str(sett[3])}
                if(len(courseNumb) > 0):
                    sch['courseCount'] = len(courseNumb)
            
            for sch in works_f:
                grafic = getGrafic(sch['id'])
                if(len(grafic) > 0):
                    sch['grafic'] = []
                    for i in range(len(grafic)):
                        sch['grafic'].append([str(grafic[i][1]), str(grafic[i][2])])
            

            for sch in works_f:
                cls = getCoursesClasses(sch['id'])

                if(len(cls) > 0):
                    sets = set()
                    classes = {}
                    for i in range(len(cls)):
                        # print(cls[i])
                        if(cls[i][0] not in sets):
                            classes[cls[i][0]] = [[cls[i][1], cls[i][2], cls[i][3]]]
                            sets.add(cls[i][0])
                        else:
                            classes[cls[i][0]].append([cls[i][1], cls[i][2], cls[i][3]])
                    sch['courses'] = classes

            for sch in works_f:
                cls = getCafedras(sch['id'])
                print(cls)
                if(len(cls) > 0):
                    ans = []
                    for i in range(len(cls)):
                        ans.append(cls[i][0])
                    sch['cafedras'] = ans
            # print(works_f)
            return json.dumps({'otv': 'OK', 'works': works_f})
        else:
            return json.dumps({'otv': 'error_works'})
    else:
        return json.dumps({'otv': 'error_data'})


@app.route('/deleteSch', methods=['POST'])
def deleteSch():
    info = json.loads(request.get_data())
    login = info['login']
    password = info['password']

    data = info['data']
    userID = getUser(login, password)
    workID = getWorkID(data['theme'], userID)
    if(userID and workID):
        ans = deleteWorkID(userID, workID)
        if(ans):
            return json.dumps({'otv': 'OK'})
        else:
            return json.dumps({'otv': 'error_data'})
    else:
        return json.dumps({'otv': 'error_data'})


@app.route('/editThemeSch', methods=['POST'])
def editTheme():
    info = json.loads(request.get_data())
    login = info['login']
    password = info['password']
    
    data = info['data']
    newTheme = info['newTheme']
    userID = getUser(login, password)
    workID = getWorkID(data['theme'], userID)
    
    if(userID and workID):
        ans = updateTheme(newTheme, workID, userID)
        if(ans):
            return json.dumps({'otv': 'OK'})
        else:
            return json.dumps({'otv': 'error_data'})
    else:
        return json.dumps({'otv': 'error_data'})

@app.route('/editTypeSch', methods=['POST'])
def editType():
    info = json.loads(request.get_data())
    login = info['login']
    password = info['password']
    
    data = info['data']
    type = info['newType'].lower()

    typeID = getType(type)
    userID = getUser(login, password)
    workID = getWorkID(data['theme'], userID)
    
    if(userID and workID and typeID):
        ans = updateType(typeID, workID, userID)
        if(ans):
            return json.dumps({'otv': 'OK'})
        else:
            return json.dumps({'otv': 'error_data'})
    else:
        return json.dumps({'otv': 'error_data'})

@app.route('/editAllSch', methods=['POST'])
def editAll():
    info = json.loads(request.get_data())
    login = info['login']
    password = info['password']
    
    data = info['data']
    newTheme = info['newTheme']
    type = info['newType'].lower()

    typeID = getType(type)
    userID = getUser(login, password)
    workID = getWorkID(data['theme'], userID)
    
    print(typeID)
    if(userID and workID and typeID):
        ans = updateTheme(newTheme, workID, userID)
        print(ans)
        if(ans):
            ans = updateType(typeID, workID, userID)
            print(ans)
            if(ans):
                return json.dumps({'otv': 'OK'})
            else:
                return json.dumps({'otv': 'error_data'})
        else:
            return json.dumps({'otv': 'error_data'})
    else:
        return json.dumps({'otv': 'error_data'})

@app.route('/settingsFirst', methods=['POST'])
def setFirst():
    info = json.loads(request.get_data())
    
    workID = info['id']
    semester = info['semester']
    accHour = info['accHour']
    grafic = info['grafic']
    audit = info['audit']
    start = info['start']
    end = info['end']

    courses = info['courses']

    ans = addProjectSettings(semester, accHour, start, end, workID)
    if(ans == False):
        return json.dumps({'otv': 'error add set'})

    arr = []
    for i in range(1, len(grafic)):
        ans = addTimesGrafic(grafic[i][0], grafic[i][1], workID)
        arr.append(ans)
    
    if(all(arr) == False):
        return json.dumps({'otv': 'error grafic'})
    
    arr = []
    for i in range(1, len(audit)):
        type_place_ID = getTypePlaceID(audit[i][4])
        week_ID = getWeekID(audit[i][5])
        ans = addPlaceUni(workID, audit[i][0], week_ID, type_place_ID, audit[i][1], audit[i][2], audit[i][3])
        arr.append(ans)
    
    if(all(arr) == False):
        return json.dumps({'otv': 'error audit'})

    arr = []
    for i in range(1, len(courses) + 1):
        ans = addCourses(i, workID)
        arr.append(ans)
       
    if(all(arr) == False):
        return json.dumps({'otv': 'error courses number'})
    
    arr = []
    arr2 = []
    # # добавление информации про курсы
    for i in range(len(courses)):
        course_ID = getCourseID(courses[i]["courseNumber"], workID)
        for j in range(1, len(courses[i]['st'])):
            if(len(courses[i]['st'][j]) > 0):
                dir_ID = getDirection(course_ID, courses[i]['st'][j][0])
                if(dir_ID == False):
                    ans = addDirection(course_ID, courses[i]['st'][j][0])
                    arr.append(ans)
                dir_ID = getDirection(course_ID, courses[i]['st'][j][0])
                ans = addClass(dir_ID, courses[i]['st'][j][1], courses[i]['st'][j][2])
                arr2.append(ans)

    if(all(arr) == False):
        return json.dumps({'otv': 'error courses name'})
    if(all(arr2) == False):
        return json.dumps({'otv': 'error courses initial'})

    
    return json.dumps({'otv': 'ok'})

@app.route('/settingsSecond', methods=['POST'])
def setSecond():
    info = json.loads(request.get_data())
    
    workID = info['id']
    semester = info['semester']
    accHour = info['accHour']
    grafic = info['grafic']
    audit = info['audit']
    start = info['start']
    end = info['end']

    courses = info['courses']

    ans = deleteSCH(workID)
    if(ans == False):
        return json.dumps({'otv': 'error sch'})

    ans = addProjectSettings(semester, accHour, start, end, workID)
    if(ans == False):
        return json.dumps({'otv': 'error add set'})

    ans = deleteGrafic(workID)
    if(ans == False):
        return json.dumps({'otv': 'error grafic del'})

    arr = []
    for i in range(1, len(grafic)):
        ans = addTimesGrafic(grafic[i][0], grafic[i][1], workID)
        arr.append(ans)
    
    if(all(arr) == False):
        return json.dumps({'otv': 'error grafic'})

    ans = deletePlace(workID)
    if(ans == False):
        return json.dumps({'otv': 'error place'})
    
    arr = []
    for i in range(1, len(audit)):
        type_place_ID = getTypePlaceID(audit[i][4])
        week_ID = getWeekID(audit[i][5])
        ans = addPlaceUni(workID, audit[i][0], week_ID, type_place_ID, audit[i][1], audit[i][2], audit[i][3])
        arr.append(ans)
    
    if(all(arr) == False):
        return json.dumps({'otv': 'error audit'})

    ans = deleteCourses(workID)
    if(ans == False):
        return json.dumps({'otv': 'error courses'})

    arr = []
    for i in range(1, len(courses) + 1):
        ans = addCourses(i, workID)
        arr.append(ans)
       
    if(all(arr) == False):
        return json.dumps({'otv': 'error courses number'})
    
    arr = []
    arr2 = []
    # # добавление информации про курсы
    for i in range(len(courses)):
        course_ID = getCourseID(courses[i]["courseNumber"], workID)
        for j in range(1, len(courses[i]['st'])):
            if(len(courses[i]['st'][j]) > 0):
                print(courses[i]['st'][j])
                dir_ID = getDirection(course_ID, courses[i]['st'][j][0])
                if(dir_ID == False):
                    ans = addDirection(course_ID, courses[i]['st'][j][0])
                    arr.append(ans)
                dir_ID = getDirection(course_ID, courses[i]['st'][j][0])
                ans = addClass(dir_ID, courses[i]['st'][j][1], courses[i]['st'][j][2])
                arr2.append(ans)

    if(all(arr) == False):
        return json.dumps({'otv': 'error courses name'})
    if(all(arr2) == False):
        return json.dumps({'otv': 'error courses initial'})

    
    return json.dumps({'otv': 'ok'})


@app.route('/addPlanUni', methods=['POST'])
def addPlanUn():
    info = json.loads(request.get_data())
    work_id = info['id']
    numberCourse = info['numberCourse']
    nameCourse = info['nameCourse']
    data = info['data']

    course_id = getCourseID(numberCourse, work_id)
    direction_id = getDirection(course_id, nameCourse)
    
    arr = []

    if(course_id and direction_id):
        plans = getPlans(direction_id)
        if(len(plans) > 0):
            return json.dumps({'otv': 'has'})  
        elif(plans == False):
            return json.dumps({'otv': 'false'})  
        else: 
            for i in range(1, len(data)):
                if(len(data[i]) > 0):
                    ans = addPlanUni(direction_id, data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5])
                    arr.append(ans)
    else:
        return json.dumps({'otv': 'error courses name'})   

    if(all(arr) == False):
        return json.dumps({'otv': 'error courses name'})
    return json.dumps({'otv': 'ok'})


@app.route('/deletePlanUni', methods=['POST'])
def deletePlanUni():
    info = json.loads(request.get_data())
    work_id = info['id']
    numberCourse = info['numberCourse']
    name_course = info['name_course']

    course_id = getCourseID(numberCourse, work_id)
    direction_id = getDirection(course_id, name_course)
    
    if(course_id and direction_id):
        ans = deleteWorkPlan(direction_id)
        print(ans)
        if(ans):
            return json.dumps({'otv': 'ok'})
        else: return json.dumps({'otv': 'error'})
    else: return json.dumps({'otv': 'error data'})


@app.route('/editPlanUni', methods=['POST'])
def editPlanUni():
    info = json.loads(request.get_data())
    work_id = info['id']
    numberCourse = info['numberCourse']
    name_course = info['name_course']
    data = info['data']

    course_id = getCourseID(numberCourse, work_id)
    direction_id = getDirection(course_id, name_course)

    arr = []
    print(course_id, direction_id)
    if(course_id and direction_id):
        ans = deleteWorkPlan(direction_id)
        if(ans):
            for i in range(1, len(data)):
                if(len(data[i]) > 0):
                    ans = addPlanUni(direction_id, data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5])
                    arr.append(ans)
            if(all(arr) == False):
                return json.dumps({'otv': 'error courses name'})
            else :return json.dumps({'otv': 'ok'})
        else: return json.dumps({'otv': 'error'})

    else: return json.dumps({'otv': 'error data'})

@app.route('/addCafedraUni', methods=['POST'])
def addCaf():
    info = json.loads(request.get_data())
    work_ID = info['id']
    nameCafedra = info['nameKafedra']
    data = info['data']

    ans = getCafedraID(nameCafedra, work_ID)
    if(ans):
        return json.dumps({'otv': 'error name'})
    # # добавление информации про кафедры
    ans = addCafedra(nameCafedra, work_ID)
    if(ans == False):
        return json.dumps({'otv': 'error add name'})
    
    cafedra_ID = getCafedraID(nameCafedra, work_ID)

    print(nameCafedra, data)
    
    sets = set()
    arr = []
    arr1 = []
    arr2 = []
    for i in range(1, len(data)):
        if(len(data[i]) > 0):
            if(data[i][1] not in sets):
                ans = addTeacher(data[i][1], cafedra_ID)
                arr.append(ans)
                sets.add(data[i][1])

            if(data[i][6] == '-'):
                course_id = getCourseID(int(data[i][4]), work_ID)
                dir_id = getDirection(course_id, data[i][5])
                teacher_ID = getTeacherID(data[i][1], cafedra_ID)
                ans = addTeacherClassesDir(teacher_ID, dir_id, data[i][0])
                arr1.append(ans)
            else:
                course_id = getCourseID(int(data[i][4]), work_ID)
                dir_id = getDirection(course_id, data[i][5])
                class_ID = getClass(dir_id, data[i][6])
                teacher_ID = getTeacherID(data[i][1], cafedra_ID)
                ans = addTeacherClassesClass(teacher_ID, class_ID, data[i][0])
                arr2.append(ans)

    if(all(arr) == False):
        return json.dumps({'otv': 'error teachers'})
    
    if(all(arr1) == False):
        return json.dumps({'otv': 'error dirs'})
    

    if(all(arr) == False):
        return json.dumps({'otv': 'error class'})

    return json.dumps({'otv': 'ok'})
    
@app.route('/deleteCafedraUni', methods=['POST'])
def delCafedra():
    info = json.loads(request.get_data())
    work_id = info['id']
    name = info['nameCafedra']

    ans = deleteCafedra(work_id, name)
    if(ans):
        return json.dumps({'otv': 'ok'})
    else:
        return json.dumps({'otv': 'error'})

@app.route('/editCafedraUni', methods=['POST'])
def editCafedra():
    info = json.loads(request.get_data())
    work_id = info['id']
    name = info['nameCafedra']
    data = info['data']

    ans = deleteCafedra(work_id, name)
    if(ans == False):
        return json.dumps({'otv': 'error'})

    ans = addCafedra(name, work_id)
    if(ans == False):
        return json.dumps({'otv': 'error add name'})
    
    cafedra_ID = getCafedraID(name, work_id)

    
    sets = set()
    arr = []
    arr1 = []
    arr2 = []
    for i in range(1, len(data)):
        if(len(data[i]) > 0):
            if(data[i][1] not in sets):
                ans = addTeacher(data[i][1], cafedra_ID)
                arr.append(ans)
                sets.add(data[i][1])

            if(data[i][6] == '-'):
                course_id = getCourseID(int(data[i][4]), work_id)
                dir_id = getDirection(course_id, data[i][5])
                teacher_ID = getTeacherID(data[i][1], cafedra_ID)
                ans = addTeacherClassesDir(teacher_ID, dir_id, data[i][0])
                arr1.append(ans)
            else:
                course_id = getCourseID(int(data[i][4]), work_id)
                dir_id = getDirection(course_id, data[i][5])
                class_ID = getClass(dir_id, data[i][6])
                teacher_ID = getTeacherID(data[i][1], cafedra_ID)
                ans = addTeacherClassesClass(teacher_ID, class_ID, data[i][0])
                arr2.append(ans)

    if(all(arr) == False):
        return json.dumps({'otv': 'error teachers'})
    
    if(all(arr1) == False):
        return json.dumps({'otv': 'error dirs'})
    

    if(all(arr) == False):
        return json.dumps({'otv': 'error class'})

    return json.dumps({'otv': 'ok'})

@app.route('/settingsFirstSchool', methods=['POST'])
def setFirstSchool():
    info = json.loads(request.get_data())
    
    workID = info['id']
    semester = info['semester']
    accHour = info['accHour']
    grafic = info['grafic']
    audit = info['audit']
    start = info['start']
    end = info['end']

    courses = info['courses']

    ans = addProjectSettingsSchool(semester, accHour, start, end, workID)
    if(ans == False):
        return json.dumps({'otv': 'error add set'})
    
    arr = []
    for i in range(1, len(grafic)):
        ans = addTimesGrafic(grafic[i][0], grafic[i][1], workID)
        arr.append(ans)
    
    if(all(arr) == False):
        return json.dumps({"otv": 'error add grafic'})

    arr = []
    for i in range(1, len(audit)):
        ans = addPlaceSchool(workID, audit[i][0], audit[i][1])
        arr.append(ans)

    if(all(arr) == False):
        return json.dumps({'otv': 'error audit'})
    
    arr = []
    for i in range(1, len(courses) + 1):
        ans = addCourses(i, workID)
        arr.append(ans)

    if(all(arr) == False):
        return json.dumps({'orv': 'courses number'})

    arr = []
    arr2 = []
    for i in range(len(courses)):
        courseID = getCourseID(courses[i]['courseNumber'], workID)
        for j in range(1, len(courses[i]['st'])):
            if(len(courses[i]['st'][j])> 0):
                dir_id = getDirection(courseID, courses[i]['st'][j][0])
                if(dir_id == False):
                    ans = addDirection(courseID, courses[i]['st'][j][0])
                    arr.append(ans)
                dir_id = getDirection(courseID, courses[i]['st'][j][0])
                ans = addClass(dir_id, courses[i]['st'][j][1], courses[i]['st'][j][2])
                arr2.append(ans)

    if(all(arr) == False):
        return json.dumps({'otv': 'error courses name'})
    if(all(arr2) == False):
        return json.dumps({'otv': 'error courses initial'})

    return json.dumps({'otv': 'ok'})
    
@app.route('/settingsSecondSchool', methods=['POST'])
def setSecondSchool():
    info = json.loads(request.get_data())
    
    
    workID = info['id']
    semester = info['semester']
    accHour = info['accHour']
    grafic = info['grafic']
    audit = info['audit']
    start = info['start']
    end = info['end']

    courses = info['courses']

    ans = deleteSCH(workID)
    if(ans == False):
        return json.dumps({'otv': 'error sch'})

    ans = addProjectSettings(semester, accHour, start, end, workID)
    if(ans == False):
        return json.dumps({'otv': 'error add set'})

    ans = deleteGrafic(workID)
    if(ans == False):
        return json.dumps({'otv': 'error grafic del'})

    arr = []
    for i in range(1, len(grafic)):
        ans = addTimesGrafic(grafic[i][0], grafic[i][1], workID)
        arr.append(ans)
    
    if(all(arr) == False):
        return json.dumps({'otv': 'error grafic'})

    ans = deletePlace(workID)
    if(ans == False):
        return json.dumps({'otv': 'error place'})
    
    arr = []
    for i in range(1, len(audit)):
        ans = addPlaceSchool(workID, audit[i][0], audit[i][1])
        arr.append(ans)
    
    if(all(arr) == False):
        return json.dumps({'otv': 'error audit'})

    ans = deleteCourses(workID)
    if(ans == False):
        return json.dumps({'otv': 'error courses'})

    arr = []
    for i in range(1, len(courses) + 1):
        ans = addCourses(i, workID)
        arr.append(ans)
       
    if(all(arr) == False):
        return json.dumps({'otv': 'error courses number'})
    
    arr = []
    arr2 = []

    # # добавление информации про курсы
    for i in range(len(courses)):
        course_ID = getCourseID(courses[i]["courseNumber"], workID)
        for j in range(1, len(courses[i]['st'])):
            if(len(courses[i]['st'][j])> 0):
                dir_ID = getDirection(course_ID, courses[i]['st'][j][0])
                if(dir_ID == False):
                    ans = addDirection(course_ID, courses[i]['st'][j][0])
                    arr.append(ans)
                dir_ID = getDirection(course_ID, courses[i]['st'][j][0])
                ans = addClass(dir_ID, courses[i]['st'][j][1], courses[i]['st'][j][2])
                arr2.append(ans)

    if(all(arr) == False):
        return json.dumps({'otv': 'error courses name'})
    if(all(arr2) == False):
        return json.dumps({'otv': 'error courses initial'})

    
    return json.dumps({'otv': 'ok'})

@app.route('/addPlanSchool', methods=['POST'])
def addPlanSc():
    info = json.loads(request.get_data())
    work_id = info['id']
    numberCourse = info['numberCourse']
    nameCourse = info['nameCourse']
    dir = nameCourse['dir']
    initial = nameCourse['currCourse']
    data = info['data']

    # # добавление информации про направления
    courseID = getCourseID(numberCourse, work_id)
    dir_schoolID = getDirection(courseID, dir)   
    class_schoolID = getClass(dir_schoolID, initial)
    
    # print(addPlanSchool(class_schoolID, 'Физкультура', 3))

    arr = []
    if(class_schoolID):
        plans = getPlansSchool(class_schoolID)
        if(len(plans) > 0):
            return json.dumps({'otv': 'has'})  
        elif(plans == False):
            return json.dumps({'otv': 'false'})  
        else: 
            for i in range(1, len(data)):
                ans = addPlanSchool(class_schoolID, data[i][0], data[i][1])
                arr.append(ans)
    else:
        return json.dumps({'otv': 'error courses name'})   

    if(all(arr) == False):
        return json.dumps({'otv': 'error courses name'})
    return json.dumps({'otv': 'ok'})

@app.route('/deletePlanSchool', methods=['POST'])
def deletePlanSchool():
    info = json.loads(request.get_data())
    work_id = info['id']
    numberCourse = info['numberCourse']
    name_course = info['name_course']
    dir = name_course['dir']
    currCourse = name_course['currCourse']

    print(info)

    course_id = getCourseID(numberCourse, work_id)
    direction_id = getDirection(course_id, dir)
    class_id = getClass(direction_id, currCourse)
    
    if(class_id):
        ans = deleteWorkPlanSchool(direction_id)
        print(ans)
        if(ans):
            return json.dumps({'otv': 'ok'})
        else: return json.dumps({'otv': 'error'})
    else: return json.dumps({'otv': 'error data'})

@app.route('/editPlanSchool', methods=['POST'])
def editPlanSchool():
    info = json.loads(request.get_data())
    work_id = info['id']
    numberCourse = info['numberCourse']
    name_course = info['name_course']
    dir = name_course['dir']
    currCourse = name_course['currCourse']
    data = info['data']

    print(info)

    course_id = getCourseID(numberCourse, work_id)
    direction_id = getDirection(course_id, dir)
    class_id = getClass(direction_id, currCourse)

    arr = []
    
    if(class_id):
        ans = deleteWorkPlanSchool(class_id)
        if(ans):
            for i in range(1, len(data)):
                ans = addPlanSchool(class_id, data[i][0], data[i][1])
                arr.append(ans)
            if(all(arr) == False):
                return json.dumps({'otv': 'error courses name'})
            else :return json.dumps({'otv': 'ok'})
        else: return json.dumps({'otv': 'error'})

    else: return json.dumps({'otv': 'error data'})

@app.route('/addCafedraSchool', methods=['POST'])
def addCafSchool():
    info = json.loads(request.get_data())
    work_ID = info['id']
    nameCafedra = info['nameKafedra']
    data = info['data']

    dir = getDataCourseDirs(work_ID)
    ans = getCafedraID(nameCafedra, work_ID)
    if(ans):
        return json.dumps({'otv': 'error name'})
    # # добавление информации про кафедры
    ans = addCafedra(nameCafedra, work_ID)
    if(ans == False):
        return json.dumps({'otv': 'error add name'})
    
    cafedra_ID = getCafedraID(nameCafedra, work_ID)

    arr = []
    arr1 = []
    arr2 = []
    for i in range(1, len(data)):
        if(len(data[i]) > 0):
            ans = addTeacher(data[i][1], cafedra_ID)
            arr.append(ans)
            
            dir_id = ''
            for j in range(len(dir)):
                if(dir[j][2] == data[i][2]):
                    dir_id = dir[j][1]
            if(dir_id):
                class_ID = getClass(dir_id, data[i][3])
                if(class_ID):
                    teacher_ID = getTeacherID(data[i][1], cafedra_ID)
                    ans = addTeacherClassesClass(teacher_ID, class_ID, data[i][0])
                    arr2.append(ans)
                else:
                    return json.dumps({'otv': 'error class'})
            else: 
                return json.dumps({'otv': 'dir error'})

    if(all(arr) == False):
        return json.dumps({'otv': 'error teachers'})
    
    if(all(arr1) == False):
        return json.dumps({'otv': 'error dirs'})
    

    if(all(arr) == False):
        return json.dumps({'otv': 'error class'})

    return json.dumps({'otv': 'ok'})


@app.route('/deleteCafedraSchool', methods=['POST'])
def delCafedraSch():
    info = json.loads(request.get_data())
    work_id = info['id']
    name = info['nameCafedra']

    ans = deleteCafedra(work_id, name)
    if(ans):
        return json.dumps({'otv': 'ok'})
    else:
        return json.dumps({'otv': 'error'})

@app.route('/editCafedraSchool', methods=['POST'])
def editCafedraSchool():
    info = json.loads(request.get_data())
    work_id = info['id']
    name = info['nameCafedra']
    data = info['data']

    dir = getDataCourseDirs(work_id)
    ans = deleteCafedra(work_id, name)
    if(ans == False):
        return json.dumps({'otv': 'error'})

    ans = addCafedra(name, work_id)
    if(ans == False):
        return json.dumps({'otv': 'error add name'})
    
    cafedra_ID = getCafedraID(name, work_id)

    
    arr = []
    arr1 = []
    arr2 = []
    for i in range(1, len(data)):
        if(len(data[i]) > 0):
            ans = addTeacher(data[i][1], cafedra_ID)
            arr.append(ans)
            dir_id = ''
            for j in range(len(dir)):
                if(dir[j][2] == data[i][2]):
                    dir_id = dir[j][1]
            if(dir_id):
                class_ID = getClass(dir_id, data[i][3])
                if(class_ID):
                    teacher_ID = getTeacherID(data[i][1], cafedra_ID)
                    ans = addTeacherClassesClass(teacher_ID, class_ID, data[i][0])
                    arr2.append(ans)
                else:
                    return json.dumps({'otv': 'error class'})
            else: 
                return json.dumps({'otv': 'dir error'})

    if(all(arr) == False):
        return json.dumps({'otv': 'error teachers'})
    
    if(all(arr1) == False):
        return json.dumps({'otv': 'error dirs'})
    

    if(all(arr) == False):
        return json.dumps({'otv': 'error class'})

    return json.dumps({'otv': 'ok'})

@app.route('/getScheduleUni', methods=['POST'])
def getSchUni():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    course = info['data']['course']
    name_napr = info['data']['napr']
    
    course = getCourseID(course, work_id)
    dirID = getDirection(course, name_napr)

    sch = getScheUniDir(work_id, dirID)
 
    sch_new = []
    for i in range(len(sch)):
        sch_new.append([sch[i][2], sch[i][3], sch[i][4], sch[i][5], sch[i][6], sch[i][7], sch[i][8], sch[i][9], sch[i][10], sch[i][11], sch[i][12], sch[i][0]])
    # print(course, dirID, sch)

    if(len(sch) == 0):
        return json.dumps({'otv': 'empty'})

    return json.dumps({'otv': 'OK','info': sch_new})

@app.route('/getScheduleSchool', methods=['POST'])
def getScheduleSchool():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    course = info['data']['course']

    dir_id = getDirIdNameCourse(course, work_id)

    sch = getScheSchoolDir(work_id, dir_id[0])
 
    sch_new = []
    for i in range(len(sch)):
        sch_new.append([sch[i][2], sch[i][3], sch[i][4], sch[i][5], sch[i][6], sch[i][7], sch[i][8], sch[i][9], sch[i][10], sch[i][11], sch[i][0]])

    if(len(sch) == 0):
        return json.dumps({'otv': 'empty'})

    return json.dumps({'otv': 'OK','info': sch_new})

@app.route('/getSubjectUni', methods=['POST'])
def getSubjUni():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    course = info['data']['course']
    name_napr = info['data']['napr']

    course = getCourseID(course, work_id)
    dirID = getDirection(course, name_napr)

    subj = getPlanDir(dirID)
    subs = []
    for i in range(len(subj)):
        subs.append(subj[i][0])
    
    if(len(subj) == 0):
        return json.dumps({'otv': 'empty'})
    
    return json.dumps({'otv': 'OK', 'data': subs})

@app.route('/getSubjectSchool', methods=['POST'])
def getSubjSchool():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    course = info['data']['course']

    dir_id = getDirIdNameCourse(course, work_id)


    subj = getPlanSchoolDir(dir_id[0])
    subs = []
    for i in range(len(subj)):
        subs.append([subj[i][0], subj[i][1]])
    
    if(len(subj) == 0):
        return json.dumps({'otv': 'empty'})
    
    return json.dumps({'otv': 'OK', 'data': subs})

@app.route('/addLessonLectUni', methods=['POST'])
def addLessonLectUni():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    subj = info['data']['subj']
    napr = info['data']['napr']

    groups = []

    for i in range(len(napr)):
        gr = napr[i].split(' ')
        
        groups.append({'courseNumber': int(gr[0]), 'napr': ' '.join(gr[1:])})
    ans = algo(work_id, {'type': 'lect', 'groups': groups, 'sub': subj}, 'uni')
    if(ans['otv'] == 'OK'):

        return json.dumps({'otv': 'OK', 'data': ans['data']})
    else:
        return json.dumps({'otv': 'error', 'mes': ans['mes']})

@app.route('/getLessonSchool', methods=['POST'])
def getLessonSchool():
    info = json.loads(request.get_data())
    print(info)
    
    work_id = info['work_id']
    subj = info['data']['subj']
    napr = info['data']['napr']


    ans = algoSchool(work_id, {'courseNum': napr.split(' ')[0], 'initial_class': ' '.join(napr.split(' ')[1:]), 'subj': subj})
    if(ans['otv'] == 'OK'):

        return json.dumps({'otv': 'OK', 'data': ans['data'], 'teach': ans['teach'], 'count': ans['count']})
    else:
        return json.dumps({'otv': 'error', 'mes': ans['mes']})

@app.route('/getLessonPracticUni', methods=['POST'])
def getLessonPracticUni():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    subj = info['data']['subj']
    napr = info['data']['napr']


    ans = algo(work_id, {'type': 'practic', 'groups': napr, 'sub': subj}, 'uni')
    if(ans['otv'] == 'OK'):

        return json.dumps({'otv': 'OK', 'data': ans['data']})
    else:
        return json.dumps({'otv': 'error', 'mes': ans['mes']})

@app.route('/getLessonLabUni', methods=['POST'])
def getLessonLabUni():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    subj = info['data']['subj']
    napr = info['data']['napr']


    ans = algo(work_id, {'type': 'lab', 'groups': napr, 'sub': subj}, 'uni')
    if(ans['otv'] == 'OK'):
        return json.dumps({'otv': 'OK', 'data': ans['data']})
    else:
        return json.dumps({'otv': 'error', 'mes': ans['mes']})

@app.route('/getLessonExamUni', methods=['POST'])
def getLessonExamUni():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    subj = info['data']['subj']
    napr = info['data']['napr']



    ans = algo(work_id, {'type': 'exam', 'groups': napr, 'sub': subj}, 'uni')
    if(ans['otv'] == 'OK'):
        for i in range(len(ans['data'])):
            ans['data'][i][0] = ans['data'][i][0].strftime("%Y-%m-%d")
        return json.dumps({'otv': 'OK', 'data': ans['data'], 'teach': ans['teach']})
    else:
        return json.dumps({'otv': 'error', 'mes': ans['mes']})

@app.route('/getLessonMinExamUni', methods=['POST'])
def getLessonMinExamUni():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    subj = info['data']['subj']
    napr = info['data']['napr']



    ans = algo(work_id, {'type': 'min_exam', 'groups': napr, 'sub': subj}, 'uni')
    if(ans['otv'] == 'OK'):
        for i in range(len(ans['data'])):
            ans['data'][i][0] = ans['data'][i][0].strftime("%Y-%m-%d")
        # print(ans['data'], ans['teach'])
        return json.dumps({'otv': 'OK', 'data': ans['data'], 'teach': ans['teach']})
    else:
        return json.dumps({'otv': 'error', 'mes': ans['mes']})


@app.route('/addLessonsUni', methods=['POST'])
def addLessonsUni():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    lessons = info['data']['lessons']
    type = info['data']['type']
    teach = info['data']['teach']
    dirs = info['data']['dirs']
    subj = info['data']['subj']

    if(type == 'lect'):
        tech_id = getTeachId(teach)
        napr = []
        for i in range(len(dirs)):
            course_id = getCourseID(int(dirs[i].split(' ')[0]), work_id)
            dir_id = getDirection(course_id, ' '.join(dirs[i].split(' ')[1:]))
            napr.append(dir_id)
            # print(course_id, work_id, dir_id, ' '.join(dirs[i].split(' ')[1]), dirs[i].split(' ')[1:])
        arr = []
        for i in range(len(lessons)):
            weeks = getWeekID(lessons[i][2])
            for j in range(len(napr)):
                if(len(lessons[i][3]) == 2):
                    ans = insertLect(work_id, int(lessons[i][3][0][0]), int(lessons[i][0]), tech_id, napr[j], weeks, subj, lessons[i][3][1])
                    arr.append(ans)
                elif(len(lessons[i][3]) == 3):
                    ans = insertLect(work_id, int(lessons[i][3][0]), int(lessons[i][0]), tech_id, napr[j], weeks, subj, 'каждую неделю')
                    arr.append(ans)
        if(all(arr)):
            return json.dumps({'otv': 'OK'})
        else: 
            return json.dumps({'otv': 'error', 'mes': 'Не получилось разместить расписание, попробуйте позже...'})

    elif(type == 'practic' or type == 'lab'):
        tech_id = getTeachId(teach)
        groups = []
        course_id = getCourseID(dirs['courseNumber'], work_id)
        dir_id = getDirection(course_id, dirs['napr'])
        for i in range(len(dirs['groups'])):
            groups.append(getClass(dir_id, dirs['groups'][i]))
        arr = []
        for i in range(len(lessons)):
            weeks = getWeekID(lessons[i][2])
            for j in range(len(groups)):
                if(len(lessons[i][3]) == 2):
                    ans = insertPrOrLab(work_id, int(lessons[i][3][0][0]), int(lessons[i][0]), tech_id, dir_id,groups[j], weeks, subj, lessons[i][3][1])
                    arr.append(ans)
                elif(len(lessons[i][3]) == 3):
                    ans = insertPrOrLab(work_id, int(lessons[i][3][0]), int(lessons[i][0]), tech_id, dir_id, groups[j], weeks, subj, 'каждую неделю')
                    arr.append(ans)
        if(all(arr)):
            return json.dumps({'otv': 'OK'})
        else: 
            return json.dumps({'otv': 'error', 'mes': 'Не получилось разместить расписание, попробуйте позже...'})


@app.route('/addLessonsSchool', methods=['POST'])
def addLessonsSchool():
    info = json.loads(request.get_data())
    # {'wotk_id': 71, 
    # 'data': {'lessons': [['559', '312', 'понедельник', '307', '9:25', '10:10'], 
    # ['559', '312', 'понедельник', '309', '11:25', '12:10']], 
    # 'teach': 'Львова М. Ф.', 
    # 'dirs': '8 А', 
    # 'subj': 'Литература'}}

    work_id = info['work_id']
    less = info['data']['lessons']
    teach = info['data']['teach']
    napr = info['data']['dirs']
    subj = info['data']['subj']

    dir_id = getDirIdNameCourse(napr.split(' ')[0], work_id)
    class_id = getClass(dir_id[0], napr.split(' ')[1])
    teach_id = getTeachId(teach)
    
    arr = []
    for i in range(len(less)):
        week_id = getWeekID(less[i][2])
        # print(work_id, int(less[i][3]), int(less[i][0]), teach_id, dir_id[0], class_id, week_id, subj)
        
        ans = insertLessSchool(work_id, int(less[i][3]), int(less[i][0]), teach_id, dir_id[0], class_id, week_id, subj, 'каждую неделю')
        arr.append(ans)
    # print(ans)
    if(all(arr)):
        return json.dumps({'otv': 'OK'})
    else: return json.dumps({'otv': 'error', 'mes': 'Ошибка добавления занятий, попробуйте позже!'})


@app.route('/deleteLessonUni', methods=['POST'])
def deleteLessonUni():
    info = json.loads(request.get_data())
    id = info['id']

    ans = deleteUniLess(id)
    if(ans):
        return json.dumps({'otv': 'OK'})
    else: return json.dumps({'otv': 'error'})

@app.route('/deleteLessonSchool', methods=['POST'])
def deleteLessonSchool():
    info = json.loads(request.get_data())
    id = info['id']

    ans = deleteUniLess(id)
    if(ans):
        return json.dumps({'otv': 'OK'})
    else: return json.dumps({'otv': 'error'})

@app.route('/addExamOrMin', methods=['POST'])
def addExamOrMin():
    info = json.loads(request.get_data())
    print(info)

    work_id = info['work_id']
    groups = info['data']['info']['napr']
    subj = info['data']['info']['subj']
    typeLess = info['data']['type'][0]
    lessAdd = info['data']['add']
    teach = info['data']['teach']

    teach_id = getTeachId(teach)
    course_id = getCourseID(groups['courseNumber'], work_id)
    dir_id = getDirection(course_id, groups['napr'])
    class_id = getClass(dir_id, groups['groups'])
    week_id = getWeekID(lessAdd[3])

    if(typeLess == 'exam'):
        ans = insertExamOrMinExam(work_id, int(lessAdd[4][0]), int(lessAdd[1]), teach_id, dir_id, class_id, week_id, lessAdd[0], subj, 'экзамен')
        if(ans):
            return json.dumps({'otv': 'OK'})
        else: return json.dumps({'otv': 'error'})

    elif(typeLess == 'minExam'):
        ans = insertExamOrMinExam(work_id, int(lessAdd[4][0]), int(lessAdd[1]), teach_id, dir_id, class_id, week_id, lessAdd[0], subj, 'зачет')
        if(ans):
            return json.dumps({'otv': 'OK'})
        else: return json.dumps({'otv': 'error'})



    # {'data': {'info': {'type': 'exam', 'napr': {'courseNumber': 2, 'napr': 'ФИИТ', 'groups': '09-231'}, 'subj': 'Технологии и методы программирования'}, 
    # 'type': ['exam', 1], 
    # 'add': ['2024-05-31', '588', '216', 'пятница', ['314', '10:10', '11:40']]}}

    # return json.dumps({'otv': 'OK'})

@app.route('/saveUniDir', methods=['POST'])
def saveUniDir():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    theme = info['theme']
    data = info['data']
    # {course: course, curDir: curDir}

    course_id = getCourseID(data['course'], work_id)
    dir_id = getDirection(course_id, data['curDir'])

    sch = getSchDirSave(dir_id, course_id)
    

    if(len(sch) != 0):
        sch_n = []
        for i in range(len(sch)):
            sch_r = []
            for j in range(len(sch[i])):
                sch_r.append(sch[i][j])
            sch_n.append(sch_r)
        
        return json.dumps({'otv': 'ok', 'data': sch_n})
    else:
        return json.dumps({'otv': 'error', 'mes': 'Возможно пустое рапсисание или ошибка! Попропбуйте позже'})

@app.route('/saveUniDirs', methods=['POST'])
def saveUniDirs():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    theme = info['theme']
    data = info['data']
    print('hi')

    course_id = getCourseID(data['course'], work_id)
    dirs = getDirs(course_id)
    
    schs = []
    for i in range(len(dirs)):
        
        sch = getSchDirSave(dirs[i][0], course_id)
        print(dirs[i][1])
        sch_n = []
        for k in range(len(sch)):
            sch_r = []
            for j in range(len(sch[k])):
                sch_r.append(sch[k][j])
            sch_n.append(sch_r)
        print(sch_n)
        schs.append({'dir_name': dirs[i][1], 'sch': sch_n})
    print(schs)
    
    return json.dumps({'otv': 'ok', 'data': schs})   

@app.route('/saveAllUni', methods=['POST'])
def saveAllUni():
    info = json.loads(request.get_data())
    work_id = info['work_id']

    courses = getCourses(work_id)
    infoDirs = []
    
    if(len(courses) == 0): return json.dumps({'otv': 'error', 'mes': 'Ошибка получения информации о курсах! Попробуйте позже'})
    for i in range(len(courses)):
        dirs = getDirs(courses[i][0])
        infoDirs.append({'numCourse': courses[i], 'dirs': dirs})

    schs = []
    
    
    for i in range(len(infoDirs)):
        for j in range((len(infoDirs[i]['dirs']))):
            dir_id = getDirection(int(infoDirs[i]['numCourse'][0]), infoDirs[i]['dirs'][j][1])
            sch = getSchDirSave(dir_id, int(infoDirs[i]['numCourse'][0]))
            
            sch_n = []
            for k in range(len(sch)):
                sch_r = []
                for l in range(len(sch[k])):
                    sch_r.append(sch[k][l])
                sch_n.append(sch_r)
            
            schs.append({'course': int(infoDirs[i]['numCourse'][1]), 'dir_name': infoDirs[i]['dirs'][j][1], 'sch': sch_n})
    return json.dumps({'otv': 'ok', 'data': schs})


@app.route('/saveSchSchool', methods=['POST'])
def saveSchSchool():
    info = json.loads(request.get_data())
    work_id = info['work_id']
    data = info['data']

    dir_id = getDirIdNameCourse(data['course'], work_id)
    sch = getSchDirSchoolSave(dir_id[0])
    sch_n = []
    for i in range(len(sch)):
        sch_r = []
        for j in range(len(sch[i])):
            sch_r.append(sch[i][j])
        sch_n.append(sch_r)
    
    return json.dumps({'otv': 'ok', 'data': sch_n})





# функция для измерения выполнения запроса или генерации данных
def time_func(name_function, n, *args):
    # time = timeit.repeat(partial(name_function, *args), number=1000, repeat=5) 
    # возваращет реультат несокльких замеров по number раз
    time = timeit.timeit(partial(name_function, *args), number=n)
    return time/n

if __name__ == '__main__':
    # print('test')
    app.run(debug=True, host="127.0.0.1", port="5000")
    # work_id = 73
    # info ={'type': 'lect', 'groups': [{'courseNumber': 2, 'napr': 'ФИИТ'}, {'courseNumber': 3, 'napr': 'ИБ'}], 'sub': 'Математическая логика и теория алгоритмов'}
    # ans = algo(work_id, info, 'uni')
    # if('full' in ans):
    #     print(pd.DataFrame(ans['full']))
    # if('half' in ans):
    #     print(pd.DataFrame(ans['half']))
    # if('weeks' in ans):
    #     print(pd.DataFrame(ans['weeks']))

    # info = {'type': 'practic', 'groups': {'courseNumber': 2, 'napr': 'ФИИТ', 'groups': ['09-231']}, 'sub': 'Математическая логика и теория алгоритмов'}
    # ans = algo(work_id, info, 'uni')
    # print(ans)
    # if('full' in ans):
    #     print(pd.DataFrame(ans['full']))
    # if('half' in ans):
    #     print(pd.DataFrame(ans['half']))
    # if('weeks' in ans):
    #     print(pd.DataFrame(ans['weeks']))

    # info = {'type': 'lab', 'groups': {'courseNumber': 1, 'napr': 'ФИИТ', 'groups': ['09-331', '09-332']}, 'sub': 'Дискретная математика'}
    # ans = algo(work_id, info, 'uni')
    # print(ans)
    # if('full' in ans):
    #     print(pd.DataFrame(ans['full']))
    # if('half' in ans):
    #     print(pd.DataFrame(ans['half']))
    # if('weeks' in ans):
    #     print(pd.DataFrame(ans['weeks']))

    # info = {'type': 'exam', 'groups': {'courseNumber': 1, 'napr': 'ФИИТ', 'groups': '09-331'}, 'sub': 'Алгебра и геометрия'}
    # ans = algo(work_id, info, 'uni')
    # print(ans)

    # info = {'type': 'min_exam', 'groups': {'courseNumber': 1, 'napr': 'ФИИТ', 'groups': '09-331'}, 'sub': 'Информационные технологии'}
    # ans = algo(work_id, info, 'uni')
    # print(pd.DataFrame(ans))


    # work_id = 71
    # info = {'courseNum': 9, 'initial_class': 'В', 'subj': 'Алгебра'}
    # ans = algoSchool(work_id, info)
    # print(ans)



    # pass
    #----------------------------------- университет -----------------------------------
    # новый пользователь
    # print(insertNewUser('ya.shl@yandex.ru', 'kathy_laip123'))
    # userID = getUser('ya.shl@yandex.ru', 'kathy_laip123')

    # добавление нового проекта
    # typeID = getType('университет')
    # print(addProject(userID, 'Расписание КФУ ИВМИИТ 2023-2024 2 семестр', '2023-01-19', typeID))

    #настройка расписания
    # workID = getWorkID('Расписание КФУ ИВМИИТ 2023-2024 2 семестр', userID)
    # print(addProjectSettings(1,40, '2023-02-09', '2023-05-31', workID))
    # times = [{'start': '8:30', 'end': '10:00'}, {'start': '10:20', 'end': '11:50'}, {'start': '12:00', 'end': '13:10'}, {'start': '13:30', 'end': '14:10'}, {'start': '14:30', 'end': '15:10'}]
    # for i in range(len(times)):
    #     print(addTimesGrafic(times[i]['start'], times[i]['end'], workID))
    # for i in range(1, 3):
    #     print(addCourses(i, workID))
    
    # добавление информации про курсы
    # course_ID = getCourseID(1, workID)
    # print(addDirection(course_ID, 'ФИИТ'))
    # print(addDirection(course_ID, 'ПИ'))
    # print(addDirection(course_ID, 'ПМИ'))
    # print(addDirection(course_ID, 'ИСТ'))

    # # добавление информации про направления
    # dir_ID = getDirection(course_ID, 'ПИ')
    # print(addClass(dir_ID, '09-051', 20))
    # print(addClass(dir_ID, '09-052', 30))

    # def create():
    #     typeID = getType('университет')
    #     addProject(userID, 'Расписание КФУ ИВМИИТ 2023-2024 2 семестр', '2023-01-19', typeID)
    #     workID = getWorkID('Расписание КФУ ИВМИИТ 2023-2024 2 семестр', userID)
    #     addProjectSettings(1,40, '2023-02-09', '2023-05-31', workID)
    #     times = [{'start': '8:30', 'end': '10:00'}, {'start': '10:20', 'end': '11:50'}, {'start': '12:00', 'end': '13:10'}, {'start': '13:30', 'end': '14:10'}, {'start': '14:30', 'end': '15:10'}]
    #     for i in range(len(times)):
    #         print(addTimesGrafic(times[i]['start'], times[i]['end'], workID))
    #     for i in range(1, 3):
    #         print(addCourses(i, workID))
    #     course_ID = getCourseID(1, workID)
    #     addDirection(course_ID, 'ФИИТ')
    #     addDirection(course_ID, 'ПИ')
    #     addDirection(course_ID, 'ПМИ')
    #     addDirection(course_ID, 'ИСТ')
    #     dir_ID = getDirection(course_ID, 'ПИ')
    #     addClass(dir_ID, '09-051', 20)
    #     addClass(dir_ID, '09-052', 30)
    #     for i in range(1, 11):
    #         addPlanUni(dir_ID, 'Программная инженерия', "+", "+", 36, 18, 0)
    #     addCafedra('КСАИТ', workID)
    #     class_ID = getClass(dir_ID, '09-051')
    #     cafedra_ID = getCafedraID('КСАИТ', workID)
    #     for i in range(1, 15):
    #         addTeacher('Андрианова Анастасия Александровна', cafedra_ID)
    #     teacher_ID = getTeacherID('Андрианова Анастасия Александровна', cafedra_ID)
    #     addTeacherClassesDir(teacher_ID, dir_ID, 'Программная инженерия')
    #     addTeacherClassesClass(teacher_ID, class_ID, 'Программная инженерия')
    #     type_place_ID = getTypePlaceID('practic')
    #     week_ID = getWeekID('вторник')
    #     for i in range(1, 50):
    #         addPlaceUni(workID, '802', week_ID, type_place_ID, 35, '8:00', '16:00')

    

        
    # count, times = [], []
    # for i in range(10, 101, 10):
    #     # create()
    #     workID = getWorkID('Расписание КФУ ИВМИИТ 2023-2024 2 семестр', userID)
    #     typeID = getType('университет')
    #     times.append(time_func(addProject, i, userID, 'Расписание КФУ ИВМИИТ 2023-2024 2 семестр', '2023-01-19', typeID))
    #     count.append(i)
    # plt.title('добавление информации о расписании: ')
    # plt.xlabel('количество добавлений')
    # plt.ylabel('время в секундах')
    # plt.plot(count, times)
    # plt.show()

    # info = {'type': 'lab', 'groups': {'courseNumber': 2, 'napr': 'ФИИТ', 'groups': ['09-231']}, 'sub': 'Лабораторный практикум по технологиям программирования'}
    # print(algo(work_id, info, 'uni'))
    # count, times = [], []
    # for i in range(10, 101, 10):
    #     # create()
    #     times.append(time_func(algo, i, work_id, info, 'uni'))
    #     count.append(i)
    # plt.title('лабораторные занятия: ')
    # plt.xlabel('количество запросов')
    # plt.ylabel('время в секундах')
    # plt.plot(count, times)
    # plt.show()




    # добавление информации про учебный план
    # print(addPlanUni(dir_ID, 'Программная инженерия', "+", "+", 36, 18, 0))
    # print(addPlanUni(dir_ID, 'Базы данных', "+", "+", 36, 36, 0))
    # print(addPlanUni(dir_ID, 'Дискретная математика', "+", "+", 36, 18, 0))
    # print(addPlanUni(dir_ID, 'Анализ сложных систем', "+", "+", 36, 36, 0))
    # print(addPlanUni(dir_ID, 'Математический анализ', "+", "+", 36, 54, 0))
    # print(addPlanUni(dir_ID, 'Информационная безопасность', "+", "+", 36, 36, 0))
    # print(addPlanUni(dir_ID, 'Информационные технологии', "+", "+", 36, 18, 0))

    # добавление информации про кафедры
    # print(addCafedra('КСАИТ', workID))

    # class_ID = getClass(dir_ID, '09-051')
    # cafedra_ID = getCafedraID('КСАИТ', workID)


    # print(addTeacher('Андрианова Анастасия Александровна', cafedra_ID))
    # print(addTeacher('Васильев Александр Валерьевич', cafedra_ID))
    # print(addTeacher('Асхатов Радик Мухаметгалеевич', cafedra_ID))
    # print(addTeacher('Еникеева Разиль Радикович', cafedra_ID))


    # teacher_ID = getTeacherID('Андрианова Анастасия Александровна', cafedra_ID)
    # print(addTeacherClassesDir(teacher_ID, dir_ID, 'Программная инженерия'))
    # print(addTeacherClassesClass(teacher_ID, class_ID, 'Программная инженерия'))
 
    # type_place_ID = getTypePlaceID('practic')
    # week_ID = getWeekID('вторник')
    # print(addPlaceUni(workID, '1010', week_ID, type_place_ID, 40, '8:00', '16:00'))
    # print(addPlaceUni(workID, '1012', week_ID, type_place_ID, 30, '8:00', '16:00'))
    # print(addPlaceUni(workID, '1206', week_ID, type_place_ID, 35, '8:00', '16:00'))
    # print(addPlaceUni(workID, '802', week_ID, type_place_ID, 35, '8:00', '16:00'))

    # grafic_arr = getGrafic(workID)
    # grafic_ID = grafic_arr[0][0]
    # place_ID = 20
    # teach_ID = 3
    
    # # arrs = addScheduleUniDIR(workID, grafic_ID, place_ID, teach_ID, dir_ID, week_ID, '2023-02-13', '2023-05-29')
    # # print(arrs)

    # # print(getSchedule(workID))

    #----------------------------------- школа -----------------------------------

    # # новый пользователь
    # print(insertNewUser('school.shl@yandex.ru', 'wscln4'))
    # user_schoolID = getUser('school.shl@yandex.ru', 'wscln4')
    
    # # добавление нового проекта
    # type_schoolID = getType('школа')
    # print(addProject(user_schoolID, 'Расписание школа 146 1 четверть 2023 год', '2023-08-19', type_schoolID))

    # #настройка расписания
    # work_schoolID = getWorkID('Расписание школа 146 1 четверть 2023 год', user_schoolID)
    # print(addProjectSettingsSchool(1, 45, work_schoolID))
    # times_school = [{'start': '8:30', 'end': '9:15'}, {'start': '9:20', 'end': '10:05'}, {'start': '10:15', 'end': '11:00'}, {'start': '11:30', 'end': '12:15'}, {'start': '12:40', 'end': '13:25'}]
    # for i in range(len(times_school)):
    #     print(addTimesGrafic(times_school[i]['start'], times_school[i]['end'], work_schoolID))

    # grafic_school_arr = getGrafic(work_schoolID)
    # grafic_schoolID = grafic_school_arr[0][0]

    # print(addPlaceSchool(work_schoolID, 'Ибрагимова Лейсан Раисовная', 101))
    # print(addPlaceSchool(work_schoolID, 'Иванов Иван Иванович', 216))
    
    # for i in range(1, 10):
    #     print(addCourses(i, work_schoolID))
    
    # # добавление информации про курсы
    # course_schoolID = getCourseID(8, work_schoolID)
    # print('course',addDirection(course_schoolID, '8'))

    # # добавление информации про направления
    # dir_schoolID = getDirection(course_schoolID, '8')
    # print(addClass(dir_schoolID, 'А', 32))
    # print(addClass(dir_schoolID, 'Б', 32))
    
    # class_schoolID = getClass(dir_schoolID, 'А')
    # print(class_schoolID)

    # # добавление информации про учебный план
    # print(addPlanSchool(class_schoolID, 'Русский язык', 6))
    # print(addPlanSchool(class_schoolID, 'Литература', 7))
    # print(addPlanSchool(class_schoolID, 'Математика', 7))
    # print(addPlanSchool(class_schoolID, 'История', 3))
    # print(addPlanSchool(class_schoolID, 'Обществознание', 2))
    # print(addPlanSchool(class_schoolID, 'Биология', 1))
    # print(addPlanSchool(class_schoolID, 'Физкультура', 3))


    # # добавление информации про кафедры
    # print(addCafedra('Русский язык и литература', work_schoolID))
    # cafedra_schoolID = getCafedraID('Русский язык и литература', work_schoolID)

    # print(addTeacher('Ибрагимова Лейсан Раисовная', cafedra_schoolID))
    # print(addTeacher('Иванов Иван Иванович', cafedra_schoolID))
    # print(addTeacher('Шляпникова Екатерина Сергеевна', cafedra_schoolID))
    # print(addTeacher('Попов Игорь Вячеславович', cafedra_schoolID))

    # teacher_schoolID = getTeacherID('Ибрагимова Лейсан Раисовная', cafedra_schoolID)
    # print(addTeacherClassesClass(teacher_schoolID, class_schoolID, 'Русский язык'))
    # print(addTeacherClassesClass(teacher_schoolID, class_schoolID, 'Литература'))

    # week_ID = getWeekID('вторник')
    # teach_schoolID = getTeacherID('Ибрагимова Лейсан Раисовная', cafedra_schoolID)
    # addScheduleSchool(work_schoolID, grafic_schoolID, teach_schoolID, class_schoolID, week_ID)