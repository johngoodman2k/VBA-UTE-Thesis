import React from 'react';
import classNames from 'classnames/bind';
import styles from './awayPlayers.module.scss';
import { PlayerCard } from '../PlayerCard';
import { TeamCard } from '../TeamCard';
const cx = classNames.bind(styles);
export const AwayPlayers = () => {
	return (
		<div
			className={`grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-2 p-2.5 bg-SGH rounded-md 	`}>
			<PlayerCard></PlayerCard>
			<PlayerCard></PlayerCard>
			<PlayerCard></PlayerCard>
			<PlayerCard></PlayerCard>
			<PlayerCard></PlayerCard>
			<TeamCard></TeamCard>
		</div>
	);
};
