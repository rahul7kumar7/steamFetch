import {useState, useEffect} from "react";

export default function SubmitGame() {
    const [gameId, setGameId] = useState(null);
    const [steamData, setSteamData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        shortDescription: "",
        category:[],
        price:0,
        devs:[],
        pubs:[],
        website:[],
        headerImage:"",
        capsuleImage:"",
        screenshots:[]
    });

    useEffect(() => {
        if (steamData[gameId]?.data) {
            setFormData((prev) => ({
                ...prev,
                name: steamData[gameId].data.name || "",
                description: steamData[gameId].data.detailed_description || "",
                shortDescription: steamData[gameId].data.short_description || "",
                price: 0,
                devs: steamData[gameId].data.developers || "",
                pubs: steamData[gameId].data.publishers || "",
                website: steamData[gameId].data.website || "",
                headerImage: steamData[gameId].data.header_image || "",
                capsuleImage: steamData[gameId].data.capsule_image || "",
                screenshots: steamData[gameId].data.screenshots || [],
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
                        <div  className="flex flex-col">
                            <div className="flex flex-row gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">Name: </label>
                                <input type="text" id="name" value={formData.name} onChange={handleChange}  placeholder="name" />
                            </div>
                            <label htmlFor="" className="font-semibold underline uppercase">Description: </label>
                            <textarea className="w-2xl h-[150px] pb-2" id="description"  value={formData.description} placeholder="descriptions ......"/>
                            <label htmlFor="" className="font-semibold underline uppercase">Short Description: </label>
                            <textarea className="w-2xl h-[100px] pb-2" id="shortDescription" value={formData.shortDescription} placeholder="short descriptions ......"/>
                            <div  className="flex flex-row gap-2">
                                <label className="font-semibold underline uppercase" htmlFor="">Category: </label>
                                <input type="text" placeholder="category"/>
                            </div>
                            <div  className="flex flex-row gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">Price: </label>
                                <input type="text" placeholder="price"/>
                            </div>
                            <div  className="flex flex-row gap-2    ">
                                <label htmlFor="" className="font-semibold underline uppercase">Devs: </label>
                                <input type="text" placeholder="devs" value={formData.devs} onChange={handleChange}/>
                            </div>
                            <div  className="flex flex-row gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">Pubs: </label>
                                <input type="text" placeholder="pubs" value={formData.pubs} onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="font-semibold underline uppercase">Screenshots: </label>
                                <div className="flex flex-row gap-2 flex-wrap">
                                    {steamData && steamData[gameId].data.screenshots.map(screenshot => (
                                        <img src={screenshot.path_thumbnail} alt="" className="w-[220px] h-auto"/>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="">Trailer: </label>
                                {steamData[gameId].data.movies && (
                                    <video poster={steamData[gameId].data.movies[0].thumbnail} width="auto" height="393" src={steamData[gameId].data.movies[0].mp4[480]} controls/>
                                )}
                            </div>
                            <div>
                                <label htmlFor="">Website: </label>
                                <input type="text" value={formData.website} onChange={handleChange} placeholder="website"/>
                            </div>
                            <div>
                                <label htmlFor="">Header Image: </label>
                                <img src={formData.header_image} alt=""/>
                                <input type="text" value={formData.header_image} onChange={handleChange} placeholder="headerImage"/>
                            </div>
                            <div>
                                <label htmlFor="">Capsule Image: </label>
                                <img src={formData.capsule_image} alt=""/>
                                <input type="text" placeholder="capsuleImage" value={formData.capsule_image} onChange={handleChange}/>
                            </div>
                        </div>

                    </form>
                )}

            </div>
        </>
    )
}