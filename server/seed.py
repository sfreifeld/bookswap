from faker import Faker
from datetime import datetime, timedelta
from app import app
from models import *
from services import *

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
        new_user = User(email=email, username=username, password_hash=password_hash)
        db.session.add(new_user)
    db.session.commit()


def add_fake_events(num_events=5):

    current_date = datetime.now()

    for _ in range(num_events):

        name = fake.company()
        date = fake.date_object()
        # future_date = fake.date_time_between_dates(datetime_start=current_date + timedelta(days=1), datetime_end=current_date + timedelta(days=365))
        address = fake.address()
        details = fake.text()
        attendees = fake.random_int(min=1, max=10)
        new_event = Event(name=name, date=date, address=address, details=details, attendees=attendees)
        db.session.add(new_event)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        drop_tables()
        create_tables()
        add_fake_users()
        add_fake_events()



    


