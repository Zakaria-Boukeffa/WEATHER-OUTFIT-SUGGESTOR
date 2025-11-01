from flask import jsonify
import requests
from app import app

@app.route('/')
def index():
    return '<h1>Hello !</h1>'

@app.route('/weather/<city>')
def get_weather(city):
    API_KEY = app.config["OPENWEATHER_API_KEY"]
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)
