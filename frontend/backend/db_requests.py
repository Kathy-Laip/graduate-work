import sqlalchemy
from connection import Connection
from config import Config

my_db = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)
connection = Connection(my_db)

# table_group = connection.get_data_from_table('select * from id_groups')
# connection.execute_query('insert into timetable.feedback(feedback) values("{}")'.format(report))


# ans = connection.execute_query('update work_folder set period={}, start_time="{}", end_time="{}", acc_hour={} where work_id={}'.format(period, start, end, acc_hour, workID))

def insertLect(work_id, grafic_id, place_id, teacher_id, dir_id, week_day, name, period):
    ans = connection.execute_query('insert into schedules.schedule(work_id, grafic_id, place_id, teacher_id, direction_id, week_day, name_sub, period) values({}, {}, {}, {}, {},{}, "{}", "{}");'.format(work_id, grafic_id, place_id, teacher_id, dir_id,week_day, name, period))
    return ans

def insertPrOrLab(work_id, grafic_id, place_id, teacher_id, dir_id, class_id, week_day, name, period):
    ans = connection.execute_query('insert into schedules.schedule(work_id, grafic_id, place_id, teacher_id, direction_id, classes_id, week_day, name_sub, period) values({}, {}, {}, {}, {},{}, {}, "{}", "{}");'.format(work_id, grafic_id, place_id, teacher_id, dir_id, class_id,week_day, name, period))
    return ans

def insertExamOrMinExam(work_id, grafic_id, place_id, teacher_id, dir_id, class_id, week_day, start_date, name, period):
    ans = connection.execute_query('insert into schedules.schedule(work_id, grafic_id, place_id, teacher_id, direction_id, classes_id, week_day, start_date, name_sub, period) values({}, {}, {}, {}, {},{}, {}, "{}", "{}", "{}");'.format(work_id, grafic_id, place_id, teacher_id, dir_id, class_id,week_day, start_date, name, period))
    return ans

def insertLessSchool(work_id, grafic_id, place_id, teacher_id, dir_id, class_id, week_day, name, period):
    ans = connection.execute_query('insert into schedules.schedule(work_id, grafic_id, place_id, teacher_id, direction_id, classes_id, week_day, name_sub, period) values({}, {}, {}, {}, {},{}, {}, "{}", "{}");'.format(work_id, grafic_id, place_id, teacher_id, dir_id, class_id,week_day, name, period))
    return ans

def deleteUniLess(id):
    ans = connection.execute_query('delete from schedules.schedule where sch_id={}'.format(id))
    return ans

def getTeachId(name):
    try: 
        ans = connection.get_data_from_table('select schedules.teacher.teacher_id from schedules.teacher where schedules.teacher.fio = "{}"'.format(name))
        if(ans is not None):
            return ans[0][0]
    except: return []

def updateTheme(theme, workID, userID):
    ans = connection.execute_query('update work_folder set theme="{}" where work_id={} and user_id={}'.format(theme, workID, userID))
    return ans

def updateType(type, workID, userID):
    ans = connection.execute_query('update work_folder set type_institue={} where work_id={} and user_id={}'.format(type, workID, userID))
    return ans

def updateAll(theme, type, workID, userID):
    ans = connection.execute_query('update work_folder set theme="{}", type_institue={} where work_id={} and user_id={}'.format(theme, type, workID, userID))
    return ans

def cleanDB(nameDB):
    ans = connection.execute_query('delete from {}'.format(nameDB))
    return ans

def deleteWorkID(userID, workID):
    ans = connection.execute_query('delete from work_folder where work_id={} and user_id={}'.format(workID, userID))
    return ans

def deleteWorkPlan(direction_id):
    ans = connection.execute_query('delete from plan_direction where direction_id={}'.format(direction_id))
    return ans

def deleteWorkPlanSchool(class_id):
    ans = connection.execute_query('delete from plan_direction where class_id={}'.format(class_id))
    return ans

def deleteSCH(work_id):
    ans = connection.execute_query('delete from schedules.schedule where work_id={}'.format(work_id))
    return ans

