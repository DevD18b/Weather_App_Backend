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
exports.forecast = (data) => {
  const byDate = {};

  data.list.forEach(item => {
    const dateObj = new Date(item.dt * 1000);

    // Real date key (not weekday)
    const dateKey = dateObj.toISOString().split("T")[0];

    if (!byDate[dateKey]) {
      byDate[dateKey] = [];
    }

    byDate[dateKey].push(item);
  });

  const forecast = Object.keys(byDate).slice(0, 5).map(dateKey => {
    const items = byDate[dateKey];

    // Target hour = 12 PM
    let closest = items[0];
    let minDiff = Infinity;

    items.forEach(item => {
      const hour = new Date(item.dt * 1000).getHours();
      const diff = Math.abs(12 - hour);

      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    });

    const dateObj = new Date(closest.dt * 1000);

    return {
      day: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
      date: dateObj.toISOString(),
      time: dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      tempC: closest.main.temp,
      condition: closest.weather[0].main,
      icon: closest.weather[0].icon
    };
  });

  return {
    location: {
      city: data.city.name,
      country: data.city.country
    },
    forecast
  };
};