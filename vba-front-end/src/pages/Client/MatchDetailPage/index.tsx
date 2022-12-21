import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './matchDetailPage.module.scss';

import { SidebarFixture } from '../../../components/LandingPage/SideBarFixtures';
import { MatchInfoBar } from '../../../components/Bar/MatchInfoBar';
import { MatchResultDetailBar } from '../../../components/Bar/MatchResultDetailBar';

import { MatchEventInterface, Player, Process, Team, Tournament } from '../../../Services/models';
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
const processServices = vbaContext.getProcessServices();

const teamServices = vbaContext.getTeamServices();
const playerServices = vbaContext.getPlayerServices();

interface CustomProcess {
	id?: string,
	type?: string,
	mins?: string | number,
	quater?: string,
	playerattack?: string,
	playersupport?: string,
	side?: string,
	match?: string,
	option?: string,
	description?: string,
	firstname?: string,
	lastname?: string,
	image?: string,
	shirtnumber?: string | number,
	country?: string,
	playerid?: string,
}

// const getHomeTeam = (m:CustomMatch[]) =>{

// 	return m.find((item)=> item.home === item.teamid)
// }

// const getAwayTeam = (m:CustomMatch[]) =>{
// 	return m.find((item)=> item.away === item.teamid)
// }

const getPlayerAttackByProcessId = (p: CustomProcess[], processId: string) => {
	return p.find((item) => item.id === processId && item.playerattack === item.playerid)
}

const getPlayerSupportByProcessId = (p: CustomProcess[], processId: string) => {
	return p.find((item) => item.id === processId && item.playersupport === item.playerid)
}

