exports.current = (data) => ({
  location: {
    city: data.name,
    country: data.sys.country
  },
  current: {
    tempC: data.main.temp,
    feelsLikeC: data.main.feels_like,
    condition: data.weather[0].main,
    humidity: data.main.humidity,
    windKph: data.wind.speed,
    updatedAt: new Date(data.dt * 1000).toISOString()
  }
});

exports.forecast = (data) => ({
  location: {
    city: data.city.name,
    country: data.city.country
  },
  forecast: data.list.slice(0, 5).map(item => ({
    time: new Date(item.dt * 1000).toISOString(),
    tempC: item.main.temp,
    condition: item.weather[0].main
  }))
});
