import React from 'react';
import classNames from 'classnames/bind';
import styles from './lilStanding.module.scss';

const cx = classNames.bind(styles);

export const LilStanding = () => {
	return (
		<>
			<div className={`${cx('container')}`}>
				<div className='md:mb-3 md:rounded'>
					<div className='p-2'>
						<div className='flex justify-between'>
							<h1 className={`${cx('_header')}`}>2022-2023 standings</h1>
							<a>Go to Standings</a>
						</div>
						<div></div>
					</div>
				</div>
				{/* <div className={`${cx('standings-box')}`}>
					<table className='w-full text-center bg-white'>
						<thead>
							<tr>
								<th scope='col' className={`${cx('standings-text-centre')}`}>
									<div>Position</div>
								</th>
								<th scope='col' className={`${cx('standings-text-team')}`}>
									Team
								</th>
								<th>
									<div>Played</div>
								</th>
								<th>
									<div>Won</div>
								</th>
								<th>
									<div>Drawn</div>
								</th>
								<th>
									<div>Lost</div>
								</th>
								<th>
									<div>GF</div>
								</th>
								<th>
									<div>GA</div>
								</th>
								<th>
									<div>GD</div>
								</th>
								<th>
									<div>Points</div>
								</th>
								<th>
									<div>Form</div>
								</th>
							</tr>
						</thead>
						<tbody className={`${cx('standings-box-body')}`}>
							<tr>
								<td className={`${cx('standings-button__tooltip')}`}>
									<span className={`${cx('standings-position__value text-adjust')}`}>1</span>
								</td>
								<td scope='row' className=''>
									<a>
										<span>
											<img
												src='https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg'
												className={`${cx('standings-team__pic', 'inline-block')}`}></img>
										</span>
										<span className={`${cx('standings-team__name')}`}>Miami Heat</span>
									</a>
								</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>
								<td className={cx('text-adjust')}>10</td>

								<td className={`${cx('standings-form')}`}>
									<ul>
										<li className={`${cx('standings-form__won')}`}>W</li>
									</ul>
								</td>
							</tr>
							<tr>
								<td className={`${cx('standings-button_tooltip')}`}>
									<span className={`${cx('standings-position__value')}`}>2</span>
									
								</td>
							</tr>
						</tbody>
					</table>
				</div> */}
			</div>
		</>
	);
};
