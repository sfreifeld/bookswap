
from flask import Flask, request, jsonify, Response, current_app, session
app = Flask(__name__)
from flask_migrate import Migrate
from models import db, User, Event, Moderator
from faker import Faker
from flask_cors import CORS
from services import *




@app.before_request
def route_filter():
    bypass_routes = ["signup","login"]
    if request.endpoint not in bypass_routes and not session.get("user_id"):
        return {"Error": "Unauthorized"},401

@app.route('/login', methods = ["POST"])
def login():
    data = request.get_json()
    user = User.query.filter(User.username == data["username"]).first()
    if user and user.check_password(data['password']):
        session["user_id"] = user.id
        return user.to_dict()
    else:
        return {"error":"Cannot login"},400



    
@app.route('/signup',methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        try:
            data = request.get_json()
            new_user = User(email=data['email'], username=data['username'], password_hash=data['password'])
            db.session.add(new_user)
            db.session.commit()
            created_user = User.query.filter(User.username == data["username"]).first()
            session["user_id"] = created_user.id
            return jsonify({"message": "User created successfully", "user": created_user.to_dict()}), 201
        except Exception as e:
            print(e)
            return {"Error": "Could not make aa user"},422
    elif request.method == 'GET':
        all_users = User.query.all()
        r_l = []
        for user in all_users:
            r_l.append(user.to_dict())
        return r_l
    
@app.route('/checksession',methods=['GET'])
def check_session():
    if request.method == 'GET':
        print(session)
        user = User.query.filter(User.id == session["user_id"]).first()
        return user.to_dict(),200
    
    
@app.route('/logout', methods=["DELETE"])
def logout():
    session.pop('user_id')
    return {}, 204
    

@app.route('/events', methods=['GET'])
def get_all_events():
    events = Event.query.all()
    event_list = [{'id': event.id, 'name': event.name, 'date': event.date, 'time': event.time, 'address': event.address, 'attendees': event.attendees, 'details': event.details} for event in events]
    return jsonify(event_list), 200

@app.route('/api/create', methods=['POST'])
def create_event():

    data = request.get_json()
    # Extract event data from request
    name = data.get('name')
    date = data.get('date')
    time = data.get('time')
    address = data.get('address')
    details = data.get('details')
    # Create the event in the database
    new_event = Event(name=name, date=date, time=time, address=address, details=details)

    db.session.add(new_event)
    db.session.commit()
    return jsonify({"message": "Event created successfully"}), 201


if __name__ == '__main__':
    app.run(port=5555, debug=True)