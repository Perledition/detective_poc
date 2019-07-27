# DataService
# import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/transform', methods=['GET', 'POST'])
def transform():
    data = {'Product': [1, 2, 4]}
    if request.method == 'GET':
        return jsonify(data)

    elif request.method == 'POST':
        data['Product-name'] = ['Franz', 'Meyer', 'Bauer']
        return jsonify(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)

