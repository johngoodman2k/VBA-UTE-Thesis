import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './landingPageScroll.module.scss';
import { Power3, gsap, Expo } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import { NavigationBar } from '../../../components/Bar/NavigationBar';
import { NewsCard } from '../../../components/News/NewsCard';
import { Slider2 } from '../../../components/Slider/Slider2';
import { RelatedNews } from '../../../components/NewsDetail/RelatedNews';
import { Post, Season, Standings, Team, Tournament } from '../../../Services/models';
import { vbaContext } from '../../../Services/services';
import { Link } from 'react-router-dom';
import { LilStanding } from '../../../components/LilStanding';
import { Footer } from '../../../components/Footer';

const cx = classNames.bind(styles);
const teamServices = vbaContext.getTeamServices();
const tournamentServices = vbaContext.getTournamentServices();
const standingsServices = vbaContext.getStandingsServices();
const postServices = vbaContext.getPostServices();


export const LandingPageScroll = () => {
	const [teams, getTeams] = useState<Team[]>();
	const [tournament, setTournament] = useState<Season>();
	const [standings, setStandings] = useState<Standings>();
	const [post, setPost] = useState<Post[]>([]);
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
			const res = await tournamentServices.getMergeTournamentById('uWvQv6nLYcPAyztGvzqyZ', 'AHLn-VnvtNsxFh6olzbCd')
			console.log('54', res)
			const res1 = await postServices.getAllPost() as any
			console.log('60', res1)
			setTournament(res[0])
			setPost(res1.list)
		})();
	}, []);


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
									tournament={tournament}
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
									heroImage={post[0].image}
									heroTitle={post[0].name}
									heroType='News'
									heroDescription={post[0].description}
									firstContentDescription={post[1].description}
									firstContentTitle={post[1].name}
									firstContentImage={post[1].image}
									secondContentTitle={post[2].name}
									secondContentImage={post[2].image}
									secondContentDescription={post[2].description}></NewsCard>
							</div>
						</div>
					</div>
				</section>
				<div className={`${cx('__sectionAdjust')}`}>
					<div className={`${cx('__newsHeader')}`}>ĐỘI BÓNG VBA</div>
					<div className='flex justify-center gap-8 align-middle'>
						{tournament?.teams?.map((x: Team) => (
							<div className={`${cx('__teamLogo')}`}>
								<Link to={`/teaminfo/${x.id}`}>
									<img src={x.teamlogo as string}></img>
								</Link>
							</div>
						))}
					</div>
				</div>

				<section className='bg-red-100'>
					<div className={`${cx('__newsHeader')}`}>TIN TỨC</div>
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
