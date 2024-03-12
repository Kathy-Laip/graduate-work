import sqlalchemy
from connection import Connection
from config import Config
from flask import Flask, request
import pymysql
import sqlite3
import json
import re

app = Flask(__name__)
# app = Flask(__name__.split('.')[0])


# table_group = connection.get_data_from_table('select * from id_groups')
# connection.execute_query('insert into timetable.feedback(feedback) values("{}")'.format(report))



@app.route("/", methods=["POST"])
def signInUser():
    info = json.loads(request.get_data())
    text = info['data']
    flag = True
    print(text)
    return json.dumps({'otvet': flag})


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port="5000")