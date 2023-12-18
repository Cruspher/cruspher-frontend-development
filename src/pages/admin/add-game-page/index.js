import React, { useState } from "react";
import { LayoutDefault } from "../../../components/layouts/layout-default";
import { Wrap } from "../../../components/cruspher-ui/wrappers/wrap";
import {
	addNextGameRequest,
	getGamesFromAPIRequest,
} from "../../../actions/games";
import { GridBox } from "../../../components/cruspher-ui/box/grid-box";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { AddGameItem } from "./components/add-game-item";
import { Loading } from "../../../components/cruspher-ui/loading";
import { PageHeader } from "../../../components/items/page-header";
import { PageTitle } from "../../../components/cruspher-ui/title";
import { useNavigate } from "react-router-dom";
import { APPRoutes } from "../../../const/APP-routes";
import { FlexBox } from "../../../components/cruspher-ui/box/flexbox";
import { NeonButton } from "../../../components/cruspher-ui/buttons/neon-button";

const AddGamePage = () => {
	const intl = useIntl();
	const [isLoading, setIsLoading] = useState(false);
	const [gamesData, setGamesData] = useState([]);
	const navigate = useNavigate();

	const notify = (text) => toast(text);
	const getDataHandler = async () => {
		setIsLoading(true);
		const data = await getGamesFromAPIRequest({ isBefore: false });

		if (data) {
			const newData = data.response.map((game) => {
				return {
					status: game.fixture.status.long,
					league: game.league.name,
					round: game.league.round,
					home: game.teams.home.name,
					away: game.teams.away.name,
					homeId: game.teams.home.id,
					awayId: game.teams.away.id,
					homeAvatar: game.teams.home.logo,
					awayAvatar: game.teams.away.logo,
					date: game.fixture.date,
					timezone: game.fixture.timezone,
					city: game.fixture.venue.city ? game.fixture.venue.city : "",
					stadium: game.fixture.venue.name ? game.fixture.venue.name : "",
					fixture: game.fixture.id,
					season: process.env.REACT_APP_CURRENT_SEASON,
				};
			});

			setGamesData(newData);
		} else {
			notify(intl.formatMessage({ id: "unknown_error" }));
		}

		setIsLoading(false);
	};

	const getBeforeDataHandler = async () => {
		setIsLoading(true);
		const data = await getGamesFromAPIRequest({ isBefore: true });

		if (data) {
			const newData = data.response.map((game) => {
				return {
					status: game.fixture.status.long,
					league: game.league.name,
					round: game.league.round,
					home: game.teams.home.name,
					away: game.teams.away.name,
					homeId: game.teams.home.id,
					awayId: game.teams.away.id,
					homeAvatar: game.teams.home.logo,
					awayAvatar: game.teams.away.logo,
					date: game.fixture.date,
					timezone: game.fixture.timezone,
					city: game.fixture.venue.city ? game.fixture.venue.city : "",
					stadium: game.fixture.venue.name ? game.fixture.venue.name : "",
					fixture: game.fixture.id,
					season: process.env.REACT_APP_CURRENT_SEASON,
				};
			});

			setGamesData(newData);
		} else {
			notify(intl.formatMessage({ id: "unknown_error" }));
		}

		setIsLoading(false);
	};

	const addGameHandler = async ({
		season,
		status,
		league,
		round,
		home,
		away,
		homeId,
		awayId,
		homeAvatar,
		awayAvatar,
		date,
		timezone,
		city,
		stadium,
		fixture,
	}) => {
		setIsLoading(true);

		const data = await addNextGameRequest({
			season,
			status,
			league,
			round,
			home,
			away,
			homeId,
			awayId,
			homeAvatar,
			awayAvatar,
			date,
			timezone,
			city,
			stadium,
			fixture,
		});

		if (data) {
			notify(intl.formatMessage({ id: "game_success_added" }));
			navigate(APPRoutes.game);
		} else {
			notify(intl.formatMessage({ id: "unknown_error" }));
		}

		setIsLoading(false);
	};

	return (
		<LayoutDefault>
			<Wrap vPadding="30px">
				<GridBox rowGap="30px">
					<PageHeader>
						<PageTitle title={intl.formatMessage({ id: "add_game" })} />

						<FlexBox columnGap="15px">
							<NeonButton variant="add" submit={() => getDataHandler()}>
								{intl.formatMessage({ id: "search" })}
							</NeonButton>

							<NeonButton
								variant="default"
								submit={() => getBeforeDataHandler()}
							>
								{intl.formatMessage({ id: "search_before" })}
							</NeonButton>
						</FlexBox>
					</PageHeader>

					<div>
						{isLoading ? (
							<Loading />
						) : (
							<GridBox rowGap="15px">
								{gamesData.map((game) => (
									<AddGameItem
										addGameHandler={addGameHandler}
										key={game.fixture}
										game={game}
									/>
								))}
							</GridBox>
						)}
					</div>
				</GridBox>
			</Wrap>
		</LayoutDefault>
	);
};

export { AddGamePage };
