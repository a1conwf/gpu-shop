import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import axios from "axios";
import AppContext from "./context";

import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import Orders from "./pages/Orders/Orders";

import "./App.scss";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [cartOpened, setCartOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favoritesResponse, productsResponse] = await Promise.all([
					axios.get(`${import.meta.env.VITE_API_URL}/cart`),
					axios.get(`${import.meta.env.VITE_API_URL}/favorites`),
					axios.get(`${import.meta.env.VITE_API_URL}/items`),
				]);

				setIsLoading(false);
				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setProducts(productsResponse.data);
			} catch (error) {
				alert("Error while requesting data");
				console.error(error);
			}
		}

		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		try {
			const foundItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));

			if (foundItem) {
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${foundItem.id}`);
			} else {
				setCartItems((prev) => [...prev, obj]);
				const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, obj);
				setCartItems((prev) =>
					prev.map((item) => {
						if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.id,
							};
						}
						return item;
					})
				);
			}
		} catch (error) {
			alert("Error while adding product to cart");
			console.error(error);
		}
	};

	const onRemoveProduct = async (id) => {
		try {
			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
			axios.delete(`${import.meta.env.VITE_API_URL}/cart/${id}`);
		} catch (error) {
			alert("Error while deleting product from cart");
			console.error(error);
		}
	};

	const onAddToFavorites = async (obj) => {
		try {
			const foundItem = favorites.find((item) => Number(item.parentId) === Number(obj.id));

			if (foundItem) {
				setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${foundItem.id}`);
			} else {
				setFavorites((prev) => [...prev, obj]);
				const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, obj);
				setFavorites((prev) =>
					prev.map((item) => {
						if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.id,
							};
						}
						return item;
					})
				);
			}
		} catch (error) {
			alert("Error while adding product to favorites");
			console.error(error);
		}
	};

	const onRemoveFavorite = (id) => {
		try {
			setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
			axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${id}`);
		} catch (error) {
			alert("Error while deleting product from favorites");
			console.error(error);
		}
	};

	const isProductInCart = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};

	const isProductInFavorites = (id) => {
		return favorites.some((obj) => Number(obj.parentId) === Number(id));
	};

	return (
		<>
			<AppContext.Provider
				value={{
					cartItems,
					setCartItems,
					cartOpened,
					setCartOpened,
					isProductInCart,
				}}
			>
				<Cart onRemoveProduct={onRemoveProduct} />

				<Header />

				<Routes>
					<Route
						path="/"
						element={
							<Home
								products={products}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onAddToFavorites={onAddToFavorites}
								isProductInFavorites={isProductInFavorites}
								onAddToCart={onAddToCart}
								isLoading={isLoading}
							/>
						}
					/>
					<Route
						path="/favorites"
						element={<Favorites favorites={favorites} onRemoveFavorite={onRemoveFavorite} />}
					/>
					<Route path="/orders" element={<Orders />} />
				</Routes>
			</AppContext.Provider>
		</>
	);
};

export default App;
