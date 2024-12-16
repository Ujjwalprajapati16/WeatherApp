import User from "../Models/User.js";
import Favorite from "../Models/Favorite.js";

// add favorite
export const addFavorite = async (req, res) => {
  try {
    const { city } = req.body;
    const user = await User.findById(req.user.id);
    const favorite = await Favorite.create({ city });
    user.favorites.push(favorite._id);
    await user.save();
    res.status(201).json(favorite);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding favorite", error: error.message });
  }
};

// remove favorite
export const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;
    const user = await User.findById(req.user.id);
    const favorite = await Favorite.findById(favoriteId);
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    user.favorites.pull(favoriteId);
    await user.save();
    await favorite.remove();
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing favorite", error: error.message });
  }
};

// get favortie cities
export const getFavoriteCities = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.status(200).json(user.favorites);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching favorite cities",
        error: error.message,
      });
  }
};
