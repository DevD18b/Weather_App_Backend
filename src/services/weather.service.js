const axios = require('axios');
const normalizeWeather = require('../utils/normalizeWeather');
const ApiError = require('../utils/apiError');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/*
  Maps OpenWeather errors → API errors
*/
const handleProviderError = (error) => {
  if (error.response) {
    const status = error.response.status;

    if (status === 404) {
      throw new ApiError(404, 'CITY_NOT_FOUND', 'City not found');
    }

    if (status === 401) {
      throw new ApiError(401, 'INVALID_API_KEY', 'Invalid weather API key');
    }

    throw new ApiError(
      status,
      'WEATHER_PROVIDER_ERROR',
      'Weather provider error'
    );
  }

  throw new ApiError(
    503,
    'WEATHER_SERVICE_UNAVAILABLE',
    'Weather service unavailable'
  );
};

/*
  Fetch current weather
*/
exports.fetchCurrentWeather = async ({ city, lat, lon }) => {
  try {
    const params = {
      appid: API_KEY,
      units: 'metric'
    };

    if (city) params.q = city;
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    }

    const response = await axios.get(`${BASE_URL}/weather`, { params });
    return normalizeWeather.current(response.data);
  } catch (error) {
    handleProviderError(error);
  }
};

/*
  Fetch forecast
*/
exports.fetchForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return normalizeWeather.forecast(response.data);
  } catch (error) {
    handleProviderError(error);
  }
};
