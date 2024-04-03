from config import Config
from flask import Flask, request
from db_requests import *
import json


app = Flask(__name__)
app.config.from_object(Config)

@app.route("/", methods=["POST"])
def signInUser():
    info = json.loads(request.get_data())
    text = info['data']
    flag = True
    print(text)
    return json.dumps({'otvet': flag})

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
    print(userID)
    if(userID):
        schedules = getWorks(userID)
        print(schedules)
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
            print(works_f)
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
    print(info)
    # {'id': 75, 'semester': 1, 
    # 'accHour': 45,
    #  'grafic': [['начало', 'конец'], ['8:30', '10:10'], ['10:10', '11:40'], ['12:10', '13:40'], ['13:50', '15:20'], ['15:50', '17:20'], ['17:30', '19:00'], ['19:10', '20:40']],
    # [['номер аудитории', 'вместимость', 'начало работы', 'конец работы', 'тип аудитории', 'день недели'], ['808', '200', '8:00', '16:00', ' lect', 'понедельник']]
    # 'start': '2024-04-02', 'end': '2024-05-30', 
    #  'courses': [{'courseNumber': 1, 'st': [['наименование', 'номер группы/инициалы', 'количество'], ['ФИИТ 09.02.03 2023', '09-331', '30'], ['ФИИТ 09.02.03 2023', '09-332', '28'], ['ФИИТ 09.02.03 2023', '09-333', '33']]}]}
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
    
    # arr = []
    # # # добавление информации про курсы
    # for i in range(len(courses)):
    #     course_ID = getCourseID(courses[i]["courseNumber"], workID)
    #     for j in range(1, len(courses[i]['st'])):
    #         ans = addDirection(course_ID, courses[i]['st'][j][0])
    #         # dir_ID = getDirection(course_ID, 'ПИ')

    # course_ID = getCourseID(1, workID)
    # # print(addDirection(course_ID, 'ФИИТ'))
    # # print(addDirection(course_ID, 'ПИ'))
    # # print(addDirection(course_ID, 'ПМИ'))
    # # print(addDirection(course_ID, 'ИСТ'))

    # # добавление информации про направления
    # dir_ID = getDirection(course_ID, 'ПИ')
    # # print(addClass(dir_ID, '09-051', 20))
    # # print(addClass(dir_ID, '09-052', 30))


    
    return json.dumps({'otv': 'ok'})


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port="5000")



    # pass
    #----------------------------------- университет -----------------------------------
    # # новый пользователь
    # #print(insertNewUser('ya.shl@yandex.ru', 'kathy_laip123'))
    # userID = getUser('ya.shl@yandex.ru', 'kathy_laip123')

    # # добавление нового проекта
    # typeID = getType('университет')
    # # print(addProject(userID, 'Расписание КФУ ИВМИИТ 2023-2024 2 семестр', '2023-01-19', typeID))

    # #настройка расписания
    # workID = getWorkID('Расписание КФУ ИВМИИТ 2023-2024 2 семестр', userID)
    # # print(addProjectSettings(1,40, '2023-02-09', '2023-05-31', workID))
    # times = [{'start': '8:30', 'end': '10:10'}, {'start': '10:20', 'end': '11:50'}, {'start': '12:00', 'end': '13:10'}, {'start': '13:30', 'end': '14:10'}, {'start': '14:30', 'end': '15:10'}]
    # # for i in range(len(times)):
    # #     print(addTimesGrafic(times[i]['start'], times[i]['end'], workID))
    # # for i in range(1, 3):
    # #     print(addCourses(i, workID))
    
    # # добавление информации про курсы
    # course_ID = getCourseID(1, workID)
    # # print(addDirection(course_ID, 'ФИИТ'))
    # # print(addDirection(course_ID, 'ПИ'))
    # # print(addDirection(course_ID, 'ПМИ'))
    # # print(addDirection(course_ID, 'ИСТ'))

    # # добавление информации про направления
    # dir_ID = getDirection(course_ID, 'ПИ')
    # # print(addClass(dir_ID, '09-051', 20))
    # # print(addClass(dir_ID, '09-052', 30))

    # # добавление информации про учебный план
    # # print(addPlanUni(dir_ID, 'Программная инженерия', "+", "+", 36, 18, 0))
    # # print(addPlanUni(dir_ID, 'Базы данных', "+", "+", 36, 36, 0))
    # # print(addPlanUni(dir_ID, 'Дискретная математика', "+", "+", 36, 18, 0))
    # # print(addPlanUni(dir_ID, 'Анализ сложных систем', "+", "+", 36, 36, 0))
    # # print(addPlanUni(dir_ID, 'Математический анализ', "+", "+", 36, 54, 0))
    # # print(addPlanUni(dir_ID, 'Информационная безопасность', "+", "+", 36, 36, 0))
    # # print(addPlanUni(dir_ID, 'Информационные технологии', "+", "+", 36, 18, 0))

    # # добавление информации про кафедры
    # # print(addCafedra('КСАИТ', workID))

    # class_ID = getClass(dir_ID, '09-051')
    # cafedra_ID = getCafedraID('КСАИТ', workID)


    # # print(addTeacher('Андрианова Анастасия Александровна', cafedra_ID))
    # # print(addTeacher('Васильев Александр Валерьевич', cafedra_ID))
    # # print(addTeacher('Асхатов Радик Мухаметгалеевич', cafedra_ID))
    # # print(addTeacher('Еникеева Разиль Радикович', cafedra_ID))


    # teacher_ID = getTeacherID('Андрианова Анастасия Александровна', cafedra_ID)
    # # print(addTeacherClassesDir(teacher_ID, dir_ID, 'Программная инженерия'))
    # # print(addTeacherClassesClass(teacher_ID, class_ID, 'Программная инженерия'))
 
    # type_place_ID = getTypePlaceID('practic')
    # week_ID = getWeekID('вторник')
    # # print(addPlaceUni(workID, '1010', week_ID, type_place_ID, 40, '8:00', '16:00'))
    # # print(addPlaceUni(workID, '1012', week_ID, type_place_ID, 30, '8:00', '16:00'))
    # # print(addPlaceUni(workID, '1206', week_ID, type_place_ID, 35, '8:00', '16:00'))
    # # print(addPlaceUni(workID, '802', week_ID, type_place_ID, 35, '8:00', '16:00'))

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

