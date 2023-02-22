import {useContext} from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

import "./Card.scss";

import plusImg from "../../assets/svg/btn-plus.svg";
import checkedImg from "../../assets/svg/btn-checked.svg";
import unlikeImg from "../../assets/svg/unliked.svg";
import likedImg from "../../assets/svg/liked.svg";

const Card = (props) => {
	const {id, img, name, price, onAdd, onFavorite, favorite = false, loading = false} = props;

	const {isProductInCart} = useContext(AppContext);
	const productObj = {id, parentId: id, name, img, price};

	const handleAddClick = () => {
		onAdd(productObj);
	};

	const handleFavoriteClick = () => {
		onFavorite(productObj);
	};

	return (
		<>
			{loading ? (
				<ContentLoader
					speed={2}
					width={220}
					height={350}
					viewBox="0 0 160 250"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="20" y="50" rx="10" ry="10" width="130" height="50" />
					<rect x="20" y="120" rx="5" ry="5" width="120" height="20" />
					<rect x="20" y="170" rx="5" ry="5" width="80" height="25" />
					<rect x="126" y="170" rx="5" ry="5" width="25" height="25" />
				</ContentLoader>
			) : (
				<div className="card">
					<div className="card__top">
						<div onClick={handleFavoriteClick} className="card__heart">
							{onFavorite && <img src={favorite ? likedImg : unlikeImg} alt="heart-img" />}
						</div>
						<img src={img} alt="gpu-img" className="card__img" />
						<p className="card__name">{name}</p>
					</div>

					<div className="card__bottom">
						<div className="pricing">
							<div className="pricing__info">
								<span className="pricing__info-title">Price: </span>
								<span className="pricing__info-amount">{price} &euro;</span>
							</div>

							{onAdd && (
								<img
									className="add-btn"
									src={isProductInCart(id) ? checkedImg : plusImg}
									alt="plus-img"
									onClick={handleAddClick}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Card;
