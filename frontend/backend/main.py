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

def getUsers():
    users = connection.get_data_from_table('select login, password from users')
    if(users and len(users) > 0):
        return users
    else:
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
    # for i in range(1, 5):
    #     print(addCourses(i, workID))
    times = [{'start': '8:30', 'end': '10:10'}, {'start': '10:20', 'end': '11:50'}, {'start': '12:00', 'end': '13:10'}, {'start': '13:30', 'end': '14:10'}, {'start': '14:30', 'end': '15:10'}]
    for i in range(len(times)):
        print(addTimesGrafic(times[i]['start'], times[i]['end'], workID))
