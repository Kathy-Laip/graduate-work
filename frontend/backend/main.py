import sqlalchemy
from connection import Connection
from config import Config
from flask import Flask, request
import pymysql
import sqlite3
import json
import re

app = Flask(__name__)
app.config.from_object(Config)
my_db = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)
connection = Connection(my_db)

# table_group = connection.get_data_from_table('select * from id_groups')
# connection.execute_query('insert into timetable.feedback(feedback) values("{}")'.format(report))

def cleanDB(nameDB):
    ans = connection.execute_query('delete from {}'.format(nameDB))
    return ans


def getType(type):
    try:
        id_type = connection.get_data_from_table('select type_id from type where name_type="{}"'.format(type))
        if id_type is not None:
            return id_type[0][0]
    except:
        return False

def getUser(login,passowrd):
    try:
        id_user = connection.get_data_from_table('select user_id from users where login="{}" and password="{}"'.format(login, passowrd))
        if(id_user is not None):
            return id_user[0][0]
    except:
        return False

def getWorkID(theme, userID):
    try:
        id_work = connection.get_data_from_table('select work_id from work_folder where theme="{}" and user_id={} '.format(theme, userID))
        if(id_work is not None):
            return id_work[0][0]
    except:
        return False

def getType(type):
    try:
        id_type = connection.get_data_from_table('select type_id from type where name_type="{}"'.format(type))
        if(id_type is not None):
            return id_type[0][0]
    except:
        return False

def getUsers():
    users = connection.get_data_from_table('select login, password from users')
    if(users and len(users) > 0):
        return users
    else:
        return False

def getCourseID(course_number, workID):
    try:
        id_course = connection.get_data_from_table('select course_id from courses where course_number="{}" and work_id={} '.format(course_number, workID))
        if(id_course is not None):
            return id_course[0][0]
    except:
        return False

def getDirection(courseID, name):
    try:
        id_dir = connection.get_data_from_table('select direction_id from direction where course_id={} and name_course="{}"'.format(courseID, name))
        if(id_dir is not None):
            return id_dir[0][0]
    except:
        return False

def getClass(directionID, initial_class):
    try:
        id_class = connection.get_data_from_table('select classes_id from classes where direction_id={} and initial_class="{}"'.format(directionID, initial_class))
        if(id_class is not None):
            return id_class[0][0]
    except:
        return False

def getCafedraID(name, workID):
    try: 
        cafedra_id = connection.get_data_from_table('select id_caf_sec from cafedra_or_section where name="{}" and work_id={}'.format(name, workID))
        if(cafedra_id is not None):
            return cafedra_id[0][0]
    except:
        return False

def getTeacherID(fio, cafedraID):
    try: 
        teacher_id = connection.get_data_from_table('select teacher_id from teacher where fio="{}" and name_cafedra_or_napr={}'.format(fio, cafedraID))
        if(teacher_id is not None):
            return teacher_id[0][0]
    except:
        return False

def getWeekID(week):
    try: 
        week_ID = connection.get_data_from_table('select id_week from weeks where week_day="{}"'.format(week))
        if(week_ID is not None):
            return week_ID[0][0]
    except:
        return False

def getTypePlaceID(place):
    try: 
        type_placeID = connection.get_data_from_table('select id_type_place from type_place where type_pl="{}"'.format(place))
        if(type_placeID is not None):
            return type_placeID[0][0]
    except:
        return False


def insertNewUser(login, password):
    ans = connection.execute_query('insert into users(login, password) values("{}", "{}")'.format(login, password))
    return ans

def addProject(userID, theme, date, typeID):
    ans = connection.execute_query('insert into work_folder(user_id, theme, date, type_institue) values({}, "{}", "{}", {})'.format(userID, theme, date, typeID))
    return ans

def addProjectSettings(period, acc_hour, start, end, workID):
    ans = connection.execute_query('update work_folder set period={}, start_time="{}", end_time="{}", acc_hour={} where work_id={}'.format(period, start, end, acc_hour, workID))
    return ans

def addCourses(courseNumber, workID):
    ans = connection.execute_query('insert into courses(course_number, work_id) values({}, {})'.format(courseNumber, workID))
    return ans

def addTimesGrafic(start, end, workID):
    ans = connection.execute_query('insert into grafic(start, end, sch_id) values("{}", "{}", {})'.format(start, end, workID))
    return ans

def addCourse(number_course, workID):
    ans = connection.execute_query('insert into courses(course_number, work_id) values({}, {})'.format(number_course, workID))
    return ans

