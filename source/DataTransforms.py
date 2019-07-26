# DataService
# import pandas as pd
from flask import Flask
from flask_restful import Resource, Api


app = Flask(__name__)
api = Api(app)


class ColumnFilter(Resource):

    def get(self):
        return {
            'product': [
                'ice',
                'water',
                'Butter',
                'schwanzringel',
            ]
        }

    def post(self, request):
        return {
            'product': [
                'ice',
                'water',
                'Butter',
                str(request.POST['Type']),
            ]
        }


api.add_resource(ColumnFilter, '/')
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)

