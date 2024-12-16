import axios from "axios";
import SearchHistory from "../Models/SearchHistory.js";

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
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        weather: weatherData.weather[0].description,
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
    const history = await SearchHistory.find()
      .sort({ timestamp: -1 })
      .limit(10);

    // Handle case where no history exists
    if (!history.length) {
      return res.status(404).json({
        success: false,
        message: "No search history found.",
      });
    }

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching search history.",
      error: error.message,
    });
  }
};

export { getWeatherByCity, getSearchHistory };
