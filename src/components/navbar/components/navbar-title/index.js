import React from "react";
import c from "./style.module.scss";

const NavbarTitle = () => {
	return (
		<h2 className={c.title}>
			<img
				className={c.image}
				alt="alt"
				src={process.env.REACT_APP_TEAM_ICON}
			/>
		</h2>
	);
};

export {NavbarTitle};
