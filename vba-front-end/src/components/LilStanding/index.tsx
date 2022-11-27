import React from 'react';
import classNames from 'classnames/bind';
import styles from './lilStanding.module.scss';

const cx = classNames.bind(styles);
const test = [{ won: 9, lost: 15 }];

export const LilStanding = () => {
	const checkLastTen = (x: number, y: number) => {
		const minus = x - y;
		console.log('25', minus);

		if (minus >= 5) {
			return 'bg-[#64bc61]';
		} else if (minus < 5 && minus > 2) {
			return 'bg-[#a4d86e]';
		} else if (minus >= 1) {
			return 'bg-[#d7ee8e]';
		} else if (minus == 0) {
			return 'bg-[#f9f7ae]';
		} else if (minus <= -1 && minus > -2) {
			return 'bg-[#fedd8d]';
		} else if (minus <= -2 && minus >= -5) {
			return 'bg-[#fcac63]';
		} else if (minus < -5) return 'bg-[#f16e43]';
	};

	return (
		<>
			<div className={`${cx('container')}`}>
				<div className='md:mb-3 md:rounded '>
					<div className='p-2'>
						<div className='flex justify-between border-b border-solid border-slate-300 my-4 py-6'>
							<h1 className={`${cx('_header')}`}>2022-2023 standings</h1>
							<a className='text-sm'>Go to Standings</a>
						</div>
						<div>
							<table className={`${cx('_table')}`}>
								<thead className='text-left'>
									<tr>
										<th className=' text-left min-w-[160px] w-[160px]'>Team</th>
										<th>W</th>
										<th>L</th>
										<th className='text-right'>Last 10</th>
									</tr>
								</thead>
								<tbody className={`${cx('_tableBody')}`}>
									<tr className='text-left'>
										<td className='p-2'>
											<a href='' className={`${cx('_teamBar')}`}>
												<span className={`${cx('_teamRank')}`}>1</span>
												<div className={`${cx('_teamLogoBlock')}`}>
													<div className='min-w-full  relative'>
														<img
															src='https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
															className='block min-w-full'></img>
													</div>
												</div>
												<span>BOS</span>
											</a>
										</td>
										<td>13</td>
										<td>3</td>
										<td>
											{test.map((x: any) => {
												return (
													<div className={`${cx('_lastTen', checkLastTen(x.won, x.lost), 'ml-auto')}`}>
														{x.won} - {x.lost}
													</div>
												);
											})}
										</td>
									</tr>
									<tr className='text-left'>
										<td className='p-2'>
											<a href='' className={`${cx('_teamBar')}`}>
												<span className={`${cx('_teamRank')}`}>1</span>
												<div className={`${cx('_teamLogoBlock')}`}>
													<div className='min-w-full  relative'>
														<img
															src='https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
															className='block min-w-full'></img>
													</div>
												</div>
												<span>BOS</span>
											</a>
										</td>
										<td>13</td>
										<td>3</td>
										<td>
											{test.map((x: any) => {
												return (
													<div className={`${cx('_lastTen', checkLastTen(x.won, x.lost), 'ml-auto')}`}>
														{x.won} - {x.lost}
													</div>
												);
											})}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