def deleteGrafic(work_id):
    ans = connection.execute_query('delete from schedules.grafic where sch_id={}'.format(work_id))
    return ans

def deletePlace(work_id):
    ans = connection.execute_query('delete from schedules.place where work_id={}'.format(work_id))
    return ans

def deleteCourses(work_id):
    ans = connection.execute_query('delete from schedules.courses where work_id={}'.format(work_id))
    return ans

def deleteCafedra(work_ID, nameCafedra):
    ans = connection.execute_query('delete from schedules.cafedra_or_section where work_id={} and name="{}"'.format(work_ID, nameCafedra))
    return ans

def checkTheme(user, theme):
    try: 
        data = connection.get_data_from_table('select schedules.work_folder.theme from schedules.work_folder where schedules.work_folder.theme = "{}" and schedules.work_folder.user_id={};'.format(theme, user))
        if(data is not None):
            return data
    except: return []

def getDataUser(login):
    try: 
        data = connection.get_data_from_table('select password from users where login="{}"'.format(login))
        if(data is not None):
            return data
    except:
        return False

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

def getTeacher(id):
    try:
        teach = connection.get_data_from_table('select schedules.teacher.fio from schedules.teacher where schedules.teacher.teacher_id = {};'.format(id))
        if(teach is not None):
            return teach[0]
    except: return []

def getWorks(userID):
    try:
        works = connection.get_data_from_table('select schedules.work_folder.work_id, schedules.work_folder.theme, schedules.work_folder.date, schedules.type.name_type from schedules.work_folder inner join schedules.type on schedules.work_folder.type_institue = schedules.type.type_id where user_id = {};'.format(userID))
        if(works is not None):
            return works
    except:
        return False

def settingsWork(workID):
    try: 
        worksSet = connection.get_data_from_table('select schedules.work_folder.period, schedules.work_folder.acc_hour, schedules.work_folder.start_time, schedules.work_folder.end_time from schedules.work_folder where work_id = {};'.format(workID))
        if(worksSet[0][0] is not None):
            return worksSet[0]
    except: return False

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

def getDirIdNameCourse(name_course, work_id):
    try: 
        data = connection.get_data_from_table('select schedules.direction.direction_id from schedules.direction inner join schedules.courses on schedules.direction.course_id = schedules.courses.course_id where schedules.courses.work_id = {} and schedules.direction.name_course = {};'.format(work_id, name_course))
        if(data is not None):
            return data[0]
    except: return []

def getCourseCount(workID):
    try:
        id_course = connection.get_data_from_table('select course_id from courses where work_id={} '.format(workID))
        if(id_course is not None):
            return id_course
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

def getClasses(directionID):
    try:
        id_class = connection.get_data_from_table('select sum(count) from classes where direction_id={}'.format(directionID))
        if(id_class is not None):
            return id_class
    except:
        return False

def getClasseCount(directionID, initial_class):
    try:
        id_class = connection.get_data_from_table('select count from classes where direction_id={} and initial_class = {}'.format(directionID, initial_class))
        if(id_class is not None):
            return id_class[0][0]
    except:
        return False

def getCoursesClasses(work_ID):
    try:
        courses = connection.get_data_from_table('select schedules.courses.course_number, schedules.direction.name_course, schedules.classes.initial_class, schedules.classes.count from schedules.classes inner join schedules.direction on schedules.classes.direction_id = schedules.direction.direction_id inner join schedules.courses on schedules.direction.course_id = schedules.courses.course_id where schedules.courses.work_id = {};'.format(work_ID))
        if(courses is not None):
            return courses
    except: 
        return False

def getDataCourseDirs(work_ID):
    try:
        courses = connection.get_data_from_table('select schedules.courses.course_number, schedules.direction.direction_id, schedules.direction.name_course from schedules.courses inner join schedules.direction on schedules.courses.course_id = schedules.direction.course_id where work_id = {};'.format(work_ID))
        if(courses is not None):
            return courses
    except:
        return False

def getCafedraID(name, workID):
    try: 
        cafedra_id = connection.get_data_from_table('select id_caf_sec from cafedra_or_section where name="{}" and work_id={}'.format(name, workID))
        if(cafedra_id is not None):
            return cafedra_id[0][0]
    except:
        return False

