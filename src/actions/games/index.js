import { axiosAuthorized } from "../../axios";
import { APIRoutes } from "../../const/API-routes";
import axios from "axios";

export const getGamesRequest = async (page) => {
	let games = {
		length: 0,
		data: [],
	};

	try {
		const data = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.game_getGames,
			{
				page: page,
				season: process.env.REACT_APP_CURRENT_SEASON,
			},
		);
		games = {
			length: data.data.length,
			data: data.data.games,
		};
	} catch (error) {
		console.warn(error);
	}

	return games;
};

export const getLastGameRequest = async () => {
	let game = null;

	try {
		const { data } = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.game_getLastGame,
			{
				season: process.env.REACT_APP_CURRENT_SEASON,
			},
		);

		game = data.response;
	} catch (error) {
		console.warn(error);
	}

	return game;
};

export const addNextGameRequest = async ({
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
	let game = null;

	try {
		const data = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.game_addNextGame,
			{
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
			},
		);

		game = data;
	} catch (error) {
		console.warn(error);
	}

	return game;
};

export const editStatusesRequest = async ({ gameId, statuses }) => {
	let players = null;

	try {
		const { data } = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.game_editStatuses,
			{
				gameId,
				statuses,
			},
		);

		players = data.response;
	} catch (error) {
		console.warn(error);
	}

	return players;
};

export const editRateRequest = async (values) => {
	let rate = null;

	try {
		const { data } = await axiosAuthorized.patch(
			process.env.REACT_APP_API_URL + APIRoutes.rates_editRate,
			{
				gameId: values.gameId,
				rateId: values.rateId,
				formation: values.formation,
				passes: values.passes,
				successPasses: values.successPasses,
				shots: values.shots,
				successShots: values.successShots,
				dribbles: values.dribbles,
				successDribbles: values.successDribbles,
				ballAccuracy: values.ballAccuracy,
				captains: values.captains,
				lineups: values.lineups,
			},
		);

		rate = data.response;
	} catch (error) {
		console.warn(error);
	}

	return rate;
};

export const addRateRequest = async (values) => {
	let rate = null;

	try {
		const { data } = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.rates_addRate,
			{
				userId: values.userId,
				gameId: values.gameId,
				formation: values.formation,
				passes: values.passes,
				successPasses: values.successPasses,
				shots: values.shots,
				successShots: values.successShots,
				dribbles: values.dribbles,
				successDribbles: values.successDribbles,
				ballAccuracy: values.ballAccuracy,
				captains: values.captains,
				lineups: values.lineups,
			},
		);

		rate = data.response;
	} catch (error) {
		console.warn(error);
	}

	return rate;
};

export const addGameStatsRequest = async (values) => {
	let stats = null;

	try {
		const { data } = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.game_addGameStats,
			{
				...values,
			},
		);

		stats = data.response;
	} catch (error) {
		console.warn(error);
	}

	return stats;
};

export const getGameByUserRequest = async (values) => {
	let stats = null;

	try {
		const { data } = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.game_getGameByUser,
			{
				userId: values.userId,
				gameId: values.gameId,
				playersFormId: values.playersFormId,
			},
		);

		stats = data.response;
	} catch (error) {
		console.warn(error);
	}

	return stats;
};

export const getGameByIdRequest = async ({ gameId, playersFormId, userId }) => {
	let stats = null;

	try {
		const { data } = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.game_getGameById,
			{
				gameId: gameId,
				playersFormId: playersFormId,
				userId: userId,
			},
		);

		stats = data.response;
	} catch (error) {
		console.warn(error);
	}

	return stats;
};

export const getPlayersAndStatusesRequest = async ({ gameId, userId }) => {
	let result = null;

	try {
		const { data } = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.game_getPlayersAndStatuses,
			{
				userId,
				gameId,
			},
		);

		result = data.response;
	} catch (error) {
		console.warn(error);
	}

	return result;
};

export const getClubStatsRequest = async () => {
	let result = null;

	try {
		const { data } = await axiosAuthorized.get(
			process.env.REACT_APP_API_URL +
				APIRoutes.game_getClubStats +
				process.env.REACT_APP_CURRENT_SEASON,
		);

		result = data.response;
	} catch (error) {
		console.warn(error);
	}

	return result;
};

