## Welcome! 
To check out the app, please visit: https://eats-nearby.herokuapp.com/  

This is an original app (not from a tutorial or class) that lets a user save their favorite places and then retrieve them in order of proximity to the user's current location.

### Usage
Say I have a number of new restaurants I'd like to visit one day. I can create a new list (eg. "New Eats!") and save the places to that list.  
Later when I'm out and about in the city and think, "Hm, I want to eat at one of those new restaurants, but how close are they?", I can pull up the app.    
The app gets my current location, I select which list to conduct the search in ("New Eats!"), and it returns the places in that list in order of how close they are to me. Now I know where to go for lunch!

### Features
- Full CRUD capabilities to add/view/edit/delete places and lists of places
- User authentication to save personal lists and places
- Customize places and lists with titles, descriptions, and personal ratings
- Search and save an exact address when adding a place
- View map locations of saved places
- Get user's current location and return places from a selected list in order of proximity to the user

### Technologies
- React - frontend framework, PrimeReact for UI
- Redux - global state management and async data fetching
- Nodejs - backend
- Express - backend framework, RESTful api routes and pg library for SQL queries
- PostgreSQL - database and session store
- Heroku - deployment
- Self-implemented user auth, bcrypt library for password hashing

### Third-party APIs
- Google Maps Autocomplete
- Google Maps Places
- Google Maps Distance Matrix
