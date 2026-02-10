const weatherService = require('../services/weather.service');
const ApiError = require('../utils/apiError');

/*
  GET /api/weather?city=London
  GET /api/weather?lat=..&lon=..
*/
exports.getCurrentWeather = async (req, res, next) => {
  try {
    const { city, lat, lon } = req.query;

    // Validation: city OR (lat & lon) required
    if (!city && (!lat || !lon)) {
      throw new ApiError(
        400,
        'INVALID_REQUEST',
        'City or latitude & longitude required'
      );
    }

    // Validation: city name sanity check
    if (city && city.trim().length < 2) {
      throw new ApiError(
        400,
        'INVALID_CITY',
        'Invalid city name'
      );
    }

    const data = await weatherService.fetchCurrentWeather({ city, lat, lon });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/*
  GET /api/forecast?city=London
*/
exports.getForecast = async (req, res, next) => {
  try {
    const { city } = req.query;

    if (!city) {
      throw new ApiError(
        400,
        'INVALID_REQUEST',
        'City is required'
      );
    }

    if (city.trim().length < 2) {
      throw new ApiError(
        400,
        'INVALID_CITY',
        'Invalid city name'
      );
    }

    const data = await weatherService.fetchForecast(city);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
