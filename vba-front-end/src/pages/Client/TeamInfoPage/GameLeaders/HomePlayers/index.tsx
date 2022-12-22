import React from 'react';
import classNames from 'classnames/bind';
import styles from './homePlayers.module.scss';
import { PlayerCard } from '../PlayerCard';
import { TeamCard } from '../TeamCard';
import { Player, Team } from '../../../../../Services/models';
const cx = classNames.bind(styles);
type HomePlayersProps = {
	home?:Team;
}

export const HomePlayers = ({home}:HomePlayersProps) => {
	const initHomePlayers = home && home.players && home.players.length !==0? home.players.slice(0,5): undefined;

	return (
		<div className={`grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-2 p-2.5 bg-HNB rounded-md 	`}>
			<TeamCard image={home?.teamlogo as string} name={home?.teamname}></TeamCard> 
			{initHomePlayers && initHomePlayers.map((player:Player) =>
				<PlayerCard image={player.image as string} firstname={player.firstname} lastname={player.lastname} shirtnumber={player.shirtnumber}></PlayerCard>
			)}
			
			
		</div>
	);
};
