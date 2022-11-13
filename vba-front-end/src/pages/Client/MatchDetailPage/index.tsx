import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './matchDetailPage.module.scss';

import { SidebarFixture } from '../../../components/LandingPage/SideBarFixtures';
import { MatchInfoBar } from '../../../components/Bar/MatchInfoBar';
import { MatchResultDetailBar } from '../../../components/Bar/MatchResultDetailBar';

import {
	MatchEventInterface,
	Player,
	Process,
	Team,
	Tournament
} from '../../../Services/models';
import { MatchEventAssistant } from '../../../components/Match/MatchEventAssistant';
import { MatchEventTimeLine } from '../../../components/Match/MatchEventTimeLine';
import { ModalBlock } from '../../../components/Modal/ModalBlock';
import { ContentWrapper } from '../../../components/Container/ContentWrapper';
import { vbaContext } from '../../../Services/services';
import { Match } from '../../../Services/models';
import { dateFormat } from '../../../utils/dateFormat';
import { useParams } from 'react-router-dom';
import { convertCompilerOptionsFromJson } from 'typescript';
import { RightClickModal } from '../../../components/Modal/RightClickModal';
import { EditorSelect } from '../../../components/Utils/EditorSelect';
import { PlayerSelect } from '../../../components/Utils/PlayerSelect';
import { SummarizeBox } from '../../../components/Match/SummarizeBox';
import { TeamComparison } from '../../../components/Match/TeamComparison';
import { LineUp } from '../../../components/Match/LineUp';
import { PlayByPlay } from '../../../components/Match/PlayByPlay';
import { ControlModal } from '../../../components/Modal/ControlModal';
import { hasPointerEvents } from '@testing-library/user-event/dist/utils';
import { GameLeaders } from '../TeamInfoPage/GameLeaders';

const cx = classNames.bind(styles);

