import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  city: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
