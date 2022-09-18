import React from 'react';
import styles from './playerCard.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const PlayerCard = () => {
	return (
		<div className={`${cx('__container')}`}>
			<div className={cx('__background')}>
				<div className={cx('__backcard')}>
					<div className={cx('__dataTop')}>
						<div className={cx('__playerImage')}>
							<div className={cx('__playerImageBlock')}>
								<span className={cx('__ImageBox')}>
									<img
										className={cx('__ImageBox--adjust')}
										src='https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png?imwidth=1040&imheight=760'
										alt=''
									/>
								</span>
							</div>
						</div>
						<div className={cx('__playerInfo')}>
							<div className={cx('__playerNumAndPos')}>
								<div className={cx('__playerNum')}># 7</div>
								<div>Foward</div>
							</div>
							<div className={cx('__playerName')}>
								<span>Kevin Durant</span>
							</div>
						</div>
					</div>
					<div className={cx('__dataMiddle')}>
						<table
							className={`${cx('__dataTable')} light-secondary-border w-full `}>
							<thead>
								<tr>
									<th className={`${cx('__staticTableHeader')}`}>Season</th>
									<th className={`${cx('__staticTableHeader')}`}>Carrer</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div className={`${cx('__statsItem')}`}>
											<span className={`${cx('__statsItem--labelHeader')}`}>
												Games
											</span>
											<span className={`${cx('__statsItem--labelInfo')}`}>
												55
											</span>
										</div>
									</td>
									<td>
										<div className={`${cx('__statsItem')}`}>
											<span className={`${cx('__statsItem--labelHeader')}`}>
												Games
											</span>
											<span className={`${cx('__statsItem--labelInfo')}`}>
												55
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={`${cx('__statsItem')}`}>
											<span className={`${cx('__statsItem--labelHeader')}`}>
												Games
											</span>
											<span className={`${cx('__statsItem--labelInfo')}`}>
												55
											</span>
										</div>
									</td>
									<td>
										<div className={`${cx('__statsItem')}`}>
											<span className={`${cx('__statsItem--labelHeader')}`}>
												Games
											</span>
											<span className={`${cx('__statsItem--labelInfo')}`}>
												55
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<div>
							<div className={`${cx('__dataBottom')}`}>
								<div className={`${cx('__dataBottom--label')}`}>height</div>
								<div className={`${cx('__dataBottom--info')}`}>6-10</div>
							</div>
							<div className={`${cx('__dataBottom')}`}>
								<div className={`${cx('__dataBottom--label')}`}>height</div>
								<div className={`${cx('__dataBottom--info')}`}>6-10</div>
							</div>
							<div className={`${cx('__dataBottom')}`}>
								<div className={`${cx('__dataBottom--label')}`}>height</div>
								<div className={`${cx('__dataBottom--info')}`}>6-10</div>
							</div>
							<div className={`${cx('__dataBottom')}`}>
								<div className={`${cx('__dataBottom--label')}`}>height</div>
								<div className={`${cx('__dataBottom--info')}`}>6-10</div>
							</div>
							<div className={`${cx('__dataBottom')}`}>
								<div className={`${cx('__dataBottom--label')}`}>height</div>
								<div className={`${cx('__dataBottom--info')}`}>6-10</div>
							</div>
							<div className={`${cx('__dataBottom')}`}>
								<div className={`${cx('__dataBottom--label')}`}>height</div>
								<div className={`${cx('__dataBottom--info')}`}>6-10</div>
							</div>
							<div className={`${cx('__dataBottom')}`}>
								<div className={`${cx('__dataBottom--label')}`}>height</div>
								<div className={`${cx('__dataBottom--info')}`}>6-10</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
