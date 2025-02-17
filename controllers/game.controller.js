import Game from '../models/game.model.js'

export default async function addGame (req, res) {
    console.log('ehhdskjhdkjshfdjkshdkjh')
    try {
        const {
            appId, name, description, shortDescription,
            genres, price, devs,
            pubs, screenshots, trailer, website, headerImage,
            capsuleImage, steamUrl
        } = req.body;

    const newGame = await Game.create({
        appId:appId,
        name:name,
        description:description,
        shortDescription:shortDescription,
        genres:genres,
        price:price,
        devs:devs,
        pubs:pubs,
        screenshots:screenshots,
        trailer:trailer,
        website:website,
        headerImage:headerImage,
        capsuleImage:capsuleImage,
        steamUrl:steamUrl
    })
    res.status(200).send(newGame)
    } catch (err){
        console.log(err);
        res.send(err.message)
    }
}