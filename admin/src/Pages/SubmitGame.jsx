import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { GoLinkExternal } from "react-icons/go";


export default function SubmitGame() {
    const [gameId, setGameId] = useState(null);
    const [steamData, setSteamData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        shortDescription: "",
        price:0,
        devs:[],
        pubs:[],
        website:[],
        headerImage:"",
        capsuleImage:"",
        screenshots:[],
        genres: [],
        trailer:[],
        steamUrl: ""
    });

    useEffect(() => {
        if (steamData[gameId]?.data) {
            setFormData((prev) => ({
                ...prev,
                name: steamData[gameId].data.name || "",
                description: steamData[gameId].data.detailed_description || "",
                shortDescription: steamData[gameId].data.short_description || "",
                price: parseInt(steamData[gameId].data.price_overview["final_formatted"].replace("₹", "").replace(",", "")) || 0,
                devs: steamData[gameId].data.developers || "",
                pubs: steamData[gameId].data.publishers || "",
                website: steamData[gameId].data.website || "",
                headerImage: steamData[gameId].data.header_image || "",
                capsuleImage: steamData[gameId].data.capsule_image || "",
                screenshots: steamData[gameId].data.screenshots.map(screenshot=>screenshot.path_thumbnail) || [],
                genres: steamData[gameId].data.genres.map(genre=> genre.description) || [],
                trailer: steamData[gameId].data.movies.map(movie => ({tumbnail: movie.thumbnail, trailer: movie.webm["480"], name:movie.name})) || [],
                steamUrl: "https://store.steampowered.com/app/"+gameId  || ""
            }));
        }
    }, [steamData, gameId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
    }

    const handleIdChange = async (e)   => {
        const id = e.target.value;
        console.log(id);
        setGameId(id);
    }

    const handleImage = (e) => {
        console.log(e.target.currentSrc);
        const imgModal = document.getElementById("imgModal");
        const imgOverlay = document.getElementById("imgOverlay");
        const imgElement = document.getElementById("modalImage");
        imgElement.src = e.target.currentSrc
        // .replace(".600x338", "");
        imgModal.classList.remove("hidden");
        imgOverlay.classList.remove("hidden");


        imgModal.appendChild(imgModalImg);
    };

    const closeModal = () => {
        document.getElementById("imgModal").classList.add("hidden");
        document.getElementById("imgOverlay").classList.add("hidden");
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    console.log(formData);

    const handleClick = async () =>{
        setLoading(true);
        if (gameId){
            try {
                console.log('gameid is', gameId);
                const res = await fetch(`http://localhost:8080/steam/get/${gameId}`)
                const data = await res.json();
                console.log(data);
                setSteamData(data);
            } catch (error) {
                console.log('error is', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            <div className="max-w-lg mx-auto">
                <div className="flex flex-row gap-2 items-center  border-b-gray-700 border-1 p-3 justify-between">
                    <h2 className="font-semibold text-lg">Enter Steam-Id</h2>
                    <input type="text" className="border-1 p-2 rounded-sm" placeholder="id" onChange={handleIdChange} />
                    <button onClick={handleClick} className="rounded-sm p-2 bg-green-500 cursor-pointer hover:opacity-90">Fetch Data</button>
                    {loading ? <img src="https://www.wpfaster.org/wp-content/uploads/2013/06/loading-gif.gif" className="w-[40px] h-auto" alt=""/> : null}
                </div>

               { steamData[gameId] && (
                    <form onSubmit={handleSubmit} className="flex flex-row gap-3 space-between flex-wrap">
                        <div  className="flex flex-col gap-1">
                            <div className="flex flex-row gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">Name: </label>
                                <input type="text" id="name" value={formData.name} onChange={handleChange}  placeholder="name" />
                            </div>
                            <div className="flex flex-row gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">SteamURL: </label>
                                <div className="flex flex-row gap-2 items-center">
                                    <a href={formData.steamUrl}><GoLinkExternal  className="w-[1em] h-[1em]"/></a>
                                    <input type="text" id="name" className="w-full border-1" value={formData.steamUrl} onChange={handleChange}  placeholder="name" />
                                </div>
                            </div>
                            <label htmlFor="" className="font-semibold underline uppercase">Description: </label>
                            <textarea className="border-1 p-1 rounded-sm" id="description"  value={formData.description} placeholder="descriptions ......"/>
                            <label htmlFor="" className="font-semibold underline uppercase">Short Description: </label>
                            <textarea className="border-1 w-2xl h-auto pb-2" id="shortDescription" value={formData.shortDescription} placeholder="short descriptions ......"/>
                            <div  className="flex flex-col gap-1 flex-wrap">
                                <label className="font-semibold underline uppercase" htmlFor="">Genres: </label>
                                {formData.genres && formData.genres.map((item, index) => (
                                    <input type="text" placeholder="genres..." value={item} onChange={handleChange} className="border-1 w-full p-1 my-1" />
                                ))}

                            </div>
                            <div  className="flex flex-row gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">Price (in ₹): </label>
                                <input type="text" placeholder="price" value={formData.price}/>
                            </div>
                            <div  className="flex flex-row gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">Devs: </label>
                                <input type="text" className="border-1 w-full" placeholder="devs" value={formData.devs} onChange={handleChange}/>
                            </div>
                            <div  className="flex flex-row gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">Pubs: </label>
                                <input type="text" className="border-1 w-full" placeholder="pubs" value={formData.pubs} onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">Screenshots: </label>
                                <div className="flex flex-row gap-2 flex-wrap">
                                    {steamData && steamData[gameId].data.screenshots.map(screenshot => (
                                        <img src={screenshot.path_thumbnail} onClick={handleImage} alt="" className="w-1/4 h-auto cursor-pointer transition-transform hover:scale-105"/>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className="font-semibold underline uppercase">Trailer: </label>
                            <div className="flex flex-row flex-wrap gap-2">
                                {formData.trailer && formData.trailer.map((item, index) => (
                                        <video poster={item.tumbnail} className="w-1/3 h-auto" src={item.trailer} controls title={item.name}/>
                                ))}
                            </div>

                            <div>
                                <label htmlFor="">Website: </label>
                                <input type="text" value={formData.website} onChange={handleChange} placeholder="website"/>
                            </div>
                            <div>
                                <label htmlFor="">Header Image: </label>
                                <img src={formData.headerImage} alt=""/>
                                <input type="text" value={formData.headerImage} className="w-full h-auto" onChange={handleChange} placeholder="headerImage"/>
                            </div>
                            <div>
                                <label htmlFor="">Capsule Image: </label>
                                <img src={formData.capsuleImage} alt=""/>
                                <input type="text" placeholder="capsuleImage" className="w-full h-auto" value={formData.capsuleImage} onChange={handleChange}/>
                            </div>
                        </div>


                    </form>
                )}

            </div>



            <div id="imgOverlay" className="hidden fixed top-0 left-0 w-full h-full bg-black opacity-80 z-40" onClick={closeModal}></div>

            <div
                id="imgModal"
                className="hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-50 flex flex-col items-center"
            >
                <button
                    onClick={closeModal}
                    className="absolute top-1 right-1 cursor-pointer"
                >
                    <IoIosCloseCircle className="h-5 w-5" />
                </button>
                <img id="modalImage" className="max-w-full max-h-[80vh] rounded-lg shadow-lg" />
            </div>
        </>
    )
}