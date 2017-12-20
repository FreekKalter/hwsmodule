from flask import render_template
import onetimepass as otp

from hwsmodule import app


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/otp')
def get_otp():
    return str(otp.get_totp(app.config['OTP_SECRET']))