def getCafedras(workID):
    try: 
        cafedra_id = connection.get_data_from_table('select schedules.cafedra_or_section.name from cafedra_or_section where work_id={}'.format(workID))
        if(cafedra_id is not None):
            return cafedra_id
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

def getWeeks():
    try:
        weeks = connection.get_data_from_table('select id_week, week_day from weeks')
        if(weeks is not None):
            return weeks
    except: return False

def getTypePlaceID(place):
    try: 
        type_placeID = connection.get_data_from_table('select id_type_place from type_place where type_pl="{}"'.format(place))
        if(type_placeID is not None):
            return type_placeID[0][0]
    except:
        return False

def getGrafic(workID):
    try: 
        graifc_mas = connection.get_data_from_table('select time_id, start, end from grafic where sch_id={}'.format(workID))
        if(graifc_mas is not None):
            return graifc_mas
    except:
        return False

def getPlaces(work_id, type, count_seat):
    try: 
        audit = connection.get_data_from_table('select schedules.place.place_id, schedules.place.place_name, schedules.weeks.week_day, schedules.place.type_place, schedules.place.count_seat, schedules.place.start_work, schedules.place.end_work from schedules.place inner join schedules.weeks on schedules.weeks.id_week = schedules.place.week_day where schedules.place.work_id={} and schedules.place.type_place={} and schedules.place.count_seat >= {};'.format(work_id, type, count_seat))
        if(audit is not None):
            return audit
    except:
        return False

def getPlacesExam(work_id, count_seat):
    try: 
        audit = connection.get_data_from_table('select schedules.place.place_id, schedules.place.place_name, schedules.weeks.week_day, schedules.place.type_place, schedules.place.count_seat, schedules.place.start_work, schedules.place.end_work from schedules.place inner join schedules.weeks on schedules.weeks.id_week = schedules.place.week_day where schedules.place.work_id={} and schedules.place.count_seat >= {};'.format(work_id, count_seat))
        if(audit is not None):
            return audit
    except:
        return False

def getScheUniDir(workID, dirID):
    try:
        schedules = connection.get_data_from_table('SELECT 	DISTINCT schedules.schedule.sch_id, schedules.schedule.work_id, schedules.grafic.start, schedules.grafic.end, schedules.place.place_name, schedules.teacher.fio, schedules.schedule.name_sub, schedules.weeks.week_day, schedules.schedule.start_date, schedules.schedule.period, schedules.type_place.type_pl, schedules.direction.name_course, schedules.classes.initial_class FROM schedules.schedule INNER JOIN schedules.grafic ON schedules.schedule.grafic_id = schedules.grafic.time_id INNER JOIN schedules.place ON schedule.place_id = schedules.place.place_id INNER JOIN schedules.type_place ON schedules.place.type_place = schedules.type_place.id_type_place LEFT JOIN schedules.direction ON schedules.schedule.direction_id = schedules.direction.direction_id LEFT JOIN schedules.classes ON schedules.schedule.classes_id = schedules.classes.classes_id INNER JOIN schedules.teacher ON schedule.teacher_id = schedules.teacher.teacher_id INNER JOIN schedules.teacher_classes ON schedules.teacher.teacher_id = schedules.teacher_classes.id_teacher INNER JOIN schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id = {} and schedules.schedule.direction_id = {};'.format(workID, dirID))
        if(schedules is not None):
            return schedules
    except: 
        return []

