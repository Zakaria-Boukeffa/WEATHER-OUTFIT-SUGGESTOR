from flask import Flask
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
app.config["OPENWEATHER_API_KEY"] = os.getenv("OPENWEATHER_API_KEY")

from routes import *

if __name__ == '__main__':
    app.run(debug=True)
