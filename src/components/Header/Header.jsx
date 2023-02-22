import {useContext} from "react";
import {Link} from "react-router-dom";
import {useCart} from "../../hooks/useCart";
import AppContext from "../../context";

import "./Header.scss";

import cartIcon from "../../assets/svg/cart.svg";
import heartIcon from "../../assets/svg/heart.svg";
import userIcon from "../../assets/svg/user.svg";
import logo from "../../assets/brand/logo.png";

const Header = () => {
	const {totalPrice} = useCart();
	const {setCartOpened} = useContext(AppContext);

	return (
		<header className="header">
			<div className="container">
				<div className="header__inner">
					<Link to="/">
						<div className="header__left">
							<img src={logo} aria-hidden="true" className="logo" />
							<div className="header__info">
								<h3 className="header__info-title">GPU online shop</h3>
								<p className="header__info-text">Best GPUs only here!</p>
							</div>
						</div>
					</Link>

					<div className="header__right">
						<ul className="header__menu">
							<li onClick={() => setCartOpened(true)} className="header__menu-item">
								<img src={cartIcon} alt="cart-icon" />
								<span>{totalPrice} &euro;</span>
							</li>
							<Link to="/favorites">
								<li className="header__menu-item">
									<img src={heartIcon} alt="heart-icon" />
								</li>
							</Link>

							<Link to="/orders">
								<li className="header__menu-item">
									<img src={userIcon} alt="user-icon" />
								</li>
							</Link>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
