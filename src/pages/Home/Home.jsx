import Card from "../../components/Card/Card";

import "./Home.scss";

import searchIcon from "../../assets/svg/search.svg";
import btnRemoveImg from "../../assets/svg/btn-remove.svg";

const Home = (props) => {
	const {
		products,
		searchValue,
		setSearchValue,
		onAddToFavorites,
		isProductInFavorites,
		onAddToCart,
		isLoading,
	} = props;

	const renderProducts = () => {
		const filteredProducts = products.filter((product) =>
			product.name.toLowerCase().includes(searchValue.toLowerCase())
		);

		return (isLoading ? [...Array(8)] : filteredProducts).map((product, idx) => (
			<Card
				key={isLoading ? idx : product.id}
				onFavorite={(obj) => onAddToFavorites(obj)}
				favorite={!isLoading && isProductInFavorites(product.id)}
				onAdd={(obj) => onAddToCart(obj)}
				loading={isLoading}
				{...product}
			/>
		));
	};

	return (
		<main className="main">
			<div className="container">
				<div className="content__header">
					<h1>{searchValue ? `Searching by: "${searchValue}"` : "All GPUs"}</h1>
					<div className="search__block">
						<img src={searchIcon} aria-hidden="true" />
						{searchValue && (
							<img
								onClick={() => setSearchValue("")}
								src={btnRemoveImg}
								alt="remove-img"
								className="btn-remove"
							/>
						)}
						<input
							onChange={(e) => setSearchValue(e.target.value)}
							value={searchValue}
							type="text"
							placeholder="Search..."
						/>
					</div>
				</div>

				<div className="products__grid">{renderProducts()}</div>
			</div>
		</main>
	);
};

export default Home;
