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
import { match } from 'assert';

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
						if(!res[0]) setSeason(res as any);
						else{setSeason(res[0]);}

						console.log("60", res)
					} else {
						console.log(70, res1)
						const res = await tournamentServices.getMergeTournamentById(params.id, res1[0].id ?? "")
						if(!res[0]) setSeason(res as any);
						else{setSeason(res[0]);}

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

	const handlePlayerOff = async () => {
		if (params.id)
			try {
				await tournamentServices.generatePlayOff(seasonIdSelected,8)
				toastNotify("Tạo các trận playeroff thành công", "success")
				setReload(!reload)
			} catch (error) {
				toastNotify("Tạo các trận playeroff thất bại", "error")
			}
	}
	const handleNextRound = async () =>{
		if(season && season.rounds && season.rounds.length >0){
			const round = season?.rounds.filter((r => r.playoff))
			let saveRound= [];
			console.log(round)
			for(const r of round){
				if(r.matches && r.matches.length >0 && r.matches[0].home && r.matches[0].home.length <=20){
					saveRound.push(r);
					
				}
			}
			let roundNextId;
			for(const sr of saveRound){
				let flag = 0
				if(sr.matches && sr.matches.length >0 && sr.matches.length > flag){
					roundNextId= sr.id
					flag = sr.matches.length
				}
			}


			console.log(roundNextId)
			try{
				if(roundNextId) {
					const c = await tournamentServices.nextRound(roundNextId)
					if(c !==0){
						toastNotify("Khởi tạo vòng playoff tiếp theo thành công", "success")
						setReload(!reload)
					}else{
						toastNotify("Khởi tạo vòng playoff tiếp theo thất bại", "error")
					}
				}
			}catch(error){
				toastNotify("Khởi tạo vòng playoff tiếp theo thất bại", "error")

			}

		}
	}

	const isGenerate = (season?: Season):boolean =>{

		if(!season || !season.rounds || season.rounds.length >0 ) return false;

		return true;
	}

	const isPlayOff = (season?: Season):boolean =>{

		if(!season || !season.rounds || season.rounds.length ===0 ) return false;

		const findPlayOff = season.rounds.find(r=> {

			
			if(r.matches){
				for(const m of r.matches){
					if(!m.endmatch){
						return true
					}
				}
			}
			if(!r.playoff){
				return false
			}
			return true
		})
		if(findPlayOff) return false
		return true;
	}

	const isNextRound = (season?: Season):boolean =>{

		if(isPlayOff(season) || isGenerate(season)) return false;

		if(!season || !season.rounds) return false
		const round = season?.rounds.filter((r => r.playoff))
		if(!round || round.length ===0) return false
		for(const r of round){
			if(r.matches && r.matches.length >0 ){
				for(const m of r.matches){
					if(!m.endmatch && m.home?.length as any >= 20){
						console.log(176)
						return false
					}
				}

				if(r.roundname ==="Chung kết" &&( r.matches[0].home?.length as any >=20 || r.matches[0].home?.id?.length as any >=20)){
					return false
				}
			}
			
		}

		
		return true;
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
							<ButtonTournament style={isGenerate(season)? undefined: {backgroundColor: "#999999",color: "white"}} type="button" name='Generate' onClick={isGenerate(season) ? handleGenerate: undefined} ></ButtonTournament>
							<ButtonTournament style={isPlayOff(season)? undefined: {backgroundColor: "#999999",color: "white"}} type="button" name='Play OFF' onClick={isPlayOff(season) ?handlePlayerOff :undefined} ></ButtonTournament>
							<ButtonTournament  style={isNextRound(season)? undefined: {backgroundColor: "#999999",color: "white"}} type="button" name='Next Round' onClick={isNextRound(season) ?handleNextRound:undefined} ></ButtonTournament>

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
															team1Name={y.home?.teamname ?? y["home"] as any ??""}
															team1Image={y.home?.teamlogo as string ?? ""}
															team2Image={y.away?.teamlogo as string ?? ""}
															team2Name={y.away?.teamname ?? y["away"] as any ??  ""}
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
