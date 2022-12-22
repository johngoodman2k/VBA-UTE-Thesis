import React from 'react';
import classNames from 'classnames/bind';
import styles from './gameLeaders.module.scss';
import { HomePlayers } from './HomePlayers';
import { AwayPlayers } from './AwayPlayers';
import { Team } from '../../../../Services/models';
const cx = classNames.bind(styles);
type GameLeadersProps = {
	home?: Team;
	away?:Team;
}

export const GameLeaders = ({home,away}:GameLeadersProps) => {
	return (
		<div className='block'>
			<h1 className='bg-black text-center uppercase font-bold p-5 text-white text-4xl'>
				Game Leader
			</h1>
			<div className={`${cx('__wrapper')} `}>
				{home && <HomePlayers home={home}></HomePlayers>}
				{away &&<AwayPlayers away={away}></AwayPlayers>}
			</div>
		</div>
	);
};
