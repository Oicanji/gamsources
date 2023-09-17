from flask import render_template
from config import BASE_PORT, BASE_URL

from config import API_ONLY_MODE


def render(template: str, data: dict = {}):
    if(API_ONLY_MODE == 'true'):
        return render_template('api.html')
    
    data = {**data, **{'BASE_URL': BASE_URL, 'BASE_PORT': BASE_PORT}}
    return render_template(template, data=data)