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


if __name__ == '__main__':
    # app.run(debug=True, host="127.0.0.1", port="5000")
    pass
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

