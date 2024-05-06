

from services import *
from models import *






with app.app_context():

    def drop_tables():
        db.drop_all()

    def create_tables():
        db.create_all()

    def add_user():
        email = 'sfrei.1996@gmail.com'
        username = 'sabfry'
        password_hash = '123'
        new_user = User(email=email, username=username, password_hash=password_hash)
        db.session.add(new_user)
         
    

    def add_fake_users(num_users=10):
        for _ in range(num_users):
            email = fake.email()
            username = fake.user_name()
            password_hash = fake.password()
            new_user = User(email=email, username=username, password_hash=password_hash)
            db.session.add(new_user)
        db.session.commit()

    if __name__ == "__main__":
            drop_tables()
            create_tables()
            add_user()
            add_fake_users()
