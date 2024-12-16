import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  city: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

export default SearchHistory;
