from flask import render_template
import onetimepass as otp
import json

from hwsmodule import app


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/otp')
def get_otp():
    totp = '{:0>6}'.format(otp.get_totp(app.config['OTP_SECRET']))
    return json.dumps(totp)
