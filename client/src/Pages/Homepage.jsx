import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "../assets/css/index.css"
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

export default function Homepage() {

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
            <div class="main-container">
                <div class="shop" id="shop">
                    {games && games.map(item => (
                        <div class="prod" id={`prod-id-${item._id}`}>
                            <div class="prod-image">
                                <Link to={`/product/${item._id}`}>
                                    <img src={item.headerImage} alt=""/>
                                </Link>
                            </div>

                            <div class="prod-info">
                                <div class="prod-details">
                                    <a href="" class="item-title">{item.name}</a>
                                    <span class="item-price">₹{item.price}</span>
                                </div>

                                <div classr="prod-action">
                                    <a id="addToCart">
                                        <div class="prod-cart">
                                            <p>ADD TO CART</p>
                                        </div>
                                    </a>
                                    <a id="addToWishlist">
                                        <div class="prod-wishlist">
                                            <p>WISHLIST</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>

    )
}