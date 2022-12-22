import React from 'react';
import classNames from 'classnames/bind';
import styles from './awayPlayers.module.scss';
import { PlayerCard } from '../PlayerCard';
import { TeamCard } from '../TeamCard';
import { Player, Team } from '../../../../../Services/models';
const cx = classNames.bind(styles);
type AwayPlayersProps = {
	away?:Team;
}
export const AwayPlayers = ({away}:AwayPlayersProps) => {
	const initAwayPlayers = away && away.players && away.players.length!==0 ? away.players.slice(0,5): undefined;
	return (
		<div
			className={`grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-2 p-2.5 bg-SGH rounded-md`}>
			{initAwayPlayers && initAwayPlayers.map((player:Player) =>
				<PlayerCard image={player.image as string} firstname={player.firstname} lastname={player.lastname} shirtnumber={player.shirtnumber}></PlayerCard>
			)}
			<TeamCard image={away?.teamlogo as string} name={away?.teamname}></TeamCard> 
		</div>
	);
};
