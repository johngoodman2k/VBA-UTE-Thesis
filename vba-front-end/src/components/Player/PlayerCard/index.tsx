import React from 'react';
import styles from './playerCard.module.scss';
import classNames from 'classnames/bind';
import { Player } from '../../../Services/models';
import { dateFormat } from '../../../utils/dateFormat';
const cx = classNames.bind(styles);

type PlayerCard = {
	player?: Player;
};

export const PlayerCard = ({ player }: PlayerCard) => {
	return (
		<div className={`${cx('__container')}`}>
			{player ? (
				<div className={cx('__background')}>
					<div className={cx('__backcard')}>
						<div className={cx('__dataTop')}>
							<div className={cx('__playerImage')}>
								<div className={cx('__playerImageBlock')}>
									<span className={cx('__ImageBox')}>
										<img
											className={cx('__ImageBox--adjust')}
											src={player.image as string}
											alt=''
										/>
									</span>
								</div>
							</div>

							<div className={cx('__playerInfo')}>
								<div className={cx('__playerNumAndPos')}>
									<div className={cx('__playerNum')}>#{player.shirtnumber}</div>
									<div>{player.position}</div>
								</div>
								<div className={cx('__playerName')}>
									<span>{player.lastname + ' ' + player.firstname}</span>
								</div>
							</div>
						</div>
						<div className={cx('__dataMiddle')}>
							<table
								className={`${cx(
									'__dataTable'
								)} light-secondary-border w-full `}>
								<thead>
									<tr>
										<th className={`${cx('__staticTableHeader')}`}>Details</th>
										<th className={`${cx('__staticTableHeader')}`}>Details</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className={`${cx('__statsItem')}`}>
												<span className={`${cx('__statsItem--labelHeader')}`}>
													Country
												</span>
												<span className={`${cx('__statsItem--labelInfo')}`}>
													{player.country}
												</span>
											</div>
										</td>
										<td>
											<div className={`${cx('__statsItem')}`}>
												<span className={`${cx('__statsItem--labelHeader')}`}>
													EXP
												</span>
												<span className={`${cx('__statsItem--labelInfo')}`}>
													{player.experience}
												</span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className={`${cx('__statsItem')}`}>
												<span className={`${cx('__statsItem--labelHeader')}`}>
													POS
												</span>
												<span className={`${cx('__statsItem--labelInfo')}`}>
													{player.position}
												</span>
											</div>
										</td>
										<td>
											<div className={`${cx('__statsItem')}`}>
												<span className={`${cx('__statsItem--labelHeader')}`}>
													Games
												</span>
												<span className={`${cx('__statsItem--labelInfo')}`}>
													-
												</span>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
							<div>
								<div className={`${cx('__dataBottom')}`}>
									<div className={`${cx('__dataBottom--label')}`}>height</div>
									<div className={`${cx('__dataBottom--info')}`}>{player.height}</div>
								</div>
								<div className={`${cx('__dataBottom')}`}>
									<div className={`${cx('__dataBottom--label')}`}>Weight</div>
									<div className={`${cx('__dataBottom--info')}`}>{player.weight}</div>
								</div>
								<div className={`${cx('__dataBottom')}`}>
									<div className={`${cx('__dataBottom--label')}`}>BirthDay</div>
									<div className={`${cx('__dataBottom--info')}`}>{dateFormat(player.dateofbirth)}</div>
								</div>
								<div className={`${cx('__dataBottom')}`}>
									<div className={`${cx('__dataBottom--label')}`}>country</div>
									<div className={`${cx('__dataBottom--info')}`}>{player.country}</div>
								</div>
								{/* <div className={`${cx('__dataBottom')}`}>
									<div className={`${cx('__dataBottom--label')}`}>height</div>
									<div className={`${cx('__dataBottom--info')}`}>{player.}</div>
								</div>
								<div className={`${cx('__dataBottom')}`}>
									<div className={`${cx('__dataBottom--label')}`}>height</div>
									<div className={`${cx('__dataBottom--info')}`}>6-10</div>
								</div>
								<div className={`${cx('__dataBottom')}`}>
									<div className={`${cx('__dataBottom--label')}`}>height</div>
									<div className={`${cx('__dataBottom--info')}`}>6-10</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className={cx('__background')}>
					<div className={cx('__backcard')}>
						<div className={cx('__dataTop')}>
							<div className='font-bold text-2xl'>Click for more details</div>
						</div>
						<div className={cx('__dataMiddle')}></div>
					</div>
				</div>
			)}
		</div>
	);
};
