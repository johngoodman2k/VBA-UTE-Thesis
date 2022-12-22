import React, { useEffect } from 'react';
import styles from './sideBarFixtures.module.scss';
import classNames from 'classnames/bind';
import { UpCommingMatchBar } from '../../Bar/UpCommingMatchBar';
import { vbaContext } from '../../../Services/services';
import { CustomTournament, Match, Round, Season, Tournament } from '../../../Services/models';
import { dateFormat, timeFormat } from '../../../utils/dateFormat';

const cx = classNames.bind(styles);
const tournamentServices = vbaContext.getTournamentServices();

type SidebarFixtureProps = {
	seasonId?: string;
}
const getRoundByid = (t: CustomTournament[], roundId: string) => {
	if (t.length === 0) return;
	return t.find((item) => item.roundid === roundId)
}
const getMatchById = (t: CustomTournament[], matchId: string, team: "team1" | "team2") => {
	if (t.length === 0) return;
	return t.find((item) => item.matchid === matchId && ((team === 'team1' && item.teamid === item.matchhome) || (team === 'team2' && item.teamid === item.matchaway)))
}

export const SidebarFixture = ({ seasonId }: SidebarFixtureProps) => {
	const [upCommingMatches, setUpCommingMatches] = React.useState<Season>();


	useEffect(() => {
		(async () => {
			if (seasonId) {
				const res = await tournamentServices.getMergeTournamentById("uWvQv6nLYcPAyztGvzqyZ", seasonId);
				setUpCommingMatches(res[0]);
				console.log("33",res)
			}


		})();
	}, [seasonId]);
	return (
		<div className={cx('wrapper')}>

			{upCommingMatches && upCommingMatches?.rounds && upCommingMatches?.rounds.map((x: Round, i: number) => {
				return (
					<>
						<header>
							<div className={cx('__week')}>Match Week {x.roundname}</div>
							<div className={cx('__logoWrapper')}>
								<img
									className={cx('__logoWrapper--adjust')}
									src='https://logos-world.net/wp-content/uploads/2020/11/National-Basketball-Association-Logo-1969-2017.png'
									alt=''
								/>
							</div>
							<div className={cx('__localTime')}>
								Thời gian được hiển thị theo <strong>khu vực của bạn</strong>
							</div>
						</header>
						<div className={cx('__matchList')}>
							<time>{dateFormat(x.createdat)}</time>
							<div className={cx('__matchList--adjust')}>
								{x.matches && x.matches.map((y: Match) => {
									return (
										<UpCommingMatchBar
											id={y.id}
											homeName={y.home?.shortname ?? ''}
											homeBadge={y.home?.teamlogo as string ?? ""}
											awayName={y.away?.shortname ?? ''}
											awayBadge={y.away?.teamlogo as string ?? ""}
											time={timeFormat(y.matchday as Date) ?? ""}
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
