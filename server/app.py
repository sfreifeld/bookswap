from flask import Flask, request, jsonify, current_app
app = Flask(__name__)
from flask_migrate import Migrate
from models import db, User
from faker import Faker
from flask_cors import CORS



fake = Faker()


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
CORS(app)




@app.route('/signup', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        new_user = User(email=data['email'], username=data['username'])
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    elif request.method == 'GET':
        all_users = User.query.all()
        r_l = []
        for user in all_users:
            r_l.append(user.to_dict())
        return r_l
    
@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    current_app.logger.info(user)
    if not user:
        current_app.logger.info("no user")
    if user and user.check_password(password):
        
        return jsonify({"message": "Login successful"}), 200
    else:
        print(user)
        return jsonify({"message": "Invalid credentials"}), 401
    
    








if __name__ == '__main__':
    app.run(port=5555, debug=True)