import React from 'react';
import classNames from 'classnames/bind';
import styles from './playerCard.module.scss';
const cx = classNames.bind(styles);
export const PlayerCard = () => {
	return (
		<div
			className={`text-center uppercase font-bold text-xs p-2.5 rounded-md ${cx(
				'__background'
			)}`}>
			<img
				src='https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629627.png'
				alt=''
			/>
			<p
				className={`text-center py-2.5 my-1.5 rounded-md text-white ${cx(
					'__textBackground'
				)}`}>
				Zion
				<br></br>
				Williamson
			</p>
			<p
				className={`text-center py-2.5 my-1.5 rounded-md text-white ${cx(
					'__textBackground'
				)}`}>
				Zion 17
			</p>
		</div>
	);
};
