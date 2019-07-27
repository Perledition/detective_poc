# DataService
# import pandas as pd
import json
from flask import Flask, jsonify, request, Response
from flask_restful import Resource, Api
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# api = Api(app)


@app.route('/transform', methods=['GET', 'POST'])
def transform():
    data = {'Product': [1, 2, 4]}
    if request.method == 'GET':
        return jsonify(data)
    elif request.method == 'POST':
        # content = request.json['Type']
        resp = Response(request, status=200, mimetype='application/json')
        return resp
    else:
        return jsonify({'Error': 'Method not allowed'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)

