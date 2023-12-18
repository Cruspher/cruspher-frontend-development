const APIRoutes = {
	auth_signup: "api/auth/signup",
	auth_login: "api/auth/login",

	user_editUserNameData: "api/user/editUserName",
	user_getUser: "api/user/getUser/",
	user_changePassword: "api/user/changePassword",
	user_getUsersRatingPagination: "api/user/getUsersRatingPagination/",
	user_getUsersRating: "api/user/getUserRatings/",

	trophy_getTrophies: "api/trophy/getTrophies/",
	trophy_addTrophy: "api/trophy/addTrophy",
	trophy_editTrophy: "api/trophy/editTrophy",
	trophy_getTrophy: "api/trophy/getTrophy/",

	player_getPlayerWithStatistic: "api/player/getPlayerWithStatistic/",
	player_getPlayerById: "api/player/getPlayerById/",
	player_getPlayersInClub: "api/player/getPlayersInClub",
	playerStatistic_getAllPlayersWithStatistic:
		"api/player-statistic/getAllPlayersWithStatistic",
	player_getPlayersIsInClub: "api/player/getPlayersIsInClub",
	player_editPlayer: "api/player/editPlayer",
	player_addPlayer: "api/player/addPlayer",
	player_editIsInClub: "api/player/editIsInClub",
	player_getPlayers: "api/player/getPlayers",
	player_updatePlayers: "api/player/updatePlayers",

	forumTheme_getThemes: "api/forum-theme/getThemes",
	forumTheme_addTheme: "api/forum-theme/addTheme",
	forumTheme_editTheme: "api/forum-theme/editTheme",
	forumTheme_remove: "api/forum-theme/remove/",
	forumTheme_confirmTheme: "api/forum-theme/confirmTheme",
	forumMessage_addThemeMessage: "api/forum-message/addThemeMessage",

	forumMessage_getMessagesByTheme: "api/forum-message/getMessagesByTheme/",
	forumMessage_addEmotion: "api/forum-message/addEmotion",
	forumMessage_editThemeMessage: "api/forum-message/editThemeMessage",
	forumMessage_removeMessage: "api/forum-message/removeMessage/",
	forumMessage_addReport: "api/forum-message/addReport/",
	forumMessage_getMessagesByReports: "api/forum-message/getMessagesByReports",
	forumMessage_clearReports: "api/forum-message/clearReports/",

	news_addNews: "api/news/addNews",
	news_editNews: "api/news/editNews",
	news_getNews: "api/news/getNews/",
	news_getNewsAdmin: "api/news/getNewsAdmin/",
	news_removeNews: "api/news/removeNews",
	news_addNewsEmotion: "api/news/addNewsEmotion",
	news_getOneNews: "api/news/getOneNews",

	newsLanguage_getLanguages: "api/news-language/getLanguages",
	newsLanguage_addLanguage: "api/news-language/addLanguage",
	newsLanguage_setDefaultLanguage: "api/news-language/setDefaultLanguage",
	newsLanguage_editNewsLanguage: "api/news-language/editNewsLanguage",

	forumLanguage_getLanguages: "api/forum-theme-language/getLanguages",
	forumLanguage_addLanguage: "api/forum-theme-language/addLanguage",
	forumLanguage_setDefaultLanguage:
		"api/forum-theme-language/setDefaultLanguage",
	forumLanguage_editForumLanguage: "api/forum-theme-language/editForumLanguage",

	shopElement_addShopElement: "api/shop-element/addShopElement",
	shopElement_buyElement: "api/shop-element/buyElement",
	shopElement_editShopElement: "api/shop-element/editShopElement",
	shopElement_getShopElementById: "api/shop-element/getShopElementById/",
	shopElement_getShopElements: "api/shop-element/getShopElements",
	shopElement_getUserElements: "api/shop-element/getUserElements",
	shopElement_getBoxElements: "api/shop-element/getBoxElements/",
	shopElement_getShopElementsForUser: "api/shop-element/getShopElementsForUser",
	shopElement_setShopElementDefault: "api/shop-element/setShopElementDefault",
	shopElement_setUserElementDefault: "api/shop-element/setUserElementDefault",
	shopElement_openUserBox: "api/shop-element/openUserBox",
	shopElement_buyUserBox: "api/shop-element/buyUserBox",

	playersForm_addForm: "api/players-form/addForm",
	playersForm_getForms: "api/players-form/getForms",

	userLevel_getLevels: "api/user-level/getLevels",

	game_getGameStatuses: "api/game/getGameStatuses/",
	game_editStatuses: "api/game/editStatuses",
	game_addGameStats: "api/game/addGameStats",
	game_getGameByUser: "api/game/getGameByUser",
	game_getGameById: "api/game/getGameById",
	game_getGames: "api/game/getGames",
	game_getLastGame: "api/game/getLastGame",
	game_addNextGame: "api/game/addNextGame",
	game_getPlayersAndStatuses: "api/game/getPlayersAndStatuses/",
	game_getClubStats: "api/game/getClubStats/",
	game_GetPlayerStats: "api/game/getPlayerStats",

	social_getSocials: "api/social/getSocials",
	social_createSocials: "api/social/createSocials",

	table_getLaLigaTableAll: "api/table/getLaLigaTableAll",
	table_updateTable: "api/table/updateTable",

	rates_getRatesById: "api/rates/getRatesById/",
	rates_editRate: "api/rates/editRate",
	rates_addRate: "api/rates/addRate",
};

export { APIRoutes };
