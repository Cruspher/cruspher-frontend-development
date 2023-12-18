import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
	AiFillFacebook,
	AiFillInstagram,
	BsTelegram,
	BsTwitter,
	BsWhatsapp,
	BsYoutube,
} from "react-icons/all";
import { LayoutDefault } from "../../components/layouts/layout-default";
import { getSocialsRequest } from "../../actions/social";
import { toast } from "react-toastify";
import { Loading } from "../../components/cruspher-ui/loading";
import c from "./style.module.scss";

const returnClassBySocialColorType = (type) => {
	if (type === "youtube") return c.youtubeIcon;
	if (type === "twitter") return c.twitterIcon;
	if (type === "whatsApp") return c.whatsAppIcon;
	if (type === "facebook") return c.facebookIcon;
	if (type === "instagram") return c.instagramIcon;
	if (type === "telegram") return c.telegramIcon;
	return c.youtubeIcon;
};

const socialListIcons = [
	{
		icon: <BsYoutube />,
		type: "youtube",
	},
	{
		icon: <BsTwitter />,
		type: "twitter",
	},
	{
		icon: <BsWhatsapp />,
		type: "whatsapp",
	},
	{
		icon: <AiFillFacebook />,
		type: "facebook",
	},
	{
		link: "#",
		icon: <AiFillInstagram />,
		type: "instagram",
	},
	{
		type: "telegram",
		icon: <BsTelegram />,
	},
];

const ContactsPage = () => {
	const intl = useIntl();
	const notify = (text) => toast(text);
	const [isLoading, setIsLoading] = useState(false);
	const [socialList, setSocialList] = useState([]);

	useEffect(() => {
		getSocialRequest();
	}, []);

	const getSocialRequest = async () => {
		setIsLoading(true);
		const data = await getSocialsRequest();

		data.map((item) => {
			socialListIcons.forEach((elem) => {
				if (item.name.toLowerCase() === elem.type) {
					item.icon = elem.icon;
				}
			});

			return item;
		});

		const newData = data.filter((item) => {
			return !!item.isActive;
		});

		if (data) {
			setSocialList(newData);
		} else {
			notify(intl.formatMessage({ id: "unknown_error" }));
		}

		setIsLoading(false);
	};

	const body = isLoading ? (
		<Loading />
	) : (
		<ul className={c.list}>
			{socialList.map((social) => (
				<li
					key={Math.random().toString()}
					className={returnClassBySocialColorType(social.name)}
				>
					<a
						target="_blank"
						className={c.link}
						href={social.link}
						rel="noreferrer"
					>
						{social.icon}
					</a>
				</li>
			))}
		</ul>
	);

	return (
		<LayoutDefault hidePadding={true}>
			<div className={c.container}>{body}</div>
		</LayoutDefault>
	);
};

export { ContactsPage };
