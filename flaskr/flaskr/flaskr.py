import os, logging
from flask import json, jsonify
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
from mongoengine import *

import csv
import json
import xlrd
import mmap

#model unemploymentcount
class unemployementcount(Document):
    agegroup = StringField(max_length=50)
    gender = StringField(max_length=50)
    country = StringField(max_length=100)
    data = DictField()

#open or connect DB
connect('visualizationDB')

app = Flask(__name__) 
db = connect(app)

#redirct to home page
@app.route('/')
@app.route('/home')
def homepage():
    error = None
    return render_template('index.html', error=error)

 #fetch data from table and send to ajax as json
@app.route('/getjsondata', methods=['GET'])
def showentry():
    unemp = unemployementcount.objects.to_json()
    return unemp

#read excel and store in to db table
@app.route('/insertdata', methods=['GET'])
def index():
    with app.open_resource('../../asserts/data/unempcount.xlsx') as File:
        book = xlrd.open_workbook(file_contents=mmap.mmap(File.fileno(), 0, access=mmap.ACCESS_READ))
        sheet = book.sheet_by_index(0)
        headers = dict((i, sheet.cell_value(0, i)) for i in range(sheet.ncols))
        data=(dict((headers[j], sheet.cell_value(i, j)) for j in headers) for i in range(1, sheet.nrows))
        datastring = json.dumps([r for r in data])
        jsonobj = json.loads(datastring)
        for obj in jsonobj:
            age = obj["agegroup"]
            gen = obj["gender"]
            con = obj["country"]
            yeardata={}
            for year in range(1981, 2006):
                year = str(year)
                yeardata[year] = obj[year+".0"]
            unemp=unemployementcount(agegroup=age,gender=gen,country=con,data=yeardata).save()
        return render_template('index.html',jdata=jsonobj)

#redirect to inspiration page
@app.route('/inspiration')
def inspirationpage():
    error = None
    return render_template('inspiration.html', error=error)      
@app.errorhandler(404) #404 error handler
def page_not_found(e):
  return render_template('404.html', error = e), 404

@app.errorhandler(500) #500 error handler
def page_not_found(e):
  return render_template('500.html', error = e), 500
