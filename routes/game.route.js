import express from "express";
import addGame from "../controllers/game.controller.js";

const router = express.Router();

router.post('/add', addGame)


router.get("/test", (req, res) => {
    console.log("test is working");
    res.send("Welcome to the test")
})

export default router