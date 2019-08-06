# DataService
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/ColumnFilter', methods=['GET', 'POST'])
def column_filter():
    data = {'Product': [1, 2, 4]}
    if request.method == 'GET':
        return jsonify(data)

    elif request.method == 'POST':

        ctf = request.get_json()
        data = ctf['dataset']

        # load the data delivered by post into a pandas data frame and filter for selected columns
        df = pd.DataFrame(data)
        df = df[list(ctf['columns'])]

        return jsonify(df.to_dict())


@app.route('/DataConverter', methods=['POST'])
def data_convert():

    if request.method == 'POST':

        data = request.get_json()
        data = data['data_set']

        # for each index in the data get the dict and create a list of dicts
        dlist = [dic for dic in data]

        # create a new dict in which the values get remapped and one key holds a list of all values
        new_data = {}

        # get the first dict and loop trough all the dicts to map the values
        for key in dlist[0].keys():
            new_data[key] = list(row[key] for row in dlist)

        # return the new data configuration as a json object
        return jsonify(new_data)


@app.route('/RowFilter', methods=['POST'])
def row_filter():
    if request.method == 'POST':

        # get all filter combinations
        filter_set = request.get_json()

        # output e.g. ("index", ">", 5) this is needed to create dynamic filters in the next step
        filter_set = list(zip(filter_set['columns'], filter_set['relationship'], filter_set['value']))

        # create a query string for each pair in filter set
        query = ' & '.join([f'({pair[0]}{pair[1]}{pair[2]})' for pair in filter_set])

        # get the data set we want to filter, apply the query string and return the data set as json format
        df = pd.DataFrame(filter_set['dataset'])
        return jsonify(df.query(query).to_dict())


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)

