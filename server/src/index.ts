import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Deck from "./models/Deck";

const PORT = 5200;

const app = express();

app.use(cors({
        origin: "*",
    })
);
app.use(express.json());

app.get('/', (req: Request , res: Response) => {
    res.send("hello world");
});

app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log(`Listening on port ${PORT}`)
    app.listen(PORT);
})
