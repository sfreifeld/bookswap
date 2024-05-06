from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_`%(constraint_name)s`",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
    })

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text)
    username = db.Column(db.Text)
    password = db.Column(db.Text)


class Moderator(db.Model, SerializerMixin):

    __tablename__ = "moderators"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    user = db.relationship('User', backref=db.backref('moderator', lazy=True))
    event = db.relationship('Event', backref=db.backref('moderator', lazy=True))

class Event(db.Model, SerializerMixin):

    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(10)) 
    time = db.Column(db.String(5)) 
    address = db.Column(db.String(100), nullable=False)
    details = db.Column(db.Text)
    attendees = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) 
    user = db.relationship('User', backref=db.backref('events', lazy=True))

