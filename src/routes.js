import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {HomePage} from "./pages/home";
import {AuthPage} from "./pages/auth";
import {ForumPage} from "./pages/forum";
import {ForumTheme} from "./pages/forum-theme";
import {AdminNewsPage} from "./pages/admin/admin-news-page";
import {AdminSocialPage} from "./pages/admin/admin-social-page";
import {AdminForumPage} from "./pages/admin/admin-forum-page";
import {AdminPlayersPage} from "./pages/admin/admin-players-page";
import {AdminGamesPage} from "./pages/admin/admin-games-page";
import {AdminShopPage} from "./pages/admin/admin-shop-page";
import {AdminLevelsPage} from "./pages/admin/admin-levels-page";
import {AdminSettingPage} from "./pages/admin/admin-setting-page";
import {APPRoutes} from "./const/APP-routes";
import {AdminShopElementView} from "./pages/admin/admin-shop-element-view";
import {AdminForumReportPage} from "./pages/admin/admin-forum-report";
import {AdminTrophyPage} from "./pages/admin/admin-trophy-page";
import {AdminTrophyViewPage} from "./pages/admin/admin-trophy-view";
import {PrivacyPage} from "./pages/privacy";
import {AddGamePage} from "./pages/admin/add-game-page";
import {NewsPage} from "./pages/news";
import {NewsView} from "./pages/news-view";
import {AdminNewsViewPage} from "./pages/admin/admin-news-view";
// import {GamesPage} from './pages/games'
import {ContactsPage} from "./pages/contacts";
// import {GamePage} from "./pages/game";
// import {UpdateGameStatsPage} from "./pages/update-game-stats";
import {TrophiesPage} from "./pages/trophies";
// import {ClubStatsPage} from "./pages/club-stats";
// import {ClubTokenPage} from "./pages/club-token";
// import {PlayerStats} from "./pages/player-stats";
// import {TablesPage} from "./pages/tables";

const useRoutes = (role) => {
	if (role === "guest") {
		return (
			<div>
				<Routes>
					<Route exact path="/" element={<AuthPage />} />
					<Route path={APPRoutes.privacy} element={<PrivacyPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		);
	}

	return (
		<div>
			<Routes>
				<Route exact path={APPRoutes.home} element={<HomePage />} />
				{/* <Route path='/game/:id' element={<GamePage />}/>
        <Route path={APPRoutes.game} element={<GamesPage />}/>
        <Route path='/update-game/:id' element={<UpdateGameStatsPage />}/>
      <Route path={APPRoutes.tables} element={<TablesPage />} /> */}
				<Route path={APPRoutes.contacts} element={<ContactsPage />} />
				<Route
					path="/edit-news/:id"
					element={<AdminNewsViewPage isEdit={true} />}
				/>
				<Route path={APPRoutes.addNews} element={<AdminNewsViewPage />} />
				<Route path={APPRoutes.forum} element={<ForumPage />} />
				<Route path="/forum/:id" element={<ForumTheme />} />
				{/* <Route path="/news/:id" element={<NewsView />} />
				<Route path={APPRoutes.news} element={<NewsPage />} /> */}
				{/* <Route path="/club-token" element={<ClubTokenPage />} /> */}
				<Route path={APPRoutes.news} element={<TrophiesPage />} />
				{/* <Route path={`${APPRoutes.playerStats}/:id`} element={<PlayerStats />} />

        <Route path={APPRoutes.statistics} element={<ClubStatsPage />} /> */}
				<Route path={APPRoutes.adminTrophy} element={<AdminTrophyPage />} />
				<Route path={APPRoutes.addTrophy} element={<AdminTrophyViewPage />} />
				<Route
					path={`${APPRoutes.editTrophy}:id`}
					element={<AdminTrophyViewPage isEdit={true} />}
				/>
				<Route path={APPRoutes.adminPlayers} element={<AdminPlayersPage />} />
				<Route path={APPRoutes.adminGames} element={<AdminGamesPage />} />
				<Route path={APPRoutes.adminNews} element={<AdminNewsPage />} />
				<Route path={APPRoutes.adminForum} element={<AdminForumPage />} />
				<Route path={APPRoutes.adminSocial} element={<AdminSocialPage />} />
				<Route path={APPRoutes.adminLevels} element={<AdminLevelsPage />} />
				<Route path={APPRoutes.adminShop} element={<AdminShopPage />} />
				<Route path={APPRoutes.adminSettings} element={<AdminSettingPage />} />
				<Route
					path={APPRoutes.addShopElement}
					element={<AdminShopElementView />}
				/>
				<Route
					path={APPRoutes.adminForumReports}
					element={<AdminForumReportPage />}
				/>
				<Route
					path={`${APPRoutes.editShopElement}/:id`}
					element={<AdminShopElementView isEdit={true} />}
				/>
				<Route path={"/admin/add-games"} element={<AddGamePage />} />
				<Route path="*" element={<Navigate to="/forum" />} />
			</Routes>
		</div>
	);
};

export {useRoutes};
