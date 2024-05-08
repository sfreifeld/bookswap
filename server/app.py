
from flask import Flask, request, jsonify, Response, current_app, session, make_response

app = Flask(__name__)
from flask_migrate import Migrate
from models import db, User, Event, Attendee
from faker import Faker
from flask_cors import CORS
from services import *
from random import randint




@app.before_request
def route_filter():
    print("Endpoint:", request.endpoint)
    bypass_routes = ["signup", "login", "check_session"]  # Replace "root_endpoint_name" with the actual endpoint name
    if request.endpoint not in bypass_routes and not session.get("user_id"):
        return {"Error": "Unauthorized"},401
    

@app.route('/checksession',methods=['GET'])
def check_session():
    print(session['user_id'])
    user = User.query.filter(User.id == session["user_id"]).first()
    if user:
        return user.to_dict()
    return {'message':'Not Authorized'}, 401



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
            new_user = User(email=data['email'], username=data['username'], password_hash=data['password'], avatar_id=randint(1,10))
            db.session.add(new_user)
            db.session.commit()
            created_user = User.query.filter(User.username == data["username"]).first()
            session["user_id"] = created_user.id
            return jsonify({"message": "User created successfully!", "user": created_user.to_dict()}), 201
        except Exception as e:
            print(e)
            return {"Error": "Could not make aa user"},422
    elif request.method == 'GET':
        all_users = User.query.all()
        r_l = []
        for user in all_users:
            r_l.append(user.to_dict())
        return r_l
    
    
    
@app.route('/logout', methods=["DELETE"])
def logout():
    session['user_id'] = None
    return {'message':'204: No content'}, 204
    

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





@app.route('/profile/<int:id>', methods=['GET', 'POST', 'DELETE'])
def one_profile_route(id):
    profile = User.query.filter(User.id == id).first()
    if not profile:
        return make_response({"error": "Profile not found"}, 404)

    if request.method == "GET":
        return make_response(profile.to_dict(), 200)
    elif request.method == "POST":
        data = request.get_json()
        description = data.get('description')
        avatar_id = data.get('avatar_id')

        if description is not None:
            profile.description = description
        if avatar_id is not None:
            profile.avatar_id = avatar_id

        db.session.commit()
        return make_response(profile.to_dict(), 200)
    
    elif request.method == "DELETE":
        session['user_id'] = None
        print(session)
        db.session.delete(profile)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "User deleted."
        }

        response = make_response(
            response_body,
            200
        )

        return response


@app.route('/attendees/<int:user_id>', methods=['GET'])
def get_attendees_by_user(user_id):
    attendees = Attendee.find_by_user_id(user_id)
    attendee_list = [attendee.to_dict() for attendee in attendees]
    return jsonify(attendee_list), 200


if __name__ == '__main__':
    app.run(port=5555, debug=True)