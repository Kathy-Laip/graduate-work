SELECT * FROM schedules.schedule;

SELECT schedules.schedule.sch_id, schedules.schedule.work_id, schedules.grafic.start, schedules.grafic.end, schedules.place.place_name,
 schedules.teacher.fio, schedules.teacher_classes.name_sub, schedules.weeks.week_day, schedules.schedule.start_date, schedules.schedule.end_date
FROM schedules.schedule
INNER JOIN schedules.grafic ON schedules.schedule.grafic_id = schedules.grafic.time_id
INNER JOIN schedules.place ON schedule.place_id = schedules.place.place_id 
INNER JOIN schedules.teacher ON schedule.teacher_id = schedules.teacher.teacher_id
INNER JOIN schedules.teacher_classes ON schedules.teacher.teacher_id = schedules.teacher_classes.id_teacher
INNER JOIN schedules.weeks on schedules.weeks.id_week = schedules.schedule.week_day where schedules.schedule.work_id = 14;