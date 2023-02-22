import React, {useContext} from "react";
import AppContext from "../../context";

import Button from "../../ui/Button/Button";

import "./CartInfo.scss";

const CartInfo = ({title, description, img}) => {
	const {setCartOpened} = useContext(AppContext);

	return (
		<div className="cart__info">
			<img className="cart__info-img" src={img} alt="empty-card" />
			<h2 className="cart__info-title">{title}</h2>
			<p className="cart__info-text">{description}</p>
			<Button className="btn" text="Go back" handleClick={() => setCartOpened(false)} />
		</div>
	);
};

export default CartInfo;
