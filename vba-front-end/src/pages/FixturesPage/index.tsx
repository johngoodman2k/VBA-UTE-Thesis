import React, { useEffect, useState } from 'react';
// import { context } from "../../../authentication/service";
import { ContentWrapper } from '../../components/Container/ContentWrapper';
import classNames from 'classnames/bind';
import styles from './fixturesPage.module.scss';
import { NavigationBar } from '../../components/Bar/NavigationBar';
import { UpcommingMatchLongBar } from '../../components/Bar/UpcommingMatchLongBar';
import { Tournament } from '../../Services/models';
import userEvent from '@testing-library/user-event';

import { vbaContext } from '../../Services/services';
import { dateFormat, timeFormat } from '../../utils/dateFormat';
// import { getRoundApi } from "../Apis/getRoundApi.api";
// import { TournamentHeading } from "../components/TournamentHeading";
// import { UpcommingMatchesLong } from "../components/UpcommingMatchesLong";
// import { Matches, Teams, Tournaments } from "../Services/models";
// import { tournamentcontext } from "../Services/services";

const cx = classNames.bind(styles);
const VbaServices = vbaContext.getTournamentServices();

export const FixturesPage = () => {
	const [tournament, setTournament] = useState<Tournament>();
	useEffect(() => {
		(async () => {
			const res = await VbaServices.getTournamentById('2');

			setTournament(res);
		})();
	}, []);
	return (
		<>
			<ContentWrapper>
				<NavigationBar></NavigationBar>
				<div className={`${cx('__main-wrapper')}`}>
					<div className={`${cx('__main-fixturesHeader')}`}>
						{tournament?.seasons[0].rounds.map((x: any, i: number) => {
							return (
								<>
									<header>
										<div className={`${cx('__main-fixturesHeader--week')}`}>
											MatchWeek {x.roundname}
										</div>
										<div
											className={`${cx('__main-fixturesHeader--competition')}`}>
											<img
												className={`${cx(
													'__main-fixturesHeader--competition---image'
												)}`}
												src='https://upload.wikimedia.org/wikipedia/vi/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png'
												alt=''
											/>
										</div>
										<div
											className={`${cx('__main-fixturesHeader--localtime')}`}>
											All times shown are your <strong>local time</strong>
										</div>
									</header>
									<div className={`${cx('__main-matchListContainer')}`}>
										<div className={`${cx('__main-matchListContainer--time')}`}>
											<h3
												className={`${cx(
													'__main-matchListContainer--time---text'
												)}`}>
												{dateFormat(x.createdAt)}
											</h3>
											<ul
												className={`${cx('__main-matchListContainer--list')}`}>
												{x.matches.map((y: any) => {
													return (
														<UpcommingMatchLongBar
															id={y.id}
															team1Name={y.home.teamname}
															team1Image={y.home.teamlogo}
															team2Image={y.away.teamlogo}
															team2Name={y.away.teamname}
															time={timeFormat(y.matchDay).toString()}
															stadium={
																y.home.stadiumname
															}></UpcommingMatchLongBar>
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