def getScheSchoolDir(workID, dirID):
    try:
        schedules = connection.get_data_from_table('SELECT 	DISTINCT schedules.schedule.sch_id, schedules.schedule.work_id, schedules.grafic.start, schedules.grafic.end, schedules.place.place_name, schedules.teacher.fio, schedules.schedule.name_sub, schedules.weeks.week_day, schedules.schedule.start_date, schedules.schedule.period, schedules.direction.name_course, schedules.classes.initial_class FROM schedules.schedule INNER JOIN schedules.grafic ON schedules.schedule.grafic_id = schedules.grafic.time_id INNER JOIN schedules.place ON schedule.place_id = schedules.place.place_id LEFT JOIN schedules.direction ON schedules.schedule.direction_id = schedules.direction.direction_id LEFT JOIN schedules.classes ON schedules.schedule.classes_id = schedules.classes.classes_id INNER JOIN schedules.teacher ON schedule.teacher_id = schedules.teacher.teacher_id INNER JOIN schedules.teacher_classes ON schedules.teacher.teacher_id = schedules.teacher_classes.id_teacher INNER JOIN schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id = {} and schedules.schedule.direction_id = {};'.format(workID, dirID))
        if(schedules is not None):
            return schedules
    except: 
        return []

def getScheduleSchool(workID):
    try:
        schedules = connection.get_data_from_table('SELECT schedules.schedule.sch_id, schedules.schedule.work_id, schedules.grafic.start, schedules.grafic.end, schedules.place.place_name, schedules.teacher.fio, schedules.teacher_classes.name_sub, schedules.weeks.week_day, schedules.schedule.start_date FROM schedules.schedule INNER JOIN schedules.grafic ON schedules.schedule.grafic_id = schedules.grafic.time_id INNER JOIN schedules.place ON schedule.place_id = schedules.place.place_id INNER JOIN schedules.teacher ON schedule.teacher_id = schedules.teacher.teacher_id INNER JOIN schedules.teacher_classes ON schedules.teacher.teacher_id = schedules.teacher_classes.id_teacher INNER JOIN schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id = {};'.format(workID))
        if(schedules is not None):
            return schedules
    except: 
        return False

def getPlans(direction_id):
    try:
        plans = connection.get_data_from_table('select schedules.plan_direction.sub_id from schedules.plan_direction where direction_id={}'.format(direction_id))
        if(plans is not None):
            return plans
    except: return False

def getPlansSchool(class_id):
    try:
        plans = connection.get_data_from_table('select schedules.plan_direction.sub_id from schedules.plan_direction where class_id={}'.format(class_id))
        if(plans is not None):
            return plans
    except: return False

def getPlanDir(dir_id):
    try: 
        plan_sub = connection.get_data_from_table('select schedules.plan_direction.name_sub from schedules.plan_direction where schedules.plan_direction.direction_id = {};'.format(dir_id))
        if(plan_sub is not None):
            return plan_sub
    except: return []

def getPlanSchoolDir(dir_id):
    try: 
        plan = connection.get_data_from_table('select schedules.classes.initial_class, schedules.plan_direction.name_sub from schedules.plan_direction  inner join schedules.classes on schedules.plan_direction.class_id = schedules.classes.classes_id where schedules.classes.direction_id = {};'.format(dir_id))
        if(plan is not None):
            return plan
    except: return []
    
def getSubjLect(dir_id, sub):
    try: 
        subj = connection.get_data_from_table('select schedules.plan_direction.name_sub, schedules.plan_direction.lect from schedules.plan_direction where schedules.plan_direction.direction_id = {} and schedules.plan_direction.name_sub="{}";'.format(dir_id, sub))
        if(subj is not None):
            return subj
    except: return False   

def getSubjPractic(dir_id, sub):
    try: 
        subj = connection.get_data_from_table('select schedules.plan_direction.name_sub, schedules.plan_direction.practic from schedules.plan_direction where schedules.plan_direction.direction_id = {} and schedules.plan_direction.name_sub="{}";'.format(dir_id, sub))
        if(subj is not None):
            return subj
    except: return False   

def getSubjLab(dir_id, sub):
    try: 
        subj = connection.get_data_from_table('select schedules.plan_direction.name_sub, schedules.plan_direction.lab from schedules.plan_direction where schedules.plan_direction.direction_id = {} and schedules.plan_direction.name_sub="{}";'.format(dir_id, sub))
        if(subj is not None):
            return subj
    except: return False  

def getTeach(dir_id, sub):
    try:
        teach_id = connection.get_data_from_table('select schedules.teacher_classes.id_teacher from schedules.teacher_classes where schedules.teacher_classes.name_sub = "{}" and schedules.teacher_classes.direction_id = {};'.format(sub, dir_id)) 
        if(teach_id is not None):
            return teach_id
    except: return False

