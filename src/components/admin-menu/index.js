import React from "react";
import {
	AiFillSetting,
	BiFootball,
	BsFileEarmarkPersonFill,
	GiHumanTarget,
	GiNewspaper,
	GiTrophy,
	MdOutlineForum,
	SiOpslevel,
	TiSocialAtCircular,
} from "react-icons/all";
import { useNavigate } from "react-router-dom";
import { APPRoutes } from "../../const/APP-routes";
import c from "./style.module.scss";

const screens = [
	{
		key: "games",
		icon: <BiFootball />,
		link: APPRoutes.adminGames,
	},
	{
		key: "players",
		icon: <BsFileEarmarkPersonFill />,
		link: APPRoutes.adminPlayers,
	},
	{
		key: "news",
		icon: <GiNewspaper />,
		link: APPRoutes.adminNews,
	},
	{
		key: "forum",
		icon: <MdOutlineForum />,
		link: APPRoutes.adminForum,
	},
	{
		key: "social",
		icon: <TiSocialAtCircular />,
		link: APPRoutes.adminSocial,
	},
	{
		key: "levels",
		icon: <SiOpslevel />,
		link: APPRoutes.adminLevels,
	},
	{
		key: "shop",
		icon: <GiHumanTarget />,
		link: APPRoutes.adminShop,
	},
	{
		key: "trophy",
		icon: <GiTrophy />,
		link: APPRoutes.adminTrophy,
	},
	{
		key: "settings",
		icon: <AiFillSetting />,
		link: APPRoutes.adminSettings,
	},
];

const ItemComponent = ({ item, name }) => {
	const itemClass = item.key === name ? `${c.icon} ${c.iconActive}` : c.icon;

	return <span className={itemClass}>{item.icon}</span>;
};

const AdminMenu = ({ name }) => {
	const navigate = useNavigate();

	return (
		<div className={c.navigation}>
			{screens.map((item, index) => (
				<div
					key={index}
					onClick={() => navigate(item.link)}
					className={item.key === name ? c.itemActive : null}
				>
					<ItemComponent item={item} name={name} />
				</div>
			))}
		</div>
	);
};

export { AdminMenu };
