# weather-app

Technical Problem: Weather Forecast Platform with Node.js and React

# Challenge Description:
Develop a fullstack application that displays weather forecasts based on the user's location. The
system should consist of a Node.js backend, which communicates with an external weather API, and a React frontend, where
users can view current and future weather conditions. The application should include user authentication and store search
history for weather forecasts.

## The focus of this challenge is to demonstrate your skills in both backend and frontend development, as well as best practices in architecture, performance, and user experience.
Functional Requirements:
User Authentication:

[X] Allow users to sign up and log in using JWT authentication on the backend.

[X] Store user data in a database such as MongoDB or PostgreSQL.

Weather API Integration:

[X] The Node.js backend should consume a weather API (e.g., OpenWeatherMap or WeatherAPI).

[X] On the frontend, users should be able to view weather forecasts based on their location or search for weather in different cities.

Search History Storage:

[X] Each user can store their last 5 weather search results in the database.

[X] Display the search history on the frontend.

Backend with Node.js:

 [X] The backend should use Node.js with Express, and expose RESTful endpoints for authentication, weather data, and search history.

 [X] Use axios or node-fetch to fetch weather data from external APIs.

Frontend with React:

 [X] Use React with Hooks and Context API or Redux for state management.

 [X] Display weather conditions (temperature, humidity, etc.) with a user-friendly UI.

 [X] Use geolocation for automatic weather retrieval.

Data Persistence:

 [X] Use MongoDB (or another NoSQL or relational database) for user and search history storage.

Performance and Security:

 [X] Implement caching on the backend to improve performance.

 [X] Secure the backend using JWT and rate-limiting for API requests.

Testing:

 [-] Write unit and integration tests for both the backend and frontend.

--> backend

 [X] Use Jest, Mocha, or similar frameworks.

# Next steps
- use vitest for frontend
- split frontend components
- create database inteface for repository pattern
- create shared structure for monorepo store pattern



