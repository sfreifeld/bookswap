from app import app
from models import db, Event

with app.app_context():

    def drop_tables():
        db.drop_all()

    def create_tables():
        db.create_all()
    
def insert_events():
    
    event1 = Event(name="Denver Public Library", address="10 W 14th Ave, Denver, CO 80204", description="Book swap event at Denver Public Library")
    event2 = Event(name="The Shop at MATTER", address="2114 Market St, Denver, CO 80205", description="Book swap event at The Shop at MATTER")
    event3 = Event(name="Tattered Book Cover", address="1701 Wynkoop St, Denver, CO 80202", description="Book swap event at Tattered Book Cover")
    
    db.session.add_all([event1, event2, event3])
    db.session.commit()

if __name__ == "__main__":
        drop_tables()
        create_tables()
        insert_events()