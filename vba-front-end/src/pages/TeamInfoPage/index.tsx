import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamInfo.module.scss';
import { TeamInfoHeader } from './TeamInfoHeader';
import { TeamUpCommingGames } from './TeamUpComingGames';
import { TeamRoster } from './TeamRoster';
import { TeamProfile } from './TeamProfile';
const cx = classNames.bind(styles);

export const TeamInfoPage = () => {
	return (
		<div className={`${cx('__wrapper')}`}>
			<section>
				<TeamInfoHeader></TeamInfoHeader>
			</section>
			<div className={`${cx('__displayAd')}`}></div>
			<div className={`${cx('__container')}`}>
				<div className={`${cx('__background')}`}>
					<div className={`${cx('__background__block')}`}>
						<img
							src='https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
							className={`${cx('__background__block--adjust')}`}
							alt=''
						/>
					</div>
				</div>
				<TeamUpCommingGames></TeamUpCommingGames>
				<TeamRoster></TeamRoster>
				<TeamProfile></TeamProfile>
			</div>
		</div>
	);
};
