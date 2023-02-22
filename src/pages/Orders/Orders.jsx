import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import Card from "../../components/Card/Card";
import PageInfo from "../../components/PageInfo/PageInfo";

import "./Orders.scss";

import arrowLeft from "../../assets/svg/arrow-left.svg";
import sadImg from "../../assets/svg/sad-img.svg";

const Orders = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
				setOrders(data.map((item) => item));
			} catch (error) {
				alert("Error while requesting orders");
				console.error(error);
			}
		})();
	}, []);

	return (
		<section className="orders">
			<div className="container">
				{!orders.length ? (
					<PageInfo
						img={sadImg}
						title="You have not ordered any products"
						text="Make at least one order."
					/>
				) : (
					<>
						<div className="content__header orders">
							<Link to="/">
								<img src={arrowLeft} alt="arrow-left" />
							</Link>
							<h1>My orders</h1>
						</div>

						{orders.map((obj) => (
							<div className="order" key={obj.id}>
								<div className="order__header">
									<div className="order__header-left">
										<h2>Order #{obj.id}</h2>
									</div>

									<div className="order__header-right">
										<span>{obj.orderedAt}</span>
										<span>
											Order total price: <strong>{obj.orderPrice} &euro;</strong>
										</span>
									</div>
								</div>

								<div className="products__grid">
									{obj.items.map((item) => (
										<Card key={item.id} {...item} />
									))}
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default Orders;
