// Validate city parameter middleware
const validateCity = (req, res, next) => {
  const city = req.params.city.trim();
  if (!city) {
    return res.status(400).json({
      success: false,
      message: "City name is required.",
    });
  }
  next();
};

export default validateCity;