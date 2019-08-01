# DataService
import ast
import pandas as pd
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

        ctf = request.get_json()
        data = ctf['dataset']

        # data['name'] = ['Franz', 'Meyer', 'Bauer']
        df = pd.DataFrame(data)
        df = df[list(ctf['columns'])]

        return jsonify(df.to_dict())
        # return jsonify(ctf)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)