const getProcessById = (p: CustomProcess[], processId: string) => {
	return p.find((item) => item.id === processId)
}


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
	const [processes, setProcesses] = useState<CustomProcess[]>([]);
	const [processIdArray, setProcessIdArray] = useState<string[]>([]);


	const handleCloseModal = () => {
		setClickedId('close');
	};

	useEffect(() => {
		(async () => {
			if (params.id) {
				const res = await matchServices.getMatchDetails(params.id);
				setMatchDetail(res)
				console.log("matches", res)
				const res1 = await processServices.getProcessesByMatchId(params.id) as CustomProcess[];
				setProcesses(res1);
				console.log("process", res1)

				const processArray = res1.map((item: CustomProcess) => item.id)
				const process1 = processArray.filter((iteam, index) => { return processArray.indexOf(iteam) === index; });
				setProcessIdArray(process1 as string[])

			}
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
						<SidebarFixture seasonId={matchDetail?.seasonid}></SidebarFixture>
					</div>
					<div className='col-span-4'>
						<div className={cx('__centralContent')}>
							<section className={cx('__centralContent__box')}>
								<div className={cx('__centralContent__theme')}>
									<div className={cx('__centralContent__homeTheme')}>
										<div className={cx('__centralContent__teamLogoBlock')}>
											{matchDetail && matchDetail.home && <img
												src={matchDetail.home[0].teamlogo as any ?? ""}
												alt=''
												className={cx('__centralContent__teamLogoBlock--adjust')}
											/>}
										</div>
									</div>

								</div>
								<div className={cx('__centralContent__theme')}>
									<div className={cx('__centralContent__awayTheme')}>
										<div className={cx('__centralContent__teamLogoBlock')}>
											{matchDetail && matchDetail.away && <img
												src={matchDetail.away[0].teamlogo ?? ""}
												alt=''
												className={cx('__centralContent__teamLogoBlock--adjust')}
											/>}
										</div>
									</div>

								</div>
								<div className={cx('__centralContent__theme')}>
									<svg width='100%' height='100%' viewBox='0 0 100 100' preserveAspectRatio='none'>
										{matchDetail && matchDetail.home && <polygon
											points='0,0 60,0 40,100 0,100 0,0'
											fill={matchDetail.home[0].color ?? ""}
											fillOpacity='0.95'></polygon>}
										{matchDetail && matchDetail.away && <polygon
											points='60,0 40,100 100,100 100,0 60,0'
											fill={matchDetail.away[0].color ?? ""}
											fillOpacity='0.95'></polygon>}
									</svg>
								</div>
								<div className={cx('__centralContent__theme')}>
									<div className={cx('__centralContent__themeShadow')}></div>
								</div>

								{/* bar */}
								<div className={cx('__container')}>
									<div className={cx('__bar')}>
										{matchDetail &&
											<MatchInfoBar
												date={dateFormat(matchDetail.matchday)?.toString() ?? ""}
												referee={matchDetail.referee ?? ""}
												stadiumName={matchDetail.home ? matchDetail.home[0].stadiumname ?? "" : ""}
												spectators={matchDetail.spectators ?? ""}
											/>
										}

									</div>
								</div>

								{/* Edit + Modal */}
								<div className={cx('__editBlock')}>
									<div className={cx('__editBlock__wrapper')}>
										<ul className={cx('__editBlock__wrapper--adjust')}>
											<li
												id='edit'
												onClick={(e: any) => (e.currentTarget.id === 'edit' ? setClickedId('edit') : '')}
												className={clickedId === 'edit' ? cx('__editActive') : ''}>
												Edit
											</li>

										</ul>
									</div>
								</div>

								<div className={clickedId === 'edit' ? cx('__active') : cx('__inactive')}>
									<ControlModal
										// matchDetail={matchDetail}
										modalType='edit'
										handleCloseModal={handleCloseModal}
										matchId={params.id}
										homePlayers={matchDetail?.home}
										awayPlayers={matchDetail?.away}></ControlModal>
								</div>

								{/* scorebox */}
								<div className={cx('__scoreboxContainer')}>
									<div className={cx('__container')}>
										<div className={cx('__scoreboxContainer')}>
											{matchDetail && matchDetail.home && matchDetail.away &&
												<MatchResultDetailBar
													homeBadge={matchDetail.home[0].teamlogo ?? ""}
													homeName={matchDetail.home[0].teamname ?? ""}
													homeResult={matchDetail.homeresult ?? "0"}
													awayBadge={matchDetail.away[0].teamlogo ?? ""}
													awayName={matchDetail.away[0].teamname ?? ""}
													awayResult={matchDetail.awayresult ?? "0"}
												/>
											}





											<SummarizeBox></SummarizeBox>
											<div className={cx('__timeLine')}>
												<a className={cx('__timeLine__team')}>
													<span className={cx('__timeLine__badge')}>
														<span className={cx('__timeLine__badge__block')}>
															{matchDetail && matchDetail.home && <img
																alt=""
																src={matchDetail.home[0].teamlogo ?? ""}
																className={cx('__timeLine__badge--adjust')}></img>}
														</span>
													</span>
													{matchDetail && matchDetail.home && matchDetail.home[0].teamname ? matchDetail.home[0].teamname : ""}
												</a>
												<div className={cx('__timeLine__crossbar')}>
													<div className={cx('__timeLine__crossbar--adjust')}>HT</div>
													{processIdArray.map((processId: string, i: number) => {
														return (

															matchDetail && matchDetail.home && matchDetail.away &&

															<MatchEventTimeLine
																type={getProcessById(processes, processId)?.type ?? ""}
																mins={getProcessById(processes, processId)?.mins as number ?? ""}
																homeBadge={matchDetail.home[0].teamlogo ?? ""}
																homeName={matchDetail.home[0].teamname ?? ""}
																homeResult={matchDetail.homeresult ?? "0"}
																awayBadge={matchDetail.away[0].teamlogo as string ?? ""}
																awayName={matchDetail.away[0].teamname ?? ""}
																awayResult={matchDetail.awayresult ?? "0"}
																playerName={getPlayerAttackByProcessId(processes, processId)?.lastname && "" + getPlayerAttackByProcessId(processes, processId)?.firstname && ""}
																playerImg={getPlayerAttackByProcessId(processes, processId)?.image ?? ""}
																playerNumber={getPlayerAttackByProcessId(processes, processId)?.shirtnumber as number ?? ""}
																assistance={getPlayerSupportByProcessId(processes, processId)?.lastname && "" + getPlayerSupportByProcessId(processes, processId)?.firstname && ""}
																subOn={getPlayerAttackByProcessId(processes, processId)?.lastname && "" + getPlayerAttackByProcessId(processes, processId)?.firstname && ""}
																subOnImg={getPlayerAttackByProcessId(processes, processId)?.image ?? ""}
																subOnNumber={getPlayerAttackByProcessId(processes, processId)?.shirtnumber as number ?? ""}
																subOff={getPlayerSupportByProcessId(processes, processId)?.lastname && "" + getPlayerSupportByProcessId(processes, processId)?.firstname && ""}
																subOffImg={getPlayerSupportByProcessId(processes, processId)?.image ?? ""}
																subOffNumber={getPlayerSupportByProcessId(processes, processId)?.shirtnumber as number ?? ""}
																side={getProcessById(processes, processId)?.side ?? ""}></MatchEventTimeLine>


														);
													})
													}
												</div>

												<a className={cx('__timeLine__team')}>
													<span className={cx('__timeLine__badge')}>
														<span className={cx('__timeLine__badge__block')}>
															{matchDetail && matchDetail.away && <img
																alt=""
																src={matchDetail.away[0].teamlogo ?? ""}
																className={cx('__timeLine__badge--adjust')}></img>}
														</span>
													</span>
													{matchDetail && matchDetail.away && matchDetail.away[0].teamname ? matchDetail.away[0].teamname : ""}
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
											onClick={(e: any) => (e.currentTarget.id === 'stats' ? setClickedId('stats') : '')}
											className={clickedId === 'stats' ? cx('__optionsActive') : ''}>
											Stats
										</li>
										<li
											id='lineUps'
											onClick={(e: any) => (e.currentTarget.id === 'lineUps' ? setClickedId('lineUps') : '')}
											className={clickedId === 'lineUps' ? cx('__optionsActive') : ''}>
											Line up
										</li>

										<li
											id='PlayByPlay'
											onClick={(e: any) => (e.currentTarget.id === 'PlayByPlay' ? setClickedId('PlayByPlay') : '')}
											className={clickedId === 'PlayByPlay' ? cx('__optionsActive') : ''}>
											Play-By-Play
										</li>
									</ul>
								</div>
							</div>
							{/* <div className={cx('_detailsWrapper')}>
								<div className={clickedId === 'stats' ? cx('__active') : cx('__inactive')}>
									<GameLeaders></GameLeaders>
									<TeamComparison></TeamComparison>
								</div>
								<div className={clickedId === 'lineUps' ? cx('__active') : cx('__inactive')}>
									<LineUp home={matchDetail?.home} away={matchDetail?.away}></LineUp>
								</div>

								<div className={clickedId === 'PlayByPlay' ? cx('__active') : cx('__inactive')}>
									<PlayByPlay
										matchId={matchDetail?.id}
										process={matchDetail?.process}
										homePlayers={homePlayers}
										awayPlayers={awayPlayers}></PlayByPlay>
								</div>
							</div> */}
						</div>
					</div>
				</section>
			</ContentWrapper>
		</>
	);
};
