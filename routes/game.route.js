import express from "express";
import addGame from "../controllers/game.controller.js";

const router = express.Router();

router.post('/add', addGame)

export default router