def getTeachClass(class_id, sub):
    try:
        teach_id = connection.get_data_from_table('select schedules.teacher_classes.id_teacher from schedules.teacher_classes where schedules.teacher_classes.name_sub = "{}" and schedules.teacher_classes.classes_id = {};'.format(sub, class_id)) 
        if(teach_id is not None):
            return teach_id
    except: return False

def getTeachsAndPractic(class_id, name_sub):
    try: 
        data = connection.get_data_from_table('select schedules.teacher_classes.id_teacher, schedules.teacher_classes.classes_id from schedules.teacher_classes where schedules.teacher_classes.classes_id = {} and schedules.teacher_classes.name_sub = "{}";'.format(class_id, name_sub))
        if(data is not None):
            return data[0]
    except: return []

def getDataInfo(work_id):
    try:
        data = connection.get_data_from_table('select schedules.work_folder.start_time, schedules.work_folder.end_time, schedules.work_folder.acc_hour from schedules.work_folder where schedules.work_folder.work_id = {};'.format(work_id))
        if(data is not None):
            return data
    except: return False

def getHasLesson(class_id, sub, work_id):
    try:
        data = connection.get_data_from_table('select schedules.schedule.sch_id from schedules.schedule where schedules.schedule.name_sub = "{}" and schedules.schedule.direction_id = {} and schedules.schedule.work_id={};'.format(sub, class_id, work_id))
        if(data is not None):
            return data
    except: return False

def getHasLessonGroup(dir_id, sub, work_id):
    try:
        data = connection.get_data_from_table('select schedules.schedule.sch_id from schedules.schedule where schedules.schedule.name_sub = "{}" and schedules.schedule.classes_id = {} and schedules.schedule.work_id={};'.format(sub, dir_id, work_id))
        if(data is not None):
            return data
    except: return []

def getSch(work_id):
    try:
        data = connection.get_data_from_table('select schedules.schedule.grafic_id, schedules.schedule.place_id, schedules.weeks.week_day, schedules.schedule.period from schedules.schedule inner join schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id={};'.format(work_id))
        if(data is not None):
            return data
    except: return False

def getSchDate(work_id):
    try:
        data = connection.get_data_from_table('select schedules.schedule.grafic_id, schedules.schedule.place_id, schedules.weeks.week_day, schedules.schedule.period, schedules.schedule.start_date from schedules.schedule inner join schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id={};'.format(work_id))
        if(data is not None):
            return data
    except: return []

def getSchClass(work_id, class_id):
    try:
        data = connection.get_data_from_table('select schedules.schedule.grafic_id, schedules.schedule.place_id, schedules.weeks.week_day, schedules.schedule.period, schedules.schedule.start_date from schedules.schedule inner join schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id={} and schedules.schedule.classes_id={};'.format(work_id, class_id))
        if(data is not None):
            return data
    except: return []

def getSchClassSchool(work_id, class_id):
    try:
        data = connection.get_data_from_table('select schedules.schedule.grafic_id, schedules.schedule.place_id, schedules.weeks.week_day from schedules.schedule inner join schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id={} and schedules.schedule.classes_id={};'.format(work_id, class_id))
        if(data is not None):
            return data
    except: return []

def getSchTeacherSchool(work_id, teacher_id):
    try:
        data = connection.get_data_from_table('select schedules.schedule.grafic_id, schedules.schedule.place_id, schedules.weeks.week_day from schedules.schedule inner join schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id={} and schedules.schedule.teacher_id={};'.format(work_id, teacher_id))
        if(data is not None):
            return data
    except: return []

def getSchDir(work_id, dir_id):
    try:
        data = connection.get_data_from_table('select schedules.schedule.grafic_id, schedules.schedule.place_id, schedules.weeks.week_day, schedules.schedule.period  from schedules.schedule inner join schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id = {} and schedules.schedule.direction_id = {};'.format(work_id, dir_id))
        if(data is not None):
            return data
    except: return False 

