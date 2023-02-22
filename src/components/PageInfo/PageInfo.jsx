import React from "react";

import Button from "../../ui/Button/Button";

import "./PageInfo.scss";

const PageInfo = ({img, title, text}) => {
	return (
		<div className="page__info">
			<img src={img} aria-hidden="true" className="page__info-img" />
			<h3 className="page__info-title">{title}</h3>
			<p className="page__info-text">{text}</p>
			<Button text="Go back" />
		</div>
	);
};

export default PageInfo;
