# Welcome to Book Swap! 

This platform allows you to browse and create local book swap gatherings, connecting you with fellow book enthusiasts in your community. Below are instructions on how to use the website.

## Features
- Browse local book swap events based on location, date, and theme.
- RSVP for events that interest you with a simple click.
- Create your own book swap events with customizable event details and guidelines.

## Technologies Used
- React (with Vite) for the frontend.
- Flask (with Flask-SQLAlchemy and Flask-Migrate) for the backend.

## Project Structure
```
book-swap
│
├── server/                   # Backend Flask application
│   ├── app.py                # Main Flask application file
│   ├── models.py             # SQLAlchemy models for database
│   ├── migrations/           # Database migration files
│   ├── config.py             # Configuration settings for Flask app
│   └── ...
│
├── client/                   # Frontend React application
│   ├── public/               # Static assets and HTML template
│   ├── src/                  # React components and application logic
│   ├── package.json          # NPM dependencies and scripts
│   ├── vite.config.js        # Configuration for Vite bundler
│   └── ...
│
├── .gitignore                # Git ignore file
├── README.md                 # Project README file
```

## Getting Started
To run the website locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd book-swap-website`
3. Install dependencies:
   - For the frontend (React):
   - `cd client`
   - `pipenv install && pipenv shell`
   - For the backend (Flask):
   - `cd server`
   - `pipenv install && pipenv shell`
4. Configure the environment variables:
   - Create a `.env` file in the `server` directory and define your Flask app settings.
5. Run the backend server:
   - `cd server`
   - `python seed.py`
   - `python app.py`
6. Run the frontend server:
   - `cd client && npm run dev`
7. Open your web browser and visit `http://localhost:3000` to access the website.

## Usage

### Browse Events
- On the homepage, you'll see a list of upcoming book swap events.
- Use the filters to browse events based on location, date, or theme.
- Click on an event to view more details and RSVP.

### RSVP for Events
- To RSVP for an event, simply click the "RSVP" button on the event's page.
- Your RSVP status will be updated accordingly.

### Create Your Own Event
- Feeling inspired to host your own book swap? Click on the "Create Event" button.
- Fill out the event details, including location, date, and theme.
- Customize event guidelines according to your preferences.
- Click "Create" to publish your event and share it with the community.

## Version History
v1.0.0 (05-09-2024): Initial release with basic functionality for browsing and RSVPing to events.

## Troubleshooting
If you encounter any issues while running the project, try the following troubleshooting steps:

- Check that all dependencies are installed correctly by running `npm install for the frontend and pip install -r requirements.txt for the backend.
- Verify that environment variables are correctly configured, especially those related to database connection and Flask app settings.
- Ensure that both frontend and backend servers are running and accessible.
If the issue persists, please open an issue on GitHub with detailed information about the problem you're experiencing.

## Resources
For more information about using React, Flask, or related technologies, consider exploring the following resources:

- [React Documentation](https://reactjs.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com/en/2.0.x/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/en/14/)
- [Vite Documentation](https://vitejs.dev/guide/)


## License
This project is licensed under the MIT License. See the LICENSE file for details.
