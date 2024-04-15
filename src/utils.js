export const updateRecentCities = (cityName) => {
  const MAX_RECENT_CITIES=5
    const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    const updatedRecentCities = [cityName, ...recentCities.filter(city => city !== cityName)].slice(0, MAX_RECENT_CITIES);
    localStorage.setItem("recentCities", JSON.stringify(updatedRecentCities));
  };