def addDirection(courseID, name_direction):
    ans = connection.execute_query('insert into direction(course_id, name_course) values({}, "{}")'.format(courseID, name_direction))
    return ans

def addClass(directionID, initial_class, count):
    ans = connection.execute_query('insert into classes(direction_id, initial_class, count) values({}, "{}", {})'.format(directionID, initial_class, count))
    return ans

def addPlanUni(directionID, name_sub, exam, min_exam, lect, practic, lab):
    ans = connection.execute_query('insert into plan_direction(direction_id, name_sub, exam, min_exam, lect, lab, practic) values({}, "{}", "{}", "{}", {}, {}, {})'.format(directionID, name_sub, exam, min_exam, lect, lab, practic))
    return ans

def addCafedra(name, workID):
    ans = connection.execute_query('insert into cafedra_or_section(name, work_id) values("{}", {})'.format(name, workID))
    return ans

def addTeacher(fio, name_cafedra):
    ans = connection.execute_query('insert into teacher(fio, name_cafedra_or_napr) values("{}", {})'.format(fio, name_cafedra))
    return ans

def addTeacherClassesDir(teacherID, dir_ID, name_sub):
    ans = connection.execute_query('insert into teacher_classes(id_teacher, direction_id, name_sub) values({}, {}, "{}")'.format(teacherID, dir_ID, name_sub))
    return ans

def addTeacherClassesClass(teacherID, class_ID, name_sub):
    ans = connection.execute_query('insert into teacher_classes(id_teacher, classes_id, name_sub) values({}, {}, "{}")'.format(teacherID, class_ID, name_sub))
    return ans

def addPlaceUni(workID, place_name, weekID, typeID, count_seat, start, end):
    ans = connection.execute_query('insert into place(work_id, place_name, week_day, type_place, count_seat, start_work, end_work) values({}, "{}", {}, {}, {}, "{}", "{}")'.format(workID, place_name, weekID, typeID, count_seat, start, end))
    return ans

@app.route("/", methods=["POST"])
def signInUser():
    info = json.loads(request.get_data())
    text = info['data']
    flag = True
    print(text)
    return json.dumps({'otvet': flag})


if __name__ == '__main__':
    # app.run(debug=True, host="127.0.0.1", port="5000")

    # print(insertNewUser('yaKatya', '123regopi'))
    userID = getUser('yaKatya', '123regopi')
    # typeID = getType('университет')
    # print(addProject(userID, 'Расписание КФУ ИВМИИТ 2023-2024 1 семестр', '2023-03-19', typeID))
    workID = getWorkID('Расписание КФУ ИВМИИТ 2023-2024 1 семестр', userID)
    # print(workID)
    # print(addProjectSettings(1,40, '2023-02-09', '2023-05-31', workID))
    # times = [{'start': '8:30', 'end': '10:10'}, {'start': '10:20', 'end': '11:50'}, {'start': '12:00', 'end': '13:10'}, {'start': '13:30', 'end': '14:10'}, {'start': '14:30', 'end': '15:10'}]
    # for i in range(len(times)):
    #     print(addTimesGrafic(times[i]['start'], times[i]['end'], workID))
    # for i in range(1, 5):
    #     print(addCourses(i, workID))
    # print(addCourse(1, workID))
    course_ID = getCourseID(1, workID)
    # print(course_ID)
    # print(addDirection(course_ID, 'ФИИТ'))
    dir_ID = getDirection(course_ID, 'ФИИТ')
    class_ID = getClass(dir_ID, '09-041')
    # print(dir_ID)
    # print(addClass(dir_ID, '09-041', 18))
    # print(addClass(dir_ID, '09-042', 12))
    # print(addPlanUni(dir_ID, 'алгебра и геометрия', "+", "+", 36, 54, 0))
    # print(addCafedra('КСАИТ', workID))
    cafedra_ID = getCafedraID('КСАИТ', workID)
    # print(addTeacher('Андрианова Анастасия Александровна', cafedra_ID))
    teacher_ID = getTeacherID('Андрианова Анастасия Александровна', cafedra_ID)
    # print(addTeacherClassesDir(teacher_ID, dir_ID, 'Программная инженерия'))
    # print(class_ID)
    # print(addTeacherClassesClass(teacher_ID, class_ID, 'Программная инженерия'))
    type_place_ID = getTypePlaceID('practic')
    week_ID = getWeekID('понедельник')
    print(type_place_ID, week_ID, workID)
    print(addPlaceUni(workID, '808', week_ID, type_place_ID, 30, '8:00', '16:00'))