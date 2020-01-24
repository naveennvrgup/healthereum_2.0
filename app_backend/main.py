from spacy.pipeline import EntityRuler
from spacy.lang.en import English
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import spacy
from spacy.matcher import PhraseMatcher
from nlp import report

app = Flask(__name__)
api = Api(app)

# testsFound = [{'name': 'HBA1C',
#                "description": "HbA1c test, also called Glycosylated Hemoglobin or Glycated Hemoglobin, is a test used to diagnose and monitor Diabetes.\nIt tells you about the average level of your Blood Sugar over the last 3 months.\nLet us understand a little more about this test. Hemoglobin is a protein found in red blood cells. It gives blood its red color, and it’s function is to carry oxygen throughout your body.\nThe sugar in your blood is called glucose. When glucose builds up in your blood, it binds to the hemoglobin in your red blood cells. The HbA1c test measures how much glucose is bound. Red blood cells live for about 3 months, so the test shows the average level of glucose in your blood for the past 3 months.\nIf you don’t have Diabetes, your value will be below 5.6, If the value is between 5.7 to 6.4, it means you are pre-Diabetic or at risk of developing Diabetes. A value of 6.5 and more indicates Diabetes.\nIf you are already a known Diabetic, then a value of between 6 and 7 indicates Excellent Control of your Diabetes, a value of between 7 and 8 indicates Fair/Good control, between 8 to 10 indicates Unsatisfactory Control and above 10 indicates Poor Control.\nindly consult your Family Doctor or your Diabetologist for more information on Managing and Living well with Diabetes.",
#                "value": 7,
#                "condition": "you have pre diabetes",
#                "warning": True
#                },
#               {"name": "Hemoglobin",
#                "description": "A complete blood count (CBC) is a test that measures the cells that make up your blood: red blood cells, white blood cells, and platelets. ",
#                "value": None,
#                "condition": "sorry, could not find the values to determine the condition",
#                "warning": False
#                },
#               ]

parser = reqparse.RequestParser()
parser.add_argument('task')

api.add_resource(report, '/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080,  use_reloader=True)
