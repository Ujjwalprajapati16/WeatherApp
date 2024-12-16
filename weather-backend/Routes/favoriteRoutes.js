import {
  addFavorite,
  removeFavorite,
  getFavoriteCities,
} from "../Controllers/favController.js";
import express from "express";

const router = express.Router();

router.post("/add", addFavorite);
router.delete("/remove/:favoriteId", removeFavorite);
router.get("/favorites", getFavoriteCities);

export default router;
