import React from 'react';
import classNames from 'classnames/bind';
import styles from './gameLeaders.module.scss';
import { HomePlayers } from './HomePlayers';
import { AwayPlayers } from './AwayPlayers';
const cx = classNames.bind(styles);
export const GameLeaders = () => {
	return (
		<div className='block'>
			<h1 className='bg-black text-center uppercase font-bold p-5 text-white text-4xl'>
				Game Leader
			</h1>
			<div className={`${cx('__wrapper')} `}>
				<HomePlayers></HomePlayers>
				<AwayPlayers></AwayPlayers>
			</div>
		</div>
	);
};
