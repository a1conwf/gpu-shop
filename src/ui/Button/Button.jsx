import React, {useContext} from "react";
import AppContext from "../../context";
import {Link} from "react-router-dom";

import "./Button.scss";

import arrowImg from "../../assets/svg/arrow.svg";

const Button = ({text, handleClick, btnCheckout, btnDisabled}) => {
	const {cartOpened} = useContext(AppContext);

	return (
		<>
			{cartOpened ? (
				<button
					className={btnCheckout ? "btn checkout" : "btn"}
					onClick={handleClick}
					disabled={btnDisabled}
				>
					<img src={arrowImg} aria-hidden="true" />
					{text}
				</button>
			) : (
				<Link to="/">
					<button className="btn">
						<img src={arrowImg} aria-hidden="true" />
						{text}
					</button>
				</Link>
			)}
		</>
	);
};

export default Button;