const matchServices = vbaContext.getMatchServices();
const teamServices = vbaContext.getTeamServices();
const playerServices = vbaContext.getPlayerServices();
export const MatchDetailPage = () => {
	const typeOptions = [
		{ name: 'Offensive', value: 'offensive' },
		{ name: 'Defensive', value: 'defensive' },
		{ name: 'Sub', value: 'sub' }
	];

	const sideOptions = [
		{ name: 'Home', value: 'home' },
		{ name: 'Away', value: 'away' }
	];

	const scoreOptions = [
		{ name: '3PT', value: '3PT' },
		{ name: '2PT', value: '2PT' },
		{ name: 'Free Throw', value: 'FT' }
	];

	const defenseOptions = [
		{ name: 'REBOUND', value: '3PT' },
		{ name: 'STEAL', value: '2PT' },
		{ name: 'BLOCK', value: 'FT' }
	];

	const quaterOptions = [
		{ name: 'Q1', value: 'q1' },
		{ name: 'Q2', value: 'q2' },
		{ name: 'Q3', value: 'q3' },
		{ name: 'Q4', value: 'q4' }
	];

	const cardOptions = [
		{ name: 'Yellow', value: 'yellow' },
		{ name: 'Red', value: 'red' }
	];
	const params = useParams();
	const [clickedId, setClickedId] = useState('');
	// const [clickedType, setClickedType] = useState("");
	console.log('78', clickedId);
	const [cardType, setCardType] = useState('yellow');
	const [defenseType, setDefenseType] = useState('rebound');
	const [offenseType, setOffenseType] = useState('2PT');
	const [quaterSelected, setQuaterSelected] = useState('q1');

	const [homePlayers, setHomePlayers] = useState<Player[]>([]);
	const [awayPlayers, setAwayPlayers] = useState<Player[]>([]);

	const [typeSelected, setTypeSelected] = useState('offensive');
	const [sideSelected, setSideSelected] = useState('home');

	const [playerSelected, setPlayerSelected] = useState('');
	const [assistantSelected, setAssistantSelected] = useState('');
	const [subInSelected, setSubInSelected] = useState('');
	const [subOffSelected, setSubOffSelected] = useState('');
	const [reload, setReload] = useState(false);

	const [matchDetail, setMatchDetail] = useState<Match>();

	const handleCloseModal = () => {
		setClickedId('close');
	};

	useEffect(() => {
		(async () => {
			const res = await matchServices.getMatchDetailsById(params.id);
			const res1 = await playerServices.getPlayersByTeamId(res.home.id);
			const res2 = await playerServices.getPlayersByTeamId(res.away.id);
			setMatchDetail(res);
			setHomePlayers(res1);
			console.log(110, res);
			setAwayPlayers(res2);
			const init =
				sideSelected === 'home' && res1.length !== 0
					? res1[0].id
					: sideSelected === 'away' && res2.length !== 0
					? res2[0].id
					: '';
			setAssistantSelected(init);
			setPlayerSelected(init);
			setSubInSelected(init);
			setSubOffSelected(init);
		})();
	}, [params.id, sideSelected, reload]);

	const getPlayerById = (id: string): Player | undefined => {
		let player = homePlayers.find((p: any) => p.id === id);
		if (!player) player = awayPlayers.find((p: any) => p.id === id);
		return player;
	};

	const [show, setShow] = React.useState(false);
	const [positions, setPositions] = React.useState({ x: 0, y: 0 });

	// const createMatchEvent = async (e: any) => {
	// 	e.preventDefault();
	// 	const type = typeSelected;
	// 	const side = sideSelected;
	// 	const offense = offenseType;
	// 	const defense = defenseType;
	// 	const quater = quaterSelected;
	// 	const des = e.target.des.value;
	// 	const assistant = getPlayerById(assistantSelected);
	// 	const player = getPlayerById(playerSelected);
	// 	let homeResult = '';
	// 	let awayResult = '';
	// 	const mins = e.target.mins.value;
	// 	// const description = e.target.des
	// 	// let card = '';
	// 	const subIn = getPlayerById(subInSelected);
	// 	const subOff = getPlayerById(subOffSelected);

	// 	const checkType =
	// 		type === 'offensive' ? offense : type === 'defensive' ? defense : null;

	// 	const checkPlayer =
	// 		type === 'sub'
	// 			? [subIn, subOff]
	// 			: type === 'offensive'
	// 			? [player, assistant]
	// 			: [player];

	// 	const process = {
	// 		type: type,
	// 		side: side,
	// 		option: checkType,
	// 		quater: quater,
	// 		des: des,
	// 		mins: mins,
	// 		player: checkPlayer,
	// 		description:
	// 	};
	// 	const res3 = await matchServices.addProcessToMatch(params.id, [process]);
	// 	console.log('168', res3);

	// 	setReload(!reload);
	// };

	return (
		<>
			<ContentWrapper>
				<section className='grid grid-cols-5'>
					<div className={`${cx('__nav')} `}>
						<SidebarFixture></SidebarFixture>
					</div>
					<div className='col-span-4'>
						<div className={cx('__centralContent')}>
							<section className={cx('__centralContent__box')}>
								<div className={cx('__centralContent__theme')}>
									{/* <div className={cx("__centralContent__themeTeams")}> */}
									<div className={cx('__centralContent__homeTheme')}>
										<div className={cx('__centralContent__teamLogoBlock')}>
											<img
												src={matchDetail ? matchDetail.home.teamlogo : ''}
												alt=''
												className={cx(
													'__centralContent__teamLogoBlock--adjust'
												)}
											/>
										</div>
									</div>
									{/* </div> */}
								</div>
								<div className={cx('__centralContent__theme')}>
									{/* <div className={cx("__centralContent__themeTeams")}> */}
									<div className={cx('__centralContent__awayTheme')}>
										<div className={cx('__centralContent__teamLogoBlock')}>
											<img
												src={matchDetail ? matchDetail.away.teamlogo : '/'}
												alt=''
												className={cx(
													'__centralContent__teamLogoBlock--adjust'
												)}
											/>
										</div>
									</div>
									{/* </div> */}
								</div>
								<div className={cx('__centralContent__theme')}>
									<svg
										width='100%'
										height='100%'
										viewBox='0 0 100 100'
										preserveAspectRatio='none'>
										<polygon
											points='0,0 60,0 40,100 0,100 0,0'
											fill={matchDetail ? matchDetail.home.color : ''}
											fillOpacity='0.95'></polygon>
										<polygon
											points='60,0 40,100 100,100 100,0 60,0'
											fill={matchDetail ? matchDetail.away.color : ''}
											fillOpacity='0.95'></polygon>
									</svg>
								</div>
								<div className={cx('__centralContent__theme')}>
									<div className={cx('__centralContent__themeShadow')}></div>
								</div>
								{/* <picture className={cx("__centralContent__box__background")}>
              <source
                media="min-width: 1024px"
                srcSet="https://resources.premierleague.com/premierleague/photo/2016/07/21/ccade424-00e6-4310-a183-48f7101b1f5e/Arsenal_Stadium_Emirates.jpeg"
              ></source>
              <img
                className={cx("__centralContent__box__image")}
                src="https://resources.premierleague.com/premierleague/photo/2016/07/21/ccade424-00e6-4310-a183-48f7101b1f5e/Arsenal_Stadium_Emirates.jpeg"
              ></img>
            </picture> */}
								{/* bar */}
								<div className={cx('__container')}>
									<div className={cx('__bar')}>
										<MatchInfoBar
											date={
												matchDetail
													? dateFormat(matchDetail.matchDay).toString()
													: ''
											}
											referee={matchDetail ? matchDetail.referee : ''}
											stadiumName={
												matchDetail ? matchDetail.home.stadiumname : ''
											}
											spectators={matchDetail ? matchDetail.spectators : ''}
										/>
									</div>
								</div>

								{/* Edit + Modal */}
								<div className={cx('__editBlock')}>
									<div className={cx('__editBlock__wrapper')}>
										<ul className={cx('__editBlock__wrapper--adjust')}>
											<li
												id='edit'
												onClick={(e: any) =>
													e.currentTarget.id === 'edit'
														? setClickedId('edit')
														: ''
												}
												className={
													clickedId === 'edit' ? cx('__editActive') : ''
												}>
												Edit
											</li>
											{/* <li
                        id="update"
                        onClick={(e: any) =>
                          e.currentTarget.id === "update"
                            ? setClickedId("update")
                            : ""
                        }
                        className={
                          clickedId === "update" ? cx("__updateActive") : ""
                        }
                      >
                        Update
                      </li> */}
										</ul>
									</div>
								</div>

								<div
									className={
										clickedId === 'edit' ? cx('__active') : cx('__inactive')
									}>
									<ControlModal
										modalType='edit'
										handleCloseModal={handleCloseModal}
										matchId={params.id}
										homePlayers={homePlayers}
										awayPlayers={awayPlayers}></ControlModal>
								</div>

								{/* scorebox */}
								<div className={cx('__scoreboxContainer')}>
									<div className={cx('__container')}>
										<div className={cx('__scoreboxContainer')}>
											<MatchResultDetailBar
												homeBadge={matchDetail ? matchDetail.home.teamlogo : ''}
												homeName={matchDetail ? matchDetail.home.teamname : ''}
												homeResult={matchDetail ? matchDetail.homeResult : ''}
												awayBadge={matchDetail ? matchDetail.away.teamlogo : ''}
												awayName={matchDetail ? matchDetail.away.teamname : ''}
												awayResult={
													matchDetail ? matchDetail.awayResult : ''
												}></MatchResultDetailBar>

											{/* <div className={cx('__matchStats')}>
												<div className={cx('__matchStats__halfTime')}>
													<span>Half Time</span>
													{matchDetail ? matchDetail.homeResult : ''} -{' '}
													{matchDetail ? matchDetail.awayResult : ''}
												</div>
											</div>
											<div className={cx('__matchStats__kickOff')}>
												KickOff:
												<strong>
													{matchDetail
														? dateFormat(matchDetail.matchDay).toString()
														: ''}
												</strong>
											</div>
											<div className={cx('__matchEvents')}>
												<div className={cx('__matchEvents__home')}>
													{matchDetail
														? matchDetail.process?.map((x: any) => {
																return x.side === 'home' ? (
																	<MatchEvent
																		playerName={
																			x.player ? x.player[0].name : ''
																		}
																		side={x.side}
																		type={x.type}
																		mins={x.mins}></MatchEvent>
																) : (
																	<></>
																);
														  })
														: ''}
												</div>

												<div className={cx('__matchEvents__away')}>
													{matchDetail
														? matchDetail.process?.map((x: any) => {
																return x.side === 'away' ? (
																	<MatchEvent
																		playerName={
																			x.player.length !== 0
																				? x.player[0].name
																				: ''
																		}
																		side={x.side}
																		type={x.type}
																		mins={x.mins}></MatchEvent>
																) : (
																	<></>
																);
														  })
														: ''}
												</div>
											</div>

											<div className={cx('__assists')}>
												<div className={cx('__assists__title')}>Assists</div>
												<div className={cx('__assistsHome')}>
													{matchDetail
														? matchDetail.process?.map((x: any) => {
																return x.side === 'home' &&
																	x.type === 'goal' ? (
																	<MatchEventAssistant
																		assistance={
																			x.player.length !== 0
																				? x.player[1].name
																				: ''
																		}
																		side={x.side}
																		mins={x.mins}></MatchEventAssistant>
																) : (
																	<></>
																);
														  })
														: ''}
												</div>

												<div className={cx('__assistsAway')}>
													{matchDetail
														? matchDetail.process?.map((x: any) => {
																return x.side === 'away' &&
																	x.type === 'goal' ? (
																	<MatchEventAssistant
																		assistance={
																			x.player.length !== 0
																				? x.player[1].name
																				: ''
																		}
																		side={x.side}
																		mins={x.mins}></MatchEventAssistant>
																) : (
																	<></>
																);
														  })
														: ''}
												</div>
											</div> */}

											<SummarizeBox></SummarizeBox>
											<div className={cx('__timeLine')}>
												<a className={cx('__timeLine__team')}>
													<span className={cx('__timeLine__badge')}>
														<span className={cx('__timeLine__badge__block')}>
															<img
																src={
																	matchDetail ? matchDetail.home.teamlogo : ''
																}
																className={cx(
																	'__timeLine__badge--adjust'
																)}></img>
														</span>
													</span>
													{matchDetail ? matchDetail.home.teamname : ''}
												</a>
												<div className={cx('__timeLine__crossbar')}>
													<div className={cx('__timeLine__crossbar--adjust')}>
														HT
													</div>
													{matchDetail
														? matchDetail.process?.map((x: any) => {
																return (
																	<MatchEventTimeLine
																		type={x.type}
																		mins={x.mins}
																		homeBadge={matchDetail.home.teamlogo}
																		homeName={matchDetail.home.teamname}
																		homeResult={matchDetail.homeResult}
																		awayBadge={matchDetail.away.teamlogo}
																		awayName={matchDetail.away.teamname}
																		awayResult={matchDetail.awayResult}
																		playerName={x.player[0].name}
																		playerImg={x.player[0].image}
																		playerNumber={x.player[0].shirtnumber}
																		assistance={x.player[1]?.name}
																		subOn={x.player[0].name}
																		subOnImg={x.player[0].image}
																		subOnNumber={x.player[0].shirtnumber}
																		subOff={x.player[1]?.name}
																		subOffImg={x.player[1]?.image}
																		subOffNumber={x.player[1]?.shirtnumber}
																		side={x.side}></MatchEventTimeLine>
																);
														  })
														: ''}
												</div>

												<a className={cx('__timeLine__team')}>
													<span className={cx('__timeLine__badge')}>
														<span className={cx('__timeLine__badge__block')}>
															<img
																src={
																	matchDetail ? matchDetail.away.teamlogo : ''
																}
																className={cx(
																	'__timeLine__badge--adjust'
																)}></img>
														</span>
													</span>
													{matchDetail ? matchDetail.away.teamname : ''}
												</a>
											</div>
										</div>
									</div>
								</div>
							</section>
							<div className={cx('__optionsBlock')}>
								<div className={cx('__optionsBlock__wrapper')}>
									<ul className={cx('__optionsBlock__wrapper--adjust')}>
										<li
											id='stats'
											onClick={(e: any) =>
												e.currentTarget.id === 'stats'
													? setClickedId('stats')
													: ''
											}
											className={
												clickedId === 'stats' ? cx('__optionsActive') : ''
											}>
											Stats
										</li>
										<li
											id='lineUps'
											onClick={(e: any) =>
												e.currentTarget.id === 'lineUps'
													? setClickedId('lineUps')
													: ''
											}
											className={
												clickedId === 'lineUps' ? cx('__optionsActive') : ''
											}>
											Line up
										</li>

										<li
											id='PlayByPlay'
											onClick={(e: any) =>
												e.currentTarget.id === 'PlayByPlay'
													? setClickedId('PlayByPlay')
													: ''
											}
											className={
												clickedId === 'PlayByPlay' ? cx('__optionsActive') : ''
											}>
											Play-By-Play
										</li>
									</ul>
								</div>
							</div>
							<div className={cx('_detailsWrapper')}>
								<div
									className={
										clickedId === 'stats' ? cx('__active') : cx('__inactive')
									}>
									<GameLeaders></GameLeaders>
									<TeamComparison></TeamComparison>
								</div>
								<div
									className={
										clickedId === 'lineUps' ? cx('__active') : cx('__inactive')
									}>
									<LineUp
										home={matchDetail?.home}
										away={matchDetail?.away}></LineUp>
								</div>

								<div
									className={
										clickedId === 'PlayByPlay'
											? cx('__active')
											: cx('__inactive')
									}>
									<PlayByPlay
										matchId={matchDetail?.id}
										process={matchDetail?.process}
										homePlayers={homePlayers}
										awayPlayers={awayPlayers}></PlayByPlay>
								</div>
							</div>
						</div>
					</div>
				</section>
			</ContentWrapper>
		</>
	);
};
