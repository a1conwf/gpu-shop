import {useState, useContext} from "react";
import axios from "axios";
import {useCart} from "../../hooks/useCart";
import AppContext from "../../context";
import {format} from "date-fns";

import CartInfo from "../CartInfo/CartInfo";
import Button from "../../ui/Button/Button";

import "./Cart.scss";

import orderCompletedImg from "../../assets/img/complete-order.jpg";
import emptyCartImg from "../../assets/img/empty-cart.jpg";
import btnRemoveImg from "../../assets/svg/btn-remove.svg";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Cart = ({onRemoveProduct}) => {
	const [isOrderCompleted, setIsOrderCompleted] = useState(false);
	const [orderId, setOrderId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const {cartOpened, setCartOpened} = useContext(AppContext);
	const {cartItems, setCartItems, totalPrice} = useCart();

	const onCheckoutClick = async () => {
		try {
			setIsLoading(true);
			const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
				items: cartItems,
				orderedAt: format(new Date(), "dd/MM/yyyy' 'HH:mm"),
				orderPrice: totalPrice,
			});
			setOrderId(data.id);
			setIsOrderCompleted(true);
			setCartItems([]);

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete(`${import.meta.env.VITE_API_URL}/cart/` + item.id);
				delay(1000);
			}
		} catch (error) {
			alert("Error while making an order");
			console.error(error);
		}
		setIsLoading(false);
	};

	return (
		<>
			<div className={`overlay ${cartOpened ? "overlay__visible" : ""}`}>
				<aside className="cart">
					<div className="cart__header">
						<h2 className="cart__header-title">Cart</h2>
						<img
							onClick={() => setCartOpened(false)}
							src={btnRemoveImg}
							alt="remove-img"
							className="cart__header-btn"
						/>
					</div>

					{cartItems.length > 0 ? (
						<>
							<div className="cart__items">
								{cartItems.map((item) => (
									<div className="cart__item" key={item.name}>
										<img src={item.img} alt="gpu-img" className="cart__item-img" />

										<div className="cart__item-info">
											<p className="cart__item-info-name">{item.name.slice(0, 30) + "..."}</p>
											<span className="cart__item-info-price">{item.price} &euro;</span>
										</div>

										<img
											onClick={() => onRemoveProduct(item.id)}
											src={btnRemoveImg}
											alt="remove-img"
											className="cart__item-btn"
										/>
									</div>
								))}
							</div>
							<ul className="total">
								<li className="total__item">
									<span className="total__item-name">Total: </span>
									<div className="total__item-separator"></div>
									<span className="total__item-sum">{totalPrice} &euro;</span>
								</li>
								<li className="total__item">
									<span className="total__item-name">Fee 20%: </span>
									<div className="total__item-separator"></div>
									<span className="total__item-sum">{(totalPrice * 0.2).toFixed(2)} &euro;</span>
								</li>
							</ul>

							<Button
								btnCheckout
								btnDisabled={isLoading}
								handleClick={onCheckoutClick}
								text="Checkout"
							/>
						</>
					) : (
						<CartInfo
							title={isOrderCompleted ? "The order has been placed" : "Cart is empty"}
							description={
								isOrderCompleted
									? `Your order #${orderId} will be delivered to courier soon`
									: "Add at least one GPU to place an order."
							}
							img={isOrderCompleted ? orderCompletedImg : emptyCartImg}
						/>
					)}
				</aside>
			</div>
		</>
	);
};

export default Cart;
