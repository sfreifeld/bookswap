from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from services import *



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique = True)
    username = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String)




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

