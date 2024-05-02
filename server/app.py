from flask import Flask, request, jsonify
app = Flask(__name__)
from flask_migrate import Migrate
from models import db, User, Event
from faker import Faker
fake = Faker()


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    new_user = User(email=data['email'], username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201



'''
def get_signups():
    all_users = User.query.all()
    r_l = []
    for user in all_users:
        r_l.append(user.to_dict())
    return r_l
'''


def get_usernames():
    users = User.query.all()
    usernames = [user.username for user in users]
    return jsonify(usernames), 200


@app.route('/events', methods=['GET'])
def get_all_events():
    events = Event.query.all()
    event_list = [{'id': event.id, 'name': event.name, 'date': event.date.strftime('%Y-%m-%d'), 'address': event.address, 'details': event.details} for event in events]
    return jsonify(event_list), 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)