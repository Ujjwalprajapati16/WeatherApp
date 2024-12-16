import axios from "axios";
import SearchHistory from "../Models/SearchHistory.js";
import User from "../Models/User.js";

const isValidCity = (city) => /^[a-zA-Z\s]+$/.test(city);

const getWeatherByCity = async (req, res) => {
  const city = req.params.city.trim();

  // Validate city input
  if (!city || !isValidCity(city)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid city name. City names should only contain alphabets and spaces.",
    });
  }

  try {
    // Fetch weather data from OpenWeatherMap
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    const weatherData = response.data;

    // Save search to database
    await SearchHistory.create({ city });
    
    res.status(200).json({
      success: true,
      data: {
        city: weatherData.name,
        coordinates: weatherData.coord,
        temperature: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        minTemperature: weatherData.main.temp_min,
        maxTemperature: weatherData.main.temp_max,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        seaLevel: weatherData.main.sea_level,
        groundLevel: weatherData.main.grnd_level,
        visibility: weatherData.visibility,
        wind: weatherData.wind,
        clouds: weatherData.clouds,
        weather: weatherData.weather[0].description,
        weatherMain: weatherData.weather[0].main,
        weatherIcon: weatherData.weather[0].icon,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
        timezone: weatherData.timezone,
      },
    });
  } catch (error) {
    // Handle API errors
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "City not found. Please check the city name and try again.",
      });
    }

    if (error.response && error.response.status === 401) {
      return res.status(401).json({
        success: false,
        message: "Invalid API key. Please check your OpenWeatherMap API key.",
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching weather data.",
      error: error.message,
    });
  }
};

const getSearchHistory = async (req, res) => {
  try {
    // Get the userId from the authenticated user's token or session
    const userId = req.user._id;

    // Find the search history for the specific user, sorted by the most recent
    const history = await SearchHistory.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10);

    // Handle case where no history exists for the user
    if (!history.length) {
      return res.status(404).json({
        success: false,
        message: "No search history found for the user.",
      });
    }

    // Send success response with user-specific search history
    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching search history.",
      error: error.message,
    });
  }
};

export { getWeatherByCity, getSearchHistory };
