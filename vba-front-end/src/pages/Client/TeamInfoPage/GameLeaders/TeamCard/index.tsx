import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamCard.module.scss';
const cx = classNames.bind(styles);
export const TeamCard = () => {
	return (
		<div
			className={`text-center uppercase font-bold text-xs p-2.5 rounded-md grid justify-items-center items-center ${cx(
				'__background'
			)}`}>
			<img
				src='https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
				alt=''
				className={`${cx('__logoTeam')}`}
			/>
			{/* <p
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
			</p> */}
		</div>
	);
};
