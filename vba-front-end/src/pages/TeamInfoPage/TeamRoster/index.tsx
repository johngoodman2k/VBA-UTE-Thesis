import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamRoster.module.scss';
const cx = classNames.bind(styles);
export const TeamRoster = () => {
	return (
		<div className={`${cx('__container')}`}>
			<div className={`${cx('__innerBlock')}`}>
				<div className={`${cx('__innerBlock__section')}`}>
					<section className={`${cx('__sectionFull')}`}>
						<div className={`${cx('__innerBlock__content')}`}>
							<div className={`${cx('__titleBlock')}`}>
								<h1 className='uppercase font-normal leading-3 text-2xl'>
									Roster
								</h1>
								<div className='flex justify-center items-center'>
									<a className='font-normal text-xs leading-5 text-teal-600 mr-2'>
										See full schedule
									</a>
								</div>
							</div>
							{/* content */}
							<div className={`${cx('__content')}`}>
								<div className={`${cx('__statsTable')}`}>
									<div>
										<table>
											<thead>
												<tr>
													<th className={`${cx('__statsTable__primary')}`}>
														Player
													</th>
													<th className='!pl-8'>Number</th>
													<th>POS</th>
													<th>HEIGHT</th>
													<th>WEIGHT</th>
													<th>BIRTHDATE</th>
													<th>AGE</th>
													<th>EXPERIENCE</th>
												</tr>
											</thead>
											<tbody>
												<tr
													className={`${cx(
														'hover:bg-slate-200 cursor-pointer'
													)}`}>
													<td className={`${cx('__statsTable__primary')}`}>
														<a>Khang Lit</a>
													</td>
													<td className='!pl-8'>10</td>
													<td>C</td>
													<td>1-2</td>
													<td>20kg</td>
													<td>1-2-2022</td>
													<td>1</td>
													<td>R</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};