export const getPlayerStatsRequest = async ({ id, season }) => {
	let result = null;

	try {
		const { data } = await axiosAuthorized.get(
			process.env.REACT_APP_API_URL +
				APIRoutes.game_GetPlayerStats +
				`/${id}/${season}`,
		);

		result = data.response;
	} catch (error) {
		console.warn(error);
	}

	return result;
};

export const getStatsRequest = async ({ fixture, players }) => {
	let response = null;

	try {
		const newData = await axios.get(
			"https://v3.football.api-sports.io/fixtures?id=" + fixture,
			{
				headers: {
					"x-rapidapi-host": "v3.football.api-sports.io",
					"x-rapidapi-key": "7490711cef3926e9685d6e09c8d2f49f",
				},
			},
		);

		const data = newData.data.response[0];

		// Game Stats
		const homeStatsArray = data.statistics.filter(
			(item) => item.team.id === data.teams.home.id,
		)[0].statistics;
		const awayStatsArray = data.statistics.filter(
			(item) => item.team.id === data.teams.away.id,
		)[0].statistics;
		const homeStats = {};
		const awayStats = {};

		homeStatsArray.forEach((item) => {
			if (item.type.toLowerCase() === "shots on goal")
				homeStats.homeShotsOnGoal = item.value;
			else if (item.type.toLowerCase() === "total shots")
				homeStats.homeShotsTotal = item.value;
			else if (item.type.toLowerCase() === "blocked shots")
				homeStats.homeBlockShots = item.value;
			else if (item.type.toLowerCase() === "shots insidebox")
				homeStats.homeShotsInsideBox = item.value;
			else if (item.type.toLowerCase() === "shots outsidebox")
				homeStats.homeShotsOutsideBox = item.value;
			else if (item.type.toLowerCase() === "fouls")
				homeStats.homeFouls = item.value;
			else if (item.type.toLowerCase() === "corner kicks")
				homeStats.homeCorners = item.value;
			else if (item.type.toLowerCase() === "offsides")
				homeStats.homeOffsides = item.value;
			else if (item.type.toLowerCase() === "ball possession")
				homeStats.homeBallPossession = item.value.slice(0, -1) * 1;
			else if (item.type.toLowerCase() === "goalkeeper saves")
				homeStats.homeSaves = item.value;
			else if (item.type.toLowerCase() === "total passes")
				homeStats.homePassesTotal = item.value;
			else if (item.type.toLowerCase() === "passes accurate")
				homeStats.homePassesAccurate = item.value;
			else if (item.type.toLowerCase() === "yellow cards")
				homeStats.homeYellowCard = item.value;
			else if (item.type.toLowerCase() === "red cards")
				homeStats.homeRedCard = item.value;
			else return null;
		});
		awayStatsArray.forEach((item) => {
			if (item.type.toLowerCase() === "shots on goal")
				awayStats.awayShotsOnGoal = item.value;
			else if (item.type.toLowerCase() === "total shots")
				awayStats.awayShotsTotal = item.value;
			else if (item.type.toLowerCase() === "blocked shots")
				awayStats.awayBlockShots = item.value;
			else if (item.type.toLowerCase() === "shots insidebox")
				awayStats.awayShotsInsideBox = item.value;
			else if (item.type.toLowerCase() === "shots outsidebox")
				awayStats.awayShotsOutsideBox = item.value;
			else if (item.type.toLowerCase() === "fouls")
				awayStats.awayFouls = item.value;
			else if (item.type.toLowerCase() === "corner kicks")
				awayStats.awayCorners = item.value;
			else if (item.type.toLowerCase() === "offsides")
				awayStats.awayOffsides = item.value;
			else if (item.type.toLowerCase() === "ball possession")
				awayStats.awayBallPossession = item.value.slice(0, -1) * 1;
			else if (item.type.toLowerCase() === "goalkeeper saves")
				awayStats.awaySaves = item.value;
			else if (item.type.toLowerCase() === "total passes")
				awayStats.awayPassesTotal = item.value;
			else if (item.type.toLowerCase() === "passes accurate")
				awayStats.awayPassesAccurate = item.value;
			else if (item.type.toLowerCase() === "yellow cards")
				awayStats.awayYellowCard = item.value;
			else if (item.type.toLowerCase() === "red cards")
				awayStats.awayRedCard = item.value;
			else return null;
		});

		const gameStats = {
			homeScore: data.goals.home,
			awayScore: data.goals.away,
			...homeStats,
			...awayStats,
		};

		Object.keys(gameStats).forEach((item) => {
			if (!gameStats[item]) {
				gameStats[item] = 0;
			}
		});

		// Transform API Players to statistics form
		const playersDataForm = {};
		players.forEach((player) => {
			playersDataForm[player.idAPI] = player;
		});

		const apiPlayers = data.players
			.filter(
				(item) => item.team.id.toString() === process.env.REACT_APP_TEAM_ID,
			)[0]
			.players.filter((item) => item.statistics[0].games.minutes);
		const filteredApiPlayers = apiPlayers.filter(
			(item) => playersDataForm[item.player.id],
		);

		const playersUpdate = {};

		filteredApiPlayers.forEach((item) => {
			const stats = item.statistics[0];
			const id = item.player.id.toString();
			playersUpdate[id] = {
				name: playersDataForm[id].name,
				surname: playersDataForm[id].surname,
				number: playersDataForm[id].number,
				avatar: playersDataForm[id].image,
				id: playersDataForm[id].id,
				position: playersDataForm[id].position,
				statistics: {
					minutes: stats.games.minutes ? stats.games.minutes : 0,
					rating: stats.games.rating ? stats.games.rating * 1 : 0,
					goals: stats.goals.total ? stats.goals.total : 0,
					shotsTotal: stats.shots.total ? stats.shots.total : 0,
					shotsOnGoal: stats.shots.on ? stats.shots.on : 0,
					passesTotal: stats.passes.total ? stats.passes.total : 0,
					passesAccuracy: stats.passes.accuracy ? stats.passes.accuracy * 1 : 0,
					passesKey: stats.passes.key ? stats.passes.key : 0,
					dribblesTotal: stats.dribbles.attempts ? stats.dribbles.attempts : 0,
					dribblesSuccess: stats.dribbles.success ? stats.dribbles.success : 0,
					foulCommitted: stats.fouls.committed ? stats.fouls.committed : 0,
					foulDrawn: stats.fouls.drawn ? stats.fouls.drawn : 0,
					offsides: stats.offsides ? stats.offsides : 0,
					yellowCars: stats.cards.yellow ? stats.cards.yellow : 0,
					redCards: stats.cards.red ? stats.cards.red : 0,
				},
			};
		});

		const playersArray = Object.values(playersUpdate);

		const newPlayersToLineup = players.filter(
			(player) => !!playersUpdate[player.idAPI],
		);

		// Max values
		const maxValues = {
			minutes: 0,
			rating: 0,
			goals: 0,
			shotsTotal: 0,
			shotsOnGoal: 0,
			passesTotal: 0,
			passesAccuracy: 0,
			passesKey: 0,
			dribblesTotal: 0,
			dribblesSuccess: 0,
			foulCommitted: 0,
			foulDrawn: 0,
			offsides: 0,
			yellowCars: 0,
			redCards: 0,
		};

		playersArray.forEach((player) => {
			Object.keys(maxValues).forEach((key) => {
				if (player.statistics[key] > maxValues[key]) {
					maxValues[key] = player.statistics[key];
				}
			});
		});

		const playersSorted = playersArray.sort((a, b) => {
			if (a.statistics.rating > b.statistics.rating) {
				return -1;
			}
			if (a.statistics.rating < b.statistics.rating) {
				return 1;
			}

			return 0;
		});

		response = {
			players: playersSorted,
			maxValues,
			gameStats,
			lineupPlayers: newPlayersToLineup,
		};
	} catch (error) {
		console.warn(error);
	}

	return response;
};

export const getGamesFromAPIRequest = async ({ isBefore }) => {
	let response = null;
	const nextOrLast = isBefore ? "last" : "next";

	try {
		const newData = await axios.get(
			`https://v3.football.api-sports.io/fixtures?team=${process.env.REACT_APP_TEAM_ID}&${nextOrLast}=30`,
			{
				headers: {
					"x-rapidapi-host": "v3.football.api-sports.io",
					"x-rapidapi-key": "7490711cef3926e9685d6e09c8d2f49f",
				},
			},
		);

		response = newData.data;
	} catch (error) {
		console.warn(error);
	}

	return response;
};

export const getTestData = async () => {
	let response = null;

	try {
		const newData = await axios.get(
			"https://v3.football.api-sports.io/leagues?country=england",
			{
				headers: {
					"x-rapidapi-host": "v3.football.api-sports.io",
					"x-rapidapi-key": "7490711cef3926e9685d6e09c8d2f49f",
				},
			},
		);

		response = newData.data;
	} catch (error) {
		console.warn(error);
	}

	return response;
};
