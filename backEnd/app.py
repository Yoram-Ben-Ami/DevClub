import json
import os

from flask import Flask, send_from_directory, jsonify, request, redirect
from functools import wraps
from flask import Response
from flask import request 
import mongo_client
from pymongo import MongoClient

list2=list()
ROOT_FOLDER = r"my-app/build"
client = MongoClient('127.0.0.0')
db = client.db
coll= db.favInfo

app = Flask(__name__, static_folder=os.path.join(ROOT_FOLDER))



class NetflixResponse(object):
    def __init__(self, data, status="success", http_status_code=200, http_extra_headers=None):
        self.data = data
        self.status = status
        self.http_status_code = http_status_code
        self.http_extra_headers = http_extra_headers

    def dictify(self):
        return {"status": self.status, "data": self.data}


def response_wrapper(func):
    @wraps(func)
    def wrapper(**params):

        try:
            func_result = func(**params)
            if type(func_result) is Response:
                return func_result

            response = NetflixResponse(func_result)


        except Exception as err:
            response = NetflixResponse(str(err), "error", 500, {})

        return _make_http_response(response.dictify(), response.http_status_code, response.http_extra_headers)

    return wrapper


def _make_http_response(content=None, status_code=200, extra_headers=None, mimetype="application/json"):
    extra_headers = extra_headers or {}

    if content is None:
        content_string = ""
        mimetype = "text/plain"
    else:
        if mimetype == "application/json":
            content_string = json.dumps(content)
        else:
            content_string = content

    return Response(content_string, status_code, extra_headers, mimetype)

is_task_currently_running = False

# this is a function that serves all your UI files - just make sure to edit ROOT_FOLDER to match your project structure
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>', methods=["GET"])
def files(path):
    return send_from_directory(ROOT_FOLDER, path)

# go ahead and open chrome at http://localhost/demoJson
@app.route('/demoJson', methods=["GET", "POST"])
@response_wrapper
def demoAsJson():
    return "wanna watch a movie?"


@app.route('/delete/<imdb_id>', methods = ['DELETE'])
def delete_data(imdb_id):
    mongo_client.delete_one({"imdbID": imdb_id})
    return list2()

@app.route('/favorite', methods=["GET", "POST"])
def favorite():
    x=request.data
    title = request.json['Title']
    year = request.json['Year']
    imdb_id = request.json['imdbID']
    typ = request.json['Type']
    poster = request.json['Poster']
    data = json.loads(x)
    list2.append(x)
    print(data)
    data["_id"]=data['Title']
    list2.delete_one({"imdbID": imdb_id})
    list2.insert({"Title": title, "Year": year, "imdbID": imdb_id, "Type": typ, "Poster": poster} )
    return str(list2)

def all_movies():
    holder = list()
    for i in coll.find():
        holder.append({'Title':i['Title'], 'Year' : i['Year'], 'imdbID' : i['imdbID'], "Type": i['Type'], 'Poster' : i['Poster']})
    holder.reverse()
    return jsonify(holder)

@app.route('/favorite', methods=['POST'])
def add_movie():
    title = request.json['Title']
    year = request.json['Year']
    imdb_id = request.json['imdbID']
    typ = request.json['Type']
    poster = request.json['Poster']
    
    coll.delete_one({"imdbID": imdb_id})
    coll.insert_one({"Title": title, "Year": year, "imdbID": imdb_id, "Type": typ, "Poster": poster})

    return all_movies()



@app.route('/getfavorites', methods=["GET", "POST"])
@response_wrapper
def getfavorites():   
    return mongo_client.find("my_collection", {})


if __name__ == '__main__':
    app.run("0.0.0.0", 80, debug=True)


