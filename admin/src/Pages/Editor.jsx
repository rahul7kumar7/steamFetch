import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { GoLinkExternal } from "react-icons/go";
import {useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FaCaretDown } from "react-icons/fa";



export default function Editor() {
    const [gameId, setGameId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [steamData, setSteamData] = useState({
        appId: "",
        name: "",
        description: "",
        shortDescription: "",
        price:0,
        devs:[],
        pubs:[],
        website:"",
        headerImage:"",
        capsuleImage:"",
        screenshots:[],
        genres: [],
        trailer:[],
        steamUrl: ""
    });


    const params = useParams();

    useEffect(() => {
        setLoading(true);
        console.log(params.id);
        async function fetchGame() {
            if (params.id) {
                try {
                    console.log('gameid is', gameId);
                    const res = await fetch(`http://localhost:8080/game/fetch/${params.id}`);
                    if (res.ok){
                        const data = await res.json();
                        console.log(data);
                        setSteamData(data);
                    } else {
                        console.log('error fetching response');
                        setError(`error fetching response from ${res.statusText}`);
                    }
                } catch (error) {
                    console.log('error is', error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchGame();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/game/update/${params.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(steamData),
            });
            const data = await res.json();
            if (data) {
                console.log(steamData);
                alert('game updated successfully!');
            } else {
                console.log('Error in updating data', data.message);
                setError(`Error in updating data: ${data.message}`);
            }

        } catch (error) {
            console.log('Error encountered while updating game', error);
            setError(`Error encountered while updating game: ${error}`);
        } finally {
            setLoading(false);
        }

    };

    const handleChange = (e, index=null) => {
        if (e.target.type === 'text' || e.target.type === 'number' || e.target.id === 'shortDescription' || e.target.id === 'description') {
            setSteamData({
                ...steamData,
                [e.target.id]: e.target.value,
            })
        }
        if (e.target.id === `genre-${index}`){
            const newGenre = [...steamData.genres]
            newGenre[index] = e.target.value
            setSteamData({...steamData, genres: newGenre})
            console.log(steamData.genres);
        }
        if (e.target.id === `dev-${index}`){
            const newDevs = [...steamData.devs]
            newDevs[index] = e.target.value
            setSteamData({...steamData, devs: newDevs})
            console.log(steamData.devs);
        }
        if (e.target.id === `pub-${index}`){
            const newPubs = [...steamData.pubs]
            newPubs[index] = e.target.value
            setSteamData({...steamData, pubs: newPubs})
            console.log(steamData.pubs);
        }
    };

    return (
        <div className="max-w-lg mx-auto my-5">
            {loading ? "Loading...." : ""}
            {error && (
                <p>{error}</p>
            )}

                { steamData && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-wrap">
                        <div  className="flex flex-col gap-4 w-2xl">
                            <TextField
                                required
                                id="name"
                                label="Name"
                                defaultValue="name"
                                variant="standard"
                                value={steamData.name}
                                onChange={handleChange}
                                fullWidth
                                type="text"
                            />
                            <TextField
                                required
                                id="steamUrl"
                                label="Steam Url"
                                defaultValue="https://store.steam.com"
                                variant="standard"
                                value={steamData.steamUrl}
                                onChange={handleChange}
                                fullWidth
                                type="text"
                            />

                            <Accordion>
                                <AccordionSummary
                                expandIcon={<FaCaretDown />}
                                >
                                    Game Descriptions
                                </AccordionSummary>
                                <AccordionDetails className="flex flex-col gap-5">
                                    <TextField
                                        required
                                        id="description"
                                        label="Description"
                                        defaultValue="description...."
                                        variant="standard"
                                        value={steamData.description}
                                        onChange={handleChange}
                                        multiline
                                        rows={10}
                                        fullWidth
                                        type="text"
                                    />
                                    <TextField
                                        required
                                        id="shortDescription"
                                        label="Short Description"
                                        defaultValue="short description...."
                                        variant="standard"
                                        value={steamData.shortDescription}
                                        onChange={handleChange}
                                        multiline
                                        rows={4}
                                        fullWidth
                                        type="text"
                                    />

                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<FaCaretDown />}
                                >
                                    Meta Information
                                </AccordionSummary>
                                <AccordionDetails className="flex flex-col gap-5">
                                    <TextField
                                        id="website"
                                        label="Website"
                                        defaultValue="https://store.steam.com"
                                        variant="standard"
                                        value={steamData.website}
                                        onChange={handleChange}
                                        fullWidth
                                        type="text"
                                    />
                                    <div className="flex flex-col gap-1 flex-wrap">
                                        <InputLabel htmlFor="genres">Genres</InputLabel>
                                        <div className="p-2 bg-slate-200 flex flex-col gap-2">
                                            {steamData.genres && steamData.genres.map((item, index) => (
                                                <TextField
                                                    required
                                                    key={index}
                                                    id={`genre-${index}`}
                                                    defaultValue="genre"
                                                    variant="standard"
                                                    value={item}
                                                    onChange={(e)=> handleChange(e,index)}

                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 flex-wrap">
                                        <InputLabel htmlFor="price">Price</InputLabel>
                                        <Input
                                            id="price"
                                            type="number"
                                            label="Price"
                                            value={steamData.price}
                                            onChange={handleChange}
                                            startAdornment={<InputAdornment position="start">₹</InputAdornment>}/>
                                    </div>

                                    <div  className="flex flex-col gap-1 flex-wrap">
                                        <InputLabel htmlFor="developers">Developers</InputLabel>

                                        <div className="p-2 bg-slate-200 flex flex-col gap-2">
                                            {steamData.devs && steamData.devs.map((item, index) => (
                                                <TextField
                                                    required
                                                    key={index}
                                                    id={`dev-${index}`}
                                                    defaultValue="dev"
                                                    variant="standard"
                                                    value={item}
                                                    onChange={(e)=> handleChange(e,index)}

                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div  className="flex flex-col gap-1 flex-wrap">
                                        <InputLabel htmlFor="publishers">Publishers</InputLabel>
                                        <div className="p-2 flex flex-col bg-slate-200 gap-2">
                                            {steamData.pubs && steamData.pubs.map((item, index) => (
                                                <TextField
                                                    required
                                                    fullWidth
                                                    key={index}
                                                    id={`pub-${index}`}
                                                    defaultValue="dev"
                                                    variant="standard"
                                                    value={item}
                                                    onChange={(e)=> handleChange(e,index)}

                                                />
                                            ))}
                                        </div>

                                    </div>


                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<FaCaretDown />}
                                >
                                    Media (Screenshots & Trailers)
                                </AccordionSummary>
                                <AccordionDetails className="flex flex-col gap-5">
                                    <InputLabel htmlFor="screenshots">Screenshots</InputLabel>
                                    <div className="flex flex-row gap-3 flex-wrap">
                                        {steamData.screenshots && steamData.screenshots.map(screenshot => (
                                            <img src={screenshot} alt="" className="w-1/4 h-auto cursor-pointer transition-transform hover:scale-105"/>
                                        ))}
                                    </div>

                                    <InputLabel htmlFor="trailers">Trailers</InputLabel>
                                    <div className="flex flex-row flex-wrap gap-2">
                                        {steamData.trailer && steamData.trailer.map((item, index) => (
                                            <video poster={item.tumbnail} className="w-1/3 h-auto" src={item.trailer} controls title={item.name}/>
                                        ))}
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<FaCaretDown />}
                                >
                                    Additional Media
                                </AccordionSummary>
                                <AccordionDetails className="flex flex-col gap-5">
                                    <div>
                                        <InputLabel htmlFor="header image">Header Image</InputLabel>
                                        <img src={steamData.headerImage} alt=""/>
                                        <TextField
                                            required
                                            id="headerImage"
                                            variant="standard"
                                            value={steamData.headerImage}
                                            onChange={handleChange}
                                            fullWidth
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="publishers">Capsule Image</InputLabel>
                                        <img src={steamData.capsuleImage} alt=""/>
                                        <TextField
                                            required
                                            id="capsuleImage"
                                            variant="standard"
                                            value={steamData.capsuleImage}
                                            onChange={handleChange}
                                            fullWidth
                                            type="text"
                                        />
                                    </div>

                                </AccordionDetails>
                            </Accordion>





                            <Button variant="contained" color="success" type="submit" className="rounded-sm p-2 bg-green-500 w-1/2 cursor-pointer hover:opacity-90">Add game to the database</Button>
                        </div>




                    </form>
                )}
        </div>
    )
}