import React, {useContext} from "react";
import c from "./style.module.scss";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import jwtDecode from "jwt-decode";
import {BackgroundLogo} from "../cruspher-ui/background-logo";
import {useIntl} from "react-intl";
import {APPRoutes} from "../../const/APP-routes";
import image from "./menu-bg.jpg";

const MobileMenu = ({isMenuActive, toggleMenuHandler}) => {
	const intl = useIntl();
	const auth = useContext(AuthContext);
	const role = jwtDecode(auth.token).role;
	const {logout} = useContext(AuthContext);
	const wrapClass = isMenuActive ? `${c.wrap} ${c.wrapActive}` : c.wrap;

	const menuList = [
		// {
		//   title: intl.formatMessage({id: 'profile'}),
		//   link: APPRoutes.home
		// },
		// {
		//   title: intl.formatMessage({id: 'cruspher'}),
		//   link: APPRoutes.game
		// },
		// {
		//   title: intl.formatMessage({id: 'tables'}),
		//   link: APPRoutes.tables
		// },
		{
			title: intl.formatMessage({id: "news"}),
			link: APPRoutes.news,
		},
		{
			title: intl.formatMessage({id: "forum"}),
			link: APPRoutes.forum,
		},
		// {
		//   title: intl.formatMessage({id: 'statistics'}),
		//   link: APPRoutes.statistics
		// },
		{
			title: intl.formatMessage({id: "contacts"}),
			link: APPRoutes.contacts,
		},
	];

	return (
		<div style={{backgroundImage: `url(${image})`}} className={wrapClass}>
			<BackgroundLogo />

			<ul className={c.list}>
				{menuList &&
					menuList.map((item) => (
						<li key={Math.random().toString()} data-text={item.title}>
							<Link to={item.link}>{item.title}</Link>
						</li>
					))}

				{/* <li data-text={intl.formatMessage({ id: "trophy_room" })}>
					<Link to={APPRoutes.trophies}>
						{intl.formatMessage({ id: "trophy_room" })}
					</Link>
				</li> */}

				{(role === "admin" || role === "translator") && (
					<li
						id={c.reports}
						data-text={intl.formatMessage({id: "forum_reports"})}
					>
						<Link to={APPRoutes.adminForumReports}>
							{intl.formatMessage({id: "forum_reports"})}
						</Link>
					</li>
				)}

				{role === "admin" && (
					<li id={c.admin} data-text={intl.formatMessage({id: "admin_menu"})}>
						<Link to={APPRoutes.adminSettings}>
							{intl.formatMessage({id: "admin_menu"})}
						</Link>
					</li>
				)}

				<li data-text={intl.formatMessage({id: "logout"})} id={c.exit}>
					<Link
						onClick={(e) => {
							e.preventDefault();
							logout();
						}}
						to="/"
					>
						{intl.formatMessage({id: "logout"})}
					</Link>
				</li>
			</ul>
			{/* <div className={c.link}>FootBall News</div> */}
		</div>
	);
};

export {MobileMenu};
