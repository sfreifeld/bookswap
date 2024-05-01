
from faker import Faker

from app import app
from models import db, User

fake = Faker()

def add_fake_users(num_users=10):
    for _ in range(num_users):
        email = fake.email()
        username = fake.user_name()
        password = fake.password()
        new_user = User(email=email, username=username, password=password)
        db.session.add(new_user)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        add_fake_users()