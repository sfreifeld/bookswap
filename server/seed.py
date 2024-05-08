from faker import Faker
from app import app
from models import *
from services import *
from random import randint

fake = Faker()

def drop_tables():
    db.drop_all()

def create_tables():
    db.create_all()

def add_fake_users(num_users=10):
    for _ in range(num_users):
        email = fake.email()
        username = fake.user_name()
        password_hash = fake.password()
        avatar_id = randint(1,10)
        new_user = User(email=email, username=username, password_hash=password_hash, avatar_id=avatar_id)
        db.session.add(new_user)
    db.session.commit()


def add_fake_events(num_events=5):

    for _ in range(num_events):

        name = fake.company()
        date = fake.date()
        time = fake.time()
        address = fake.address()
        details = fake.text()
        attendees = fake.random_int(min=1, max=15)
        themed = fake.boolean()  
        new_event = Event(name=name, date=date, time=time, address=address, details=details, attendees=attendees, themed=themed)
        db.session.add(new_event)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        drop_tables()
        create_tables()
        add_fake_users()
        add_fake_events()



    


