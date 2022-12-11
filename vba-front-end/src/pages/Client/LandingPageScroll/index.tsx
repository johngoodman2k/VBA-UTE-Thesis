import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './landingPageScroll.module.scss';
import { Power3, gsap, Expo } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import { NavigationBar } from '../../../components/Bar/NavigationBar';
import { NewsCard } from '../../../components/News/NewsCard';
import { Slider2 } from '../../../components/Slider/Slider2';
import { RelatedNews } from '../../../components/NewsDetail/RelatedNews';
import { Season, Standings, Team, Tournament } from '../../../Services/models';
import { vbaContext } from '../../../Services/services';
import { Link } from 'react-router-dom';
import { LilStanding } from '../../../components/LilStanding';
import { Footer } from '../../../components/Footer';

const cx = classNames.bind(styles);
const teamServices = vbaContext.getTeamServices();
const tournamentServices = vbaContext.getTournamentServices();
const standingsServices = vbaContext.getStandingsServices();

export const LandingPageScroll = () => {
	const [teams, getTeams] = useState<Team[]>();
	const [tournament, setTournament] = useState<Tournament>();
	const [standings, setStandings] = useState<Standings>();
	gsap.registerPlugin(CSSRulePlugin);
	let intro = useRef(null);
	let container = useRef(null);
	let title = useRef(null);
	let image = useRef(null);
	let header = useRef(null);
	let imageReveal = CSSRulePlugin.getRule(`${cx('__right__wrapper')}`);
	let tl = gsap.timeline();
	useEffect(() => {
		tl.to(title, {
			duration: 2,
			opacity: 0,

			ease: Power3.easeIn
		}).to(
			header,
			{
				duration: 1,
				opacity: 1,
				y: 50,
				ease: Power3.easeOut
			},
			'<1'
		);

		(async () => {
			const res: any = await teamServices.getAllTeams();
			const res1 = await tournamentServices.getTournamentById('09NmnaUrGxa5RtAhqlaZ1');
			const res2 = await standingsServices.getStandingsById(res1?.seasons[res1.seasons.length - 1].standingsId);
			console.log('55', res1);

			console.log('56', res2);
			setTournament(res1);
			setStandings(res2);
		})();
	}, []);
	console.log(tournament);

	return (
		<>
			<div className={`w-full overflow-hidden ${cx('__wrapper')}`}>
				<section>
					<div className=' mx-auto text-center align-middle'>
						<div
							className={`relative ${cx('__header__block')}`}
							ref={(el: any) => {
								header = el;
							}}>
							<NavigationBar tournament={tournament} />
						</div>

						<div className={cx('__intro')}>
							{/* <video
												ref={(el: any) => {
													intro = el;
												}}
												src={videoG2}
												autoPlay
												muted></video> */}
							<div className={`${cx('__hero')}`}>
								<Slider2
									ref={(el: any) => {
										title = el;
									}}></Slider2>
								{/* <div className={`${cx("__left")} text-third-color`}>
								  <div
									ref={(el: any) => {
									  title = el;
									}}
									className="opacity-0 absolute left-1/2 bottom-[10%] text-center"
								  >
								 
									<h1 className={`${cx("__left__title")}`}>
									  WE ARE <br></br>
									  <span className="text-third-color">VBA</span>
									</h1>
									<div className={`${cx("__left__book")}`}></div>
								  </div>
								</div>
				
								<div className={cx("__right")}>
								  <div className={cx("__right__wrapper")}>
									<figure
									  ref={(el: any) => (el = container)}
									  className={cx("__background-img")}
									>
									  <img
										src="https://images.unsplash.com/photo-1531737212413-667205e1cda7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=734&q=80"
										alt=""
										ref={(el: any) => (image = el)}
										className="w-full h-full"
									  />
									</figure>
								  </div>
								</div> */}
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className='container mx-auto px-4 w-full text-center align-middle text-third-color'>
						<div className='grid grid-cols-3'>
							<nav className={cx('__fixturesBlock')}>
								{/* <SidebarFixture></SidebarFixture> */}
								<LilStanding standings={standings}></LilStanding>
							</nav>
							<div className='col-span-2 pt-12 mt-12'>
								<NewsCard
									heroImage='http://api-news.vba.vn/storage/images/Game-35-Nha-Trang-Dolphins-Danang-Dragons%20.JPG'
									heroTitle='DANANG DRAGONS KẾT THÚC HÀNH TRÌNH TẠI VBA 2022'
									heroType='News'
									heroDescription='Nha Trang Dolphins có chiến thắng đậm nhất trong lịch sử đội bóng. Đội chủ nhà chiếm ưu thế tuyệt đối và vượt qua Danang Dragons với tỷ số 76-41. Kết quả này giúp Dolphins vươn lên vị trí thứ 2 trên bảng xếp hạng với thành tích 6 thắng 4 bại. Chỉ cần thêm một chiến thắng, Nha Trang Dolphins sẽ lần đầu tiên lọt vào bán kết VBA.'
									firstContentDescription='Saigon Heat công thủ toàn diện, Coach Predrag Lukic rời sân'
									firstContentTitle='SAIGON HEAT XÂY VỮNG NGÔI ĐẦU BẢNG'
									firstContentImage='http://api-news.vba.vn/storage/images/Games-36-Saigon-Heat-Thang-Long-Warriors%20_3.JPG'
									secondContentTitle='THANG LONG WARRIORS VƯƠN LÊN TOP 5'
									secondContentImage='http://api-news.vba.vn/storage/images/Game-34-Ho-Chi-Minh-City-Wings-Thang-Long-Warriors%20_2.JPG'
									secondContentDescription='Thang Long Warriors chưa bỏ cuộc trong cuộc đua nước rút vào top 4. '></NewsCard>
							</div>
						</div>
					</div>
				</section>
				<div className={`${cx('__sectionAdjust')}`}>
					<div className={`${cx('__newsHeader')}`}>VBA TEAMS</div>
					<div className='grid grid-cols-7 gap-8 align-middle'>
						{teams?.map((x: Team) => (
							<div className={`${cx('__teamLogo')}`}>
								<Link to={`/teaminfo/${x.id}`}>
									<img src={x.teamlogo}></img>
								</Link>
							</div>
						))}
					</div>
				</div>

				<section className='bg-red-100'>
					<div className={`${cx('__newsHeader')}`}>Related News</div>
					<div className='grid grid-cols-6 align-middle'>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
					</div>
					<div className='grid grid-cols-6 align-middle '>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
						<RelatedNews></RelatedNews>
					</div>
				</section>

				<Footer />
			</div>
		</>
	);
};
