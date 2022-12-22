import React, { useEffect, useState } from 'react';
import styles from './lineUp.module.scss';
import classNames from 'classnames/bind';
import { PlayerLineUpBar } from '../../Player/PlayerLineUpBar';
import { PlayerCard } from '../../Player/PlayerCard';
import { vbaContext } from '../../../Services/services';
import { Match, Player, Team } from '../../../Services/models';
import { useParams } from 'react-router-dom';
import { homedir } from 'os';
const cx = classNames.bind(styles);
const playerServices = vbaContext.getPlayerServices();
const matchServices = vbaContext.getMatchServices();

type LineUpProps = {
	home?: Team;
	away?: Team;
	homeLineUp?: Player[];
	awayLineUp?: Player[];
};
const defaultPlayer: Player = {} as any;
defaultPlayer.lastName = 'Click for more details';

export const LineUp = ({ home, away ,homeLineUp,awayLineUp}: LineUpProps) => {
	const [playerInfo, setPlayerInfo] = useState<Player>();

	const getPlayer = (player: Player) => {
		if (player) {
			setPlayerInfo(player);
		}
	};

	return (
		<div className='grid grid-cols-3 pt-4'>
			<div className='px-4'>
				<header className={`${cx('__header')}`}>
					{home?.teamlogo && <a>
						<div>
							<img className='w-[5rem] h-[5rem] m-auto' src={home.teamlogo as string} alt={home.teamname?? "TeamLogo"}></img>
						</div>
					</a>}
					<div>{home?.teamname?? ""}</div>
				</header>
				<div>
					<ul className='list-none'>
						{homeLineUp && homeLineUp.map((x: Player) => (
							<PlayerLineUpBar getPlayer={getPlayer} side='home' player={x}></PlayerLineUpBar>
						))}
					</ul>
				</div>
			</div>
			<div>
				<PlayerCard player={playerInfo}></PlayerCard>
			</div>
			<div className='px-4'>
				<header className={`${cx('__header')}`}>
				{away?.teamlogo && <a>
						<div>
							<img className='w-[5rem] h-[5rem] m-auto' src={away.teamlogo as string} alt={away.teamname?? "TeamLogo"}></img>
						</div>
					</a>}
					<div>{away?.teamname ?? ""}</div>
				</header>
				<div>
					<ul className='list-none'>
						{awayLineUp && awayLineUp.map((x: Player) => (
							<PlayerLineUpBar getPlayer={getPlayer} side='away' player={x}></PlayerLineUpBar>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
