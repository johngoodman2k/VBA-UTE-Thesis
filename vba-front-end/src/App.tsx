import './App.css';

import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import React, {useState,useEffect} from 'react';
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

import { AdminHomePage } from './pages/Admin/AdminHomePage';
import { TicketPage } from './pages/Client/TicketPage';
import { TicketDetailsPage } from './pages/Client/TicketDetailsPage';
import { CreateSeasonModal } from './components/Modal/CreateSeasonModal';
import { CreateTeamModal } from './components/Modal/CreateTeamModal';
import { SeasonManager } from './pages/Admin/SeasonManager';
import { SignUp } from './pages/Client/Authentication/SignUpPage';
import { SignIn } from './pages/Client/Authentication/SignInPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OTP } from './pages/Client/Authentication/OTP';
import { OTPForgotPassword } from './pages/Client/Authentication/OTPForgotPassword';
import { NewPassword } from './pages/Client/Authentication/NewPassword';
import { ForgotPassword } from './pages/Client/Authentication/ForgotPassword';
import { AboutPage } from './pages/Client/AboutPage';
import Cookies from 'js-cookie';
import { vbaContext } from './Services/services';
import { User } from './Services/models';
import { NavigationBar } from './components/Bar/NavigationBar';

const cookies =  Cookies.get("role")
function App() {

	return (
		<>
			<ToastContainer></ToastContainer>
			<BrowserRouter>
				<Routes>
					{cookies === "1" &&
						<Route path='/admin'>
							<Route path='tournaments' element={<AdminHomePage manager='tournaments'></AdminHomePage>} />
							<Route path='news' element={<AdminHomePage manager='news'></AdminHomePage>} />
							<Route path='tournaments/:id' element={<AdminHomePage manager='seasons'></AdminHomePage>} />
							<Route path='seasons' element={<AdminHomePage manager='seasons'></AdminHomePage>} />
							<Route path='seasons/:id' element={<AdminHomePage manager='teams'></AdminHomePage>} />
							<Route path='teams' element={<AdminHomePage manager='teams'></AdminHomePage>} />
							<Route path='teams/:id' element={<AdminHomePage manager='players'></AdminHomePage>} />
							<Route path='players' element={<AdminHomePage manager='players'></AdminHomePage>} />
						</Route>
					}

					<Route path='fixtures/match/:id' element={<MatchDetailPage />} />
					<Route path='/fixtures/:id' element={<FixturesPage></FixturesPage>} />
					<Route path='/home' element={<LandingPageScroll />} />
					<Route path='/player' element={<PlayerInformation />} />
					<Route path='/player/:id' element={<PlayerInformation />} />
					<Route path='/playercard' element={<PlayerCard1 />} />
					<Route path='/new' element={<NewsContainer />} />
					<Route path='/calendar' element={<Calendar data={new Date(Date.now())} />} />
					<Route path='/teaminfo/:id' element={<TeamInfoPage></TeamInfoPage>} />
					<Route path='/teaminfofixtures/:id' element={<TeamInfoFixturesPage></TeamInfoFixturesPage>} />
					<Route path='/articles/:id' element={<Articles></Articles>} />
					<Route path='/news' element={<News></News>} />
					<Route path='/standings/:id' element={<StandingPage></StandingPage>} />
					<Route path='/about' element={<AboutPage></AboutPage>} />
					
					

					{/* <Route path='/ticketpage' element={<TicketPage></TicketPage>} />
					<Route path='/ticketdetailspage' element={<TicketDetailsPage></TicketDetailsPage>} /> */}
					<Route path='/signup' element={<SignUp></SignUp>} />
					<Route path='/signin' element={<SignIn></SignIn>} />
					<Route path='/otp' element={<OTP></OTP>} />
					<Route path='/otpforgotpassword' element={<OTPForgotPassword></OTPForgotPassword>} />
					<Route path='/newpassword' element={<NewPassword></NewPassword>} />
					<Route path='/forgotpassword' element={<ForgotPassword></ForgotPassword>} />

					
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
