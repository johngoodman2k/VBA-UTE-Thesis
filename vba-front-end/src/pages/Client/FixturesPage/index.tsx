import React, { useEffect, useState } from 'react';
// import { context } from "../../../authentication/service";
import { ContentWrapper } from '../../../components/Container/ContentWrapper';
import classNames from 'classnames/bind';
import styles from './fixturesPage.module.scss';
import { NavigationBar } from '../../../components/Bar/NavigationBar';
import { UpcommingMatchLongBar } from '../../../components/Bar/UpcommingMatchLongBar';
import { CustomTournament, Match, Round, Season, Tournament } from '../../../Services/models';
import userEvent from '@testing-library/user-event';

import { vbaContext } from '../../../Services/services';
import { dateFormat, timeFormat } from '../../../utils/dateFormat';
import { useParams } from 'react-router-dom';
import { ReactComponent as DownArrowLogo } from '../../../assets/images/downarrow-com.svg';
import { SeasonServices } from '../../../Services';
import { NoData } from '../../Admin/Components/NoData';
import { ListItemAvatar } from '@mui/material';

// import { getRoundApi } from "../Apis/getRoundApi.api";
// import { TournamentHeading } from "../components/TournamentHeading";
// import { UpcommingMatchesLong } from "../components/UpcommingMatchesLong";
// import { Matches, Teams, Tournaments } from "../Services/models";
// import { tournamentcontext } from "../Services/services";

const cx = classNames.bind(styles);
const tournamentServices = vbaContext.getTournamentServices();
const seasonServices = vbaContext.getSeasonServices();



const getMatchById = (t:CustomTournament[],matchId:string,team: "team1"|"team2")=>{
	if(t.length ===0) return;
	return t.find((item)=> item.matchid === matchId && ((team==='team1' && item.teamid === item.matchhome) || (team==='team2' && item.teamid === item.matchaway)))
}

const getRoundByid = (t:CustomTournament[],roundId:string)=>{
	if(t.length ===0) return;
	return t.find((item)=> item.roundid === roundId)
}

export const FixturesPage = () => {
	const params = useParams();
	const [tournament, setTournament] = useState<CustomTournament[]>([]);
	const [seasonIdSelected,setSeasonIdSelected] = useState<string>("")
	const [seasonList, setSeasonList] = useState<Season[]>([])
	const [rounds,setRounds] = useState<string[]>([]);
	const [matches,setMatches] = useState<string[]>([]);

	useEffect(() => {
		(async () => {
			if(params.id){
				const res1 = await seasonServices.getSeasonByTournamentId(params.id)
				if(res1 && res1.length >0){
					// setSeasonIdSelected(res1[0].id?? "")
					setSeasonList(res1)
					if(seasonIdSelected && seasonIdSelected !==""){
						const res = await tournamentServices.getMergeTournamentById(params.id,seasonIdSelected) as CustomTournament[];
						setTournament(res);
						const roundArray = res.map((i:CustomTournament) => i.roundid)
						const round1 = roundArray.filter((i, index) => {return roundArray.indexOf(i) === index;});
						setRounds(round1 as string[])
						const matchArray = res.map((i:CustomTournament) => i.matchid)
						const match1 = matchArray.filter((i, index) => {return matchArray.indexOf(i) === index;});
						setMatches(match1  as string[])
						console.log(round1)

						console.log("60",tournament)
					}else{
						const res = await tournamentServices.getMergeTournamentById(params.id,res1[0].id?? "") as CustomTournament[];
						setTournament(res);
						const roundArray = res.map((i:CustomTournament) => i.roundname)
						const round1 = roundArray.filter((i, index) => {return roundArray.indexOf(i) === index;});
						setRounds(round1 as string[])
						const matchArray = res.map((i:CustomTournament) => i.matchid)
						const match1 = matchArray.filter((i, index) => {return matchArray.indexOf(i) === index;});
						setMatches(match1  as string[])

					}

					console.log(res1)
				}
				// }else{
				// 	const res = await tournamentServices.getTournamentById(params.id);
				// 	setTournament(res);

				// }
				
			}
		})();
	}, [params.id,seasonIdSelected]);
	return (
		<>
			<ContentWrapper>
				<NavigationBar></NavigationBar>
				<div className={`${cx('__main-wrapper')}`}>
					<div className={`${cx('__main-fixturesHeader')}`}>
						{/* season select */}
						<div className='relative inline-block w-2/5 mr-2 ml-2 '>
							<label className={`${cx('__selection')} w-full `}>
								<select value={seasonIdSelected} onChange={(e:any) =>setSeasonIdSelected(e.target.value)} className={`${cx('__selection__button')} `}>
									{seasonList.length>0 &&seasonList.map((season)=>
										(<option value={season.id} className={`${cx('__selection__button')}`}>
									{season.name}
									</option> ))}
										
									
								</select>
								<div className={`${cx('__arrow')}`}>
									<DownArrowLogo className='w-4 h-4'></DownArrowLogo>
								</div>
							</label>
						</div>

						{rounds.map((x: string, i: number) => {
								return (
									<>
										<header>
											<div className={`${cx('__main-fixturesHeader--week')}`}>MatchWeek {getRoundByid(tournament,x)?.roundname}</div>
											<div className={`${cx('__main-fixturesHeader--competition')}`}>
												<img
													className={`${cx('__main-fixturesHeader--competition---image')}`}
													src='https://upload.wikimedia.org/wikipedia/vi/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png'
													alt=''
												/>
											</div>
											<div className={`${cx('__main-fixturesHeader--localtime')}`}>
												All times shown are your <strong>local time</strong>
											</div>
										</header>
										<div className={`${cx('__main-matchListContainer')}`}>
											<div className={`${cx('__main-matchListContainer--time')}`}>
												<h3 className={`${cx('__main-matchListContainer--time---text')}`}>{dateFormat(getRoundByid(tournament,x)?.roundcreatedat as Date)}</h3>
												<ul className={`${cx('__main-matchListContainer--list')}`}>
													{matches && matches.map((y: string) => {
														return (
															<UpcommingMatchLongBar
																id={y}
																team1Name={getMatchById(tournament,y,"team1")?.teamname ?? ""}
																team1Image={getMatchById(tournament,y,"team1")?.teamlogo ?? ""}
																team2Image={getMatchById(tournament,y,"team2")?.teamlogo ?? ""}
																team2Name={getMatchById(tournament,y,"team2")?.teamname ?? ""}
																time={timeFormat(getMatchById(tournament,y,"team1")?.matchday as Date).toString()}
																stadium={getMatchById(tournament,y,"team1")?.stadiumname ?? ""}
															></UpcommingMatchLongBar>
														);
													})}
												</ul>
												;
											</div>
										</div>
									</>
								);
							})}
					</div>
				</div>
			</ContentWrapper>
		</>
	);
};
