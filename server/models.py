from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.hybrid import hybrid_property
from services import *
from flask import jsonify

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique = True)
    username = db.Column(db.String, unique = True, nullable = False)
    description = db.Column(db.String, default="")
    _password_hash = db.Column(db.String)
    avatar_id = db.Column(db.Integer)



    @hybrid_property
    def password_hash(self):
        return self._password_hash
    

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
        return
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))



class Attendee(db.Model, SerializerMixin):

    __tablename__ = "Attendees"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    user = db.relationship('User', backref=db.backref('attendee', lazy=True))
    event = db.relationship('Event', backref=db.backref('attendee', lazy=True))

    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()






## Add creator to this table
class Event(db.Model, SerializerMixin):

    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(10)) 
    time = db.Column(db.String(5)) 
    address = db.Column(db.String(100), nullable=False)
    details = db.Column(db.Text)
    attendees = db.Column(db.Integer, nullable=False)
    moderator_id = db.Column(db.Integer, db.ForeignKey('users.id')) 


