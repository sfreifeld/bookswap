from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.hybrid import hybrid_property
from services import *

<<<<<<< HEAD
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




=======
>>>>>>> sam
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
    status = db.Column(db.String(20), default='Needs Participants')
    themed = db.Column(db.Boolean, default=False)
    genre = db.Column(db.String(50), nullable=True) 
    date = db.Column(db.String(10)) 
    time = db.Column(db.String(5)) 
    address = db.Column(db.String(100), nullable=False)
    details = db.Column(db.Text)
    attendees = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) 
    user = db.relationship('User', backref=db.backref('events', lazy=True))

<<<<<<< HEAD

=======
    
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











    '''
    serialize_rules = ('-_password_hash',)

    
    
    
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def check_password(self,password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    '''

>>>>>>> sam
