# Weather API Backend

A Node.js and Express-based backend service that provides current weather
and forecast data for a given city or geographic coordinates.

The backend securely communicates with the OpenWeatherMap API, normalizes
the provider response, and exposes clean REST APIs for frontend consumption.


--------------------------------------------------
TECH STACK
--------------------------------------------------

- Node.js
- Express.js
- Axios
- dotenv
- OpenWeatherMap API


--------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------

src/
├── app.js
├── server.js
├── routes/
│   └── weather.routes.js
├── controllers/
│   └── weather.controller.js
├── services/
│   └── weather.service.js
└── utils/
    ├── normalizeWeather.js
    └── ApiError.js


--------------------------------------------------
SETUP INSTRUCTIONS
--------------------------------------------------

1) Clone the repository

git clone <your-repo-url>
cd weather-backend


2) Install dependencies

npm install


3) Create a .env file in the root directory

PORT=3000
OPENWEATHER_API_KEY=your_openweather_api_key


4) Run the server

npm run dev


Server will start on:
http://localhost:3000


--------------------------------------------------
API ENDPOINTS
--------------------------------------------------

CURRENT WEATHER

By city name:
GET /api/weather?city=London

By latitude & longitude:
GET /api/weather?lat=51.5074&lon=0.1278


FORECAST (Show at least next 5 time points (hourly))

GET /api/forecast?city=London


--------------------------------------------------
ERROR HANDLING
--------------------------------------------------

- Validation for missing or invalid query parameters
- Graceful handling of third-party API failures
- Centralized error middleware for consistent error responses

Sample error response:

{
  "message": "City is required"
}


--------------------------------------------------
SECURITY NOTES
--------------------------------------------------

- Weather provider API key is stored in environment variables
- API key is never exposed to the frontend
- Centralized error handling prevents leaking internal details


--------------------------------------------------
API TESTING
--------------------------------------------------

APIs can be tested using:
- Postman
- Thunder Client
- curl


--------------------------------------------------
AUTHOR
--------------------------------------------------

Built as part of a full-stack assignment to demonstrate backend API design,
error handling, and clean architecture.