def getExamSub(dir_id, sub):
    try: 
        data = connection.get_data_from_table('select schedules.plan_direction.exam from schedules.plan_direction where schedules.plan_direction.direction_id = {} and schedules.plan_direction.name_sub = "{}" ;'.format(dir_id, sub))
        if(data is not None):
            return data[0]
    except: return []

def getMinExamSub(dir_id, sub):
    try: 
        data = connection.get_data_from_table('select schedules.plan_direction.min_exam from schedules.plan_direction where schedules.plan_direction.direction_id = {} and schedules.plan_direction.name_sub = "{}" ;'.format(dir_id, sub))
        if(data is not None):
            return data[0]
    except: return []


def getSubjectSchool(class_id, name_sub):
    try:
        data = connection.get_data_from_table('select schedules.plan_direction.name_sub, schedules.plan_direction.academ_count_classes from schedules.plan_direction where schedules.plan_direction.class_id = {} and schedules.plan_direction.name_sub = "{}";'.format(class_id, name_sub))
        if(data is not None):
            return data
    except: return []

def getTeacherSchool(classes_id, name_sub):
    try:
        data = connection.get_data_from_table('select schedules.teacher_classes.id_teacher from schedules.teacher_classes where schedules.teacher_classes.classes_id = {} and schedules.teacher_classes.name_sub = "{}";'.format(classes_id, name_sub))
        if(data is not None):
            return data[0]
    except: return []

def getTeacherName(teacher_id):
    try: 
        data = connection.get_data_from_table('select schedules.teacher.fio from schedules.teacher where schedules.teacher.teacher_id = {};'.format(teacher_id))
        if(data is not None):
            return data[0]
    except: return []

def getPlaceTeacher(fio_teach):
    try:
        data = connection.get_data_from_table('select schedules.place.place_id, schedules.place.place_name from schedules.place where schedules.place.fio_teacher = "{}"'.format(fio_teach))
        if(data is not None):
            return data[0]
    except: return []



def insertNewUser(login, password):
    ans = connection.execute_query('insert into users(login, password) values("{}", "{}")'.format(login, password))
    return ans

def addProject(userID, theme, date, typeID):
    ans = connection.execute_query('insert into work_folder(user_id, theme, date, type_institue) values({}, "{}", "{}", {})'.format(userID, theme, date, typeID))
    return ans

def addProjectSettings(period, acc_hour, start, end, workID):
    ans = connection.execute_query('update work_folder set period={}, start_time="{}", end_time="{}", acc_hour={} where work_id={}'.format(period, start, end, acc_hour, workID))
    return ans

def addProjectSettingsSchool(period, acc_hour, start, end, workID):
    ans = connection.execute_query('update work_folder set period={}, acc_hour={}, start_time="{}", end_time="{}" where work_id={}'.format(period, acc_hour, start, end, workID))
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

def addPlanSchool(class_ID, name_sub, academ_count_classes):
    ans = connection.execute_query('insert into plan_direction(class_ID, name_sub, academ_count_classes) values({}, "{}", {})'.format(class_ID, name_sub, academ_count_classes))
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

def addPlaceSchool(workID, fio_teacher, place_name):
    ans = connection.execute_query('insert into place(work_id, fio_teacher, place_name) values({}, "{}", "{}")'.format(workID, fio_teacher, place_name))
    return ans

def addScheduleUniDIR(workID, graficID, placeID, teacherID, directionID, week_day, start, end):
    ans = connection.execute_query('insert into schedule(work_id, grafic_id, place_id, teacher_id, direction_id, week_day, start_date, end_date) values({}, {}, {}, {}, {}, {}, "{}", "{}")'.format(workID, graficID, placeID, teacherID, directionID, week_day, start, end))
    return ans

def addScheduleSchool(workID, graficID, teacherID, class_ID, week_day):
    ans = connection.execute_query('insert into schedule(work_id, grafic_id, teacher_id, classes_id, week_day) values({}, {}, {}, {}, {})'.format(workID, graficID, teacherID, class_ID, week_day))
    return ans