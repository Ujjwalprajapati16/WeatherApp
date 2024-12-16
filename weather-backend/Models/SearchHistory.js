import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

export default SearchHistory;
