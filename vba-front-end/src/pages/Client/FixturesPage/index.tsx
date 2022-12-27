import React, { useEffect, useState } from 'react';
// import { context } from "../../../authentication/service";
import { ContentWrapper } from '../../../components/Container/ContentWrapper';
import classNames from 'classnames/bind';
import styles from './fixturesPage.module.scss';
import { NavigationBar } from '../../../components/Bar/NavigationBar';
import { UpcommingMatchLongBar } from '../../../components/Bar/UpcommingMatchLongBar';
import { CustomTournament, Match, Round, Season, Team, Tournament } from '../../../Services/models';
import userEvent from '@testing-library/user-event';
import LogoHome from '../../../assets/images/toronto-raptors-logo.png'
import { vbaContext } from '../../../Services/services';
import { dateFormat, timeFormat } from '../../../utils/dateFormat';
import { useParams } from 'react-router-dom';
import { ReactComponent as DownArrowLogo } from '../../../assets/images/downarrow-com.svg';
import { SeasonServices } from '../../../Services';
import { NoData } from '../../Admin/Components/NoData';
import { ListItemAvatar } from '@mui/material';
import ButtonTournament from '../Authentication/Components/ButtonTournament';
import toastNotify from '../../../utils/toast';

// import { getRoundApi } from "../Apis/getRoundApi.api";
// import { TournamentHeading } from "../components/TournamentHeading";
// import { UpcommingMatchesLong } from "../components/UpcommingMatchesLong";
// import { Matches, Teams, Tournaments } from "../Services/models";
// import { tournamentcontext } from "../Services/services";

const cx = classNames.bind(styles);
const tournamentServices = vbaContext.getTournamentServices();
const seasonServices = vbaContext.getSeasonServices();


const getRoundByid = (t: CustomTournament[], roundId: string) => {
	if (t.length === 0) return;
	return t.find((item) => item.roundid === roundId)
}

const getMatchByRoundId = (t: CustomTournament[], roundId: string) => {
	if (t.length === 0) return [];
	return t.filter((item) => item.roundid === roundId)
}

export const FixturesPage = () => {
	const params = useParams();
	const [season, setSeason] = useState<Season>();
	const [seasonIdSelected, setSeasonIdSelected] = useState<string>("")
	const [seasonList, setSeasonList] = useState<Season[]>([])
	const [rounds, setRounds] = useState<string[]>([]);
	const [reload, setReload] = useState(false);



	useEffect(() => {
		(async () => {
			if (params.id) {
				const res1 = await seasonServices.getSeasonByTournamentId(params.id)
				if (res1 && res1.length !== 0) {
					// setSeasonIdSelected(res1[0].id?? "")
					setSeasonList(res1)
					if (seasonIdSelected && seasonIdSelected !== "") {
						const res = await tournamentServices.getMergeTournamentById(params.id, seasonIdSelected);
						setSeason(res[0]);

						console.log("60", res)
					} else {
						console.log(70, res1)
						const res = await tournamentServices.getMergeTournamentById(params.id, res1[0].id ?? "")
						setSeason(res[0]);

						console.log("80", res)

					}

					console.log(res1)
				}
				// }else{
				// 	const res = await tournamentServices.getTournamentById(params.id);
				// 	setTournament(res);

				// }

			}
		})();
	}, [params.id, seasonIdSelected, reload]);

	const handleGenerate = async () => {
		if (params.id)
			try {
				await tournamentServices.GetGeneratedMatches(params.id, seasonIdSelected)
				toastNotify("Generated matches success", "success")
				setReload(!reload)
			} catch (error) {
				toastNotify("Generated matches failed", "error")
			}
	}
	return (
		<>
			<ContentWrapper>
				<NavigationBar></NavigationBar>
				<div className={`${cx('__main-wrapper')}`}>
					<div className={`${cx('__main-fixturesHeader')}`}>
						{/* season select */}
						<div
							className='flex justify-center gap-8 items-center'>
							<div className='text-2xl font-bold italic'>Mùa giải</div>
							<div className='relative inline-block w-2/5 mr-2 ml-2 '>
								<label className={`${cx('__selection')} w-full `}>
									<select value={seasonIdSelected} onChange={(e: any) => setSeasonIdSelected(e.target.value)} className={`${cx('__selection__button')} `}>
										{seasonList.length > 0 && seasonList.map((season) =>
										(<option value={season.id} className={`${cx('__selection__button')}`}>
											{season.name}
										</option>))}


									</select>
									<div className={`${cx('__arrow')}`}>
										<DownArrowLogo className='w-4 h-4'></DownArrowLogo>
									</div>
								</label>
							</div>
							<div> <ButtonTournament type={undefined} name='Generate' onClick={handleGenerate} ></ButtonTournament></div>
							<div> <ButtonTournament type={undefined} name='Play OFF' onClick={handleGenerate} ></ButtonTournament></div>

						</div>

						{season && season.rounds && season.rounds.map((x: Round, i: number) => {
							return (
								<>
									<header>
										<div className={`${cx('__main-fixturesHeader--week')}`}>Vòng {x.roundname}</div>
										<div className={`${cx('__main-fixturesHeader--competition')}`}>
											<img
												className={`${cx('__main-fixturesHeader--competition---image')}`}
												src={LogoHome}
												alt=''
											/>

										</div>
										<div className={`${cx('__main-fixturesHeader--localtime')}`}>
											Thời gian được hiển thị theo <strong>khu vực của bạn</strong>
										</div>
									</header>
									<div className={`${cx('__main-matchListContainer')}`}>
										<div className={`${cx('__main-matchListContainer--time')}`}>
											<h3 className={`${cx('__main-matchListContainer--time---text')}`}>{dateFormat(x.createdat as Date)}</h3>
											<ul className={`${cx('__main-matchListContainer--list')}`}>
												{x.matches && x.matches.map((y: Match) => {
													return (
														<UpcommingMatchLongBar
															id={y.id}
															team1Name={y.home?.teamname ?? y["home"] as string ??""}
															team1Image={y.home?.teamlogo as string ?? ""}
															team2Image={y.away?.teamlogo as string ?? ""}
															team2Name={y.away?.teamname ?? y["away"] as string ??  ""}
															time={timeFormat(y.matchday ??  "").toString()}
															stadium={y.home?.stadiumname ?? ""}
															endmatch={y.endmatch}
															team1Point={y.homeresult}
															team2Point={y.awayresult}

														></UpcommingMatchLongBar>
													);
												})}
											</ul>
											;
										</div>
									</div>
								</>
							)
						})}
					</div>
				</div>
			</ContentWrapper>
		</>
	);
};
