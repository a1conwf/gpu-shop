import {Link} from "react-router-dom";

import Card from "../../components/Card/Card";
import PageInfo from "../../components/PageInfo/PageInfo";

import arrowLeft from "../../assets/svg/arrow-left.svg";
import cryingImg from "../../assets/svg/crying-img.svg";

const Favorites = ({favorites, onRemoveFavorite}) => {
	return (
		<section className="favorites">
			<div className="container">
				{favorites.length ? (
					<>
						<div className="content__header favorites">
							<Link to="/">
								<img src={arrowLeft} alt="arrow-left" />
							</Link>

							<h1>My favorites</h1>
						</div>

						<div className="products__grid">
							{favorites.map((product) => (
								<Card
									key={product.id}
									favorite
									onFavorite={(obj) => onRemoveFavorite(obj.id)}
									{...product}
								/>
							))}
						</div>
					</>
				) : (
					<PageInfo
						img={cryingImg}
						title="No products in favorites :("
						text="Add at least one product to favorites."
					/>
				)}
			</div>
		</section>
	);
};

export default Favorites;
