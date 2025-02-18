import {useState, useEffect} from "react";
import {Link} from "react-router-dom";



export default function AllGames() {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchAllGames () {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8080/game/fetchall`)
                const games = await res.json()
                setGames(games)
                console.log(games)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }
        fetchAllGames();
    }, [])

    return (
        <div>
            <div class="warning"><p></p></div>
            <div >
                <div >
                    {games && games.map(item => (
                        <div>
                            <div className="flex flex-row item-center">
                                <Link to={`/edit/${item._id}`}>
                                    <img src={item.capsuleImage} className="w-[100px]"/>
                                </Link>
                                <div>
                                    <a href=""  className="flex flex-row item-center" >{item.name}</a>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>

    )
}