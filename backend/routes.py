from flask import jsonify
import requests
from app import app
from datetime import datetime, timedelta

@app.route('/')
def index():
    return '<h1>Hello !</h1>'

@app.route('/weather/<city>')
def get_weather(city):
    API_KEY = app.config["OPENWEATHER_API_KEY"]
    url = f'https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    data = response.json()

    today = datetime.now().date()
    tomorrow = today + timedelta(days=1)
    after = today + timedelta(days=2)

    filtered = {
        "city": data["city"]["name"],
        "forecast": {
            "today": [],
            "tomorrow": [],
            "after": []
        }
    }

    for entry in data["list"]:
        entry_date = entry["dt_txt"].split(" ")[0]

        if entry_date == str(today):
            filtered["forecast"]["today"].append(entry)

        elif entry_date == str(tomorrow):
            filtered["forecast"]["tomorrow"].append(entry)

        elif entry_date == str(after):
            filtered["forecast"]["after"].append(entry)


    return jsonify(filtered)

