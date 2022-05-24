from flask import Flask, jsonify, request, redirect
from flask.helpers import url_for
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
cors = CORS(app)

client = MongoClient('127.0.0.1', 27017)
db = client.db
coll= db.favInfo

def all_movies():
    holder = list()
    for i in coll.find():
        holder.append({'Title':i['Title'], 'Year' : i['Year'], 'imdbID' : i['imdbID'], "Type": i['Type'], 'Poster' : i['Poster']})
    holder.reverse()
    return jsonify(holder)

@app.route('/allFav', methods = ['GET'])
def retrieve_all():
    return all_movies()

@app.route('/delete/<imdb_id>', methods = ['DELETE'])
def delete_data(imdb_id):
    coll.delete_one({"imdbID": imdb_id})
    return all_movies()

@app.route('/deleteAll', methods = ['DELETE'])
def delete_all_data():
    coll.delete_many({'Type': 'movie'})
    return redirect(url_for('retrieveAll'))

@app.route('/addFav', methods=['POST'])
def add_movie():
    title = request.json['Title']
    year = request.json['Year']
    imdb_id = request.json['imdbID']
    typ = request.json['Type']
    poster = request.json['Poster']
    
    coll.delete_one({"imdbID": imdb_id})
    coll.insert_one({"Title": title, "Year": year, "imdbID": imdb_id, "Type": typ, "Poster": poster})

    return all_movies()


if __name__ == '__main__':
    app.run(debug=True)
