import React, { useEffect } from 'react';
import styles from './sideBarFixtures.module.scss';
import classNames from 'classnames/bind';
import { UpCommingMatchBar } from '../../Bar/UpCommingMatchBar';
import { vbaContext } from '../../../Services/services';
import { Tournament } from '../../../Services/models';
import { dateFormat, timeFormat } from '../../../utils/dateFormat';

const cx = classNames.bind(styles);
const tournamentServices = vbaContext.getTournamentServices();

export const SidebarFixture = () => {
	const [upCommingMatches, setUpCommingMatches] = React.useState<Tournament>();
	useEffect(() => {
		(async () => {
			const res = await tournamentServices.getTournamentById('2');
			console.log('17', res);
			setUpCommingMatches(res);
		})();
	}, []);
	return (
		<div className={cx('wrapper')}>
			{upCommingMatches?.seasons[0].rounds.map((x: any, i: number) => {
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
								All times shown are your <strong>local time</strong>
							</div>
						</header>
						<div className={cx('__matchList')}>
							<time>{dateFormat(x.createdAt)}</time>
							<div className={cx('__matchList--adjust')}>
								{x.matches.map((y: any) => {
									return (
										<UpCommingMatchBar
											id={y.id}
											homeName={y.home.shortname ? y.home.shortname : ''}
											homeBadge={y.home.teamlogo}
											awayName={y.away.shortname ? y.away.shortname : ''}
											awayBadge={y.away.teamlogo}
											time={timeFormat(
												y.matchDay
											).toString()}></UpCommingMatchBar>
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
