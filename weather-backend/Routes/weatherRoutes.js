import express from "express";
import {
  getWeatherByCity,
  getSearchHistory,
} from "../Controllers/weatherController.js";
import ValidateCity from "../Middleware/ValidateCity.js";

const router = express.Router();

// Route for fetching weather data by city
router.get("/:city",ValidateCity, getWeatherByCity);

// Route for fetching search history
router.get("/history",ValidateCity, getSearchHistory);

export default router;
