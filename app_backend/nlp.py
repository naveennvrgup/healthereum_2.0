import csv
from spacy.pipeline import EntityRuler
from spacy.lang.en import English
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import spacy
from spacy.matcher import PhraseMatcher
from pdf import extractPdfText
from flask import request
import random
import os

tests = ""
result = []

patterns = []
nlp = English()
ruler = EntityRuler(nlp)
with open('google.csv', 'r')as f:
    tests = csv.reader(f)

patterns.append{"label": "HBA1C", "pattern": [{"LOWER": "hba1c"}]}
ruler.add_patterns(patterns)
nlp.add_pipe(ruler)


class report(Resource):
    def post(self):
        if(not request.files):
            return "file not receieved or bad request format : sid"
        f = request.files['file']
        randomn = random.randint(1, 10000000)
        randomString = str(randomn)
        f.save(randomString+'.pdf')
        text = extractPdfText(randomString+".pdf")
        text = str(text)
        text = text.replace("\\n", " ")
        doc = nlp(text)
        testsFound = []
        result = []

        with open('google.csv', 'r')as f:
            tests = csv.reader(f)
            for ent in doc.ents:
                index = 0
                for row in tests:
                    index = index+1
                    if ent.label_ == row[0] and index not in testsFound:
                        testsFound.append(index)
                        result.append({'name': 'HBA1C',
                                       "description": row[4],
                                       "value": None,
                                       "condition": "ooops can't find your health condition",
                                       "warning": False
                                       })
        os.remove(randomString+".pdf")
        return result

    def get(self):
        return "hi this is get request, SiD here. I better go and make docs for post request "
