from flask import Flask, request
import json
from application import Application

app = Flask(__name__)
# app = Flask(__name__.split('.')[0])

@app.route("/", methods=["POST"])
def signInUser():
    info = json.loads(request.get_data())
    text = info['data']
    flag = True
    print(text)
    return json.dumps({'otvet': flag})


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port="5000")