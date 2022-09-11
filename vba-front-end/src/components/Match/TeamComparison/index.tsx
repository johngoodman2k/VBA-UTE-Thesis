import React from 'react';
import styles from './teamComparison.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const text = [
	{ home: '120', field: 'PTS', away: '87' },
	{ home: '37', field: 'RB', away: '37' },
	{ home: '23', field: 'AST', away: '27' },
	{ home: '6', field: 'STL', away: '6' },
	{ home: '5', field: 'BLK', away: '5' },
	{ home: '11', field: 'TO', away: '11' },
	{ home: '51.3', field: 'FG%', away: '46.5' },
	{ home: '47.4', field: '3P%', away: '19.4' },
	{ home: '84', field: 'FT%', away: '65' }
];
export const TeamComparison = () => {
	const BetterNow = (home: string, away: string) => {
		if (parseInt(home) > parseInt(away)) {
			return 'home';
		} else if (parseInt(home) === parseInt(away)) {
			return '';
		} else {
			return 'away';
		}
	};
	return (
		<>
			<section className={cx('__container', '__active')}>
				<div className={cx('__tab')}>
					<div className={cx('__statsSection', '__active', '__wrapper')}>
						<h3 className={cx('__header')}>Team Comparison</h3>
						<table className={cx('__statsTable')}>
							<thead>
								<tr className={cx('__statsTeamBlock')}>
									<th>
										<a className={cx('__statsTeamText')}>
											<div className={cx('__statsTeamBadge__block', '__home')}>
												<img
													src='https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
													className={cx(
														'__statsTeamBadge__block--adjust'
													)}></img>
											</div>
											Chicago Bulls
										</a>
									</th>
									<th>&nbsp;</th>
									<th>
										<a className={cx('__statsTeamText')}>
											<div className={cx('__statsTeamBadge__block', '__away')}>
												<img
													src='https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg'
													className={cx(
														'__statsTeamBadge__block--adjust'
													)}></img>
											</div>
											Minesota TimberWolves
										</a>
									</th>
								</tr>
							</thead>
							<tbody>
								{text.map((x: any) => {
									return (
										<tr className={cx('__statsTeamContent')}>
											<td>
												<div className='grid grid-cols-5 items-center  '>
													{x.field !== 'PTS' ? (
														<>
															<span
																style={{ width: `${x.home}%` }}
																className={` h-[40px] bg-lime-500 inline-block col-span-4 ml-auto`}></span>
															<p
																className={
																	BetterNow(x.home, x.away) === 'home'
																		? `${cx('betterNow')} mr-2 `
																		: 'mr-2'
																}>
																<span className='text-[18px] font-bold leading-[20px]'>
																	{x.home}
																</span>
															</p>
														</>
													) : (
														<>
															<p
																className={
																	BetterNow(x.home, x.away) === 'home'
																		? `${cx('betterNow')} col-span-5 `
																		: ''
																}>
																<span className='text-[18px] font-bold leading-[20px]'>
																	{x.home}
																</span>
															</p>
														</>
													)}
												</div>
											</td>
											<td>
												<p className='text-[18px] font-normal leading-[20px]'>
													{x.field}
												</p>
											</td>
											<td className=''>
												<div className='grid grid-cols-5 items-center  '>
													{x.field !== 'PTS' ? (
														<>
															<p
																className={
																	BetterNow(x.home, x.away) === 'away'
																		? `${cx('betterNow')}  `
																		: ''
																}>
																<span className='text-[18px] font-bold leading-[20px]'>
																	{x.away}
																</span>
															</p>
															<span
																style={{ width: `${x.away}%` }}
																className={` h-[40px] bg-lime-500 inline-block col-span-4 mr-auto`}></span>
														</>
													) : (
														<>
															<p
																className={
																	BetterNow(x.home, x.away) === 'away'
																		? `${cx('betterNow')}  col-span-5 `
																		: ''
																}>
																<span className='text-[18px] font-bold leading-[20px]'>
																	{x.away}
																</span>
															</p>
														</>
													)}
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</>
	);
};
