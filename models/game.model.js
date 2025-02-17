import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    appId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    genres:{
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    devs: {
        type: Array,
        required: true
    },
    pubs: {
        type: Array,
        required: true
    },
    screenshots:{
        type: Array,
        required: true
    },
    trailer:{
        type: Array,
    },
    website: {
        type: String,
    },
    headerImage: {
        type: String,
        required: true,
    },
    capsuleImage: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    steamUrl: {
        type: String,
        required: true,
    }
});

const Game = mongoose.model('Game', gameSchema);
export default Game;