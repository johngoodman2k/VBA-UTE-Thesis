import React, { useEffect } from 'react';
import styles from './sideBarFixtures.module.scss';
import classNames from 'classnames/bind';
import { UpCommingMatchBar } from '../../Bar/UpCommingMatchBar';
import { vbaContext } from '../../../Services/services';
import { CustomTournament, Tournament } from '../../../Services/models';
import { dateFormat, timeFormat } from '../../../utils/dateFormat';

const cx = classNames.bind(styles);
const tournamentServices = vbaContext.getTournamentServices();

type SidebarFixtureProps = {
	seasonId?:string;
}
const getRoundByid = (t:CustomTournament[],roundId:string)=>{
	if(t.length ===0) return;
	return t.find((item)=> item.roundid === roundId)
}
const getMatchById = (t:CustomTournament[],matchId:string,team: "team1"|"team2")=>{
	if(t.length ===0) return;
	return t.find((item)=> item.matchid === matchId && ((team==='team1' && item.teamid === item.matchhome) || (team==='team2' && item.teamid === item.matchaway)))
}

export const SidebarFixture = ({seasonId}:SidebarFixtureProps) => {
	const [upCommingMatches, setUpCommingMatches] = React.useState<CustomTournament[]>([]);
	const [rounds,setRounds] = React.useState<string[]>([]);
	const [matches,setMatches] = React.useState<string[]>([]);

	useEffect(() => {
		(async () => {
			if(seasonId){
				const res = await tournamentServices.getMergeTournamentById("WMlzXgVpPLOJzCrY1q7Fl",seasonId) as CustomTournament[];
				setUpCommingMatches(res);
	
				const roundArray = res.map((i:CustomTournament) => i.roundid)
				const round1 = roundArray.filter((i, index) => {return roundArray.indexOf(i) === index;});
				const matchArray = res.map((i:CustomTournament) => i.matchid)
				const match1 = matchArray.filter((i, index) => {return matchArray.indexOf(i) === index;});
				setMatches(match1  as string[])
				setRounds(round1 as string[])
			}
			

		})();
	}, [seasonId]);
	return (
		<div className={cx('wrapper')}>
			
				{rounds.map((x: string, i: number) => {
					return (
						<>
							<header>
								<div className={cx('__week')}>Match Week {getRoundByid(upCommingMatches,x)?.roundname}</div>
								<div className={cx('__logoWrapper')}>
									<img
										className={cx('__logoWrapper--adjust')}
										src='https://logos-world.net/wp-content/uploads/2020/11/National-Basketball-Association-Logo-1969-2017.png'
										alt=''
									/>
								</div>
								<div className={cx('__localTime')}>
									All times shown are your <strong>local time</strong>
								</div>
							</header>
							<div className={cx('__matchList')}>
								<time>{dateFormat(getRoundByid(upCommingMatches,x)?.roundcreatedat)}</time>
								<div className={cx('__matchList--adjust')}>
									{matches && matches.map((y: string) => {
										return (
											<UpCommingMatchBar
												id={y}
												homeName={getMatchById(upCommingMatches,y,"team1")?.teamname ?? ''}
												homeBadge={getMatchById(upCommingMatches,y,"team1")?.teamlogo ?? ""}
												awayName={getMatchById(upCommingMatches,y,"team2")?.teamname ?? ''}
												awayBadge={getMatchById(upCommingMatches,y,"team2")?.teamlogo?? ""}
												time={timeFormat(getMatchById(upCommingMatches,y,"team2")?.matchday as Date) ?? ""}
											></UpCommingMatchBar>
										);
									})}
								</div>
							</div>
						</>
					);
				})}
		</div>
	);
};
