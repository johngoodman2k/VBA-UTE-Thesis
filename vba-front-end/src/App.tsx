import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModalAddPlayerToTeam from './components/Modal/ModalAddPlayerToTeam';
import Calendar from './components/Calendar';
import { NewsContainer } from './components/News/NewsContainer';
import PlayerCard1 from './components/Player/PlayerCard1';
import PlayerInformation from './components/Player/PlayerInformation';
import { MatchDetailPage } from './pages/Client/MatchDetailPage';
import { FixturesPage } from './pages/Client/FixturesPage';
import { LandingPageScroll } from './pages/Client/LandingPageScroll';
import { TeamInfoPage } from './pages/Client/TeamInfoPage';
import { TeamInfoFixturesPage } from './pages/Client/TeamInfoPage/TeamInfoFixturesPage';
import { Articles } from './pages/Client/Articles';
import { News } from './pages/Client/News';
import StandingPage from './pages/Client/StandingPage';
import { CreateTournament } from './components/Modal/CreateTournamentModal';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='fixtures/match/:id' element={<MatchDetailPage />} />
				<Route path='/fixtures' element={<FixturesPage></FixturesPage>} />
				<Route
					path='/'
					element={<ModalAddPlayerToTeam></ModalAddPlayerToTeam>}
				/>
				<Route path='/home' element={<LandingPageScroll />} />
				<Route path='/player' element={<PlayerInformation />} />
				<Route path='/playercard' element={<PlayerCard1 />} />
				<Route path='/new' element={<NewsContainer />} />
				<Route
					path='/calendar'
					element={<Calendar data={new Date(Date.now())} />}
				/>
				<Route path='/teaminfo/:id' element={<TeamInfoPage></TeamInfoPage>} />
				<Route
					path='/teaminfofixtures'
					element={<TeamInfoFixturesPage></TeamInfoFixturesPage>}
				/>
				<Route path='/articles' element={<Articles></Articles>} />
				<Route path='/news' element={<News></News>} />
				<Route path='/standing' element={<StandingPage></StandingPage>} />
				<Route
					path='/createtournament'
					element={<CreateTournament></CreateTournament>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
