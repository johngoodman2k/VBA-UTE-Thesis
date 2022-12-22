import React from 'react';
import styles from './playerLineUpBar.module.scss';
import classNames from 'classnames/bind';
import { Player } from '../../../Services/models';

const cx = classNames.bind(styles);
type PlayerLineUpBar = {
	side?: 'home' | 'away';
	player: Player;
	getPlayer: (player: Player) => void;
};

export const PlayerLineUpBar = (props: PlayerLineUpBar) => {
	const handleOnClick = () => {
		props.getPlayer(props.player);
	};
	const blockSideCheck = cx(
		'__block',
		props.side === 'home' ? 'flex-row-reverse' : ''
	);

	const nationalitySideCheck = cx(
		'__nationality',
		props.side === 'home' ? 'flex-row-reverse' : ''
	);

	const sideCheck = cx(
		'font-normal text-white',
		props.side === 'home' ? 'mr-2' : 'ml-2'
	);

	return (
	
			<li onClick={handleOnClick} className=''>
				<div className={blockSideCheck}>
					<div className={`${cx('__number')}`}>{props.player?.shirtnumber ?? ""}</div>
					{props.player && props.player.image && <img className='w-[4rem] my-0 mx-5' src={props.player.image as string} alt={props.player.firstname ?? "playername"}></img>}
					<div>
						<span className='flex font-normal text-white text-lg'>
							{props.player?.lastname ? props.player?.lastname +" ": "" }  {props.player?.firstname ?props.player?.firstname: ""}
						</span>
						<span className={nationalitySideCheck}>
							{props.player?.country && <img
								className='w-[30px] h-[20px] inline-block'
								src={""}></img>}
							{/* <span className={sideCheck}>{props.player.country ?? ""}</span> */}
						</span>
					</div>
				</div>
			</li>
	
	);
};
