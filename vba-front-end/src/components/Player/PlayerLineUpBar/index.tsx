import React from 'react';
import styles from './playerLineUpBar.module.scss';
import classNames from 'classnames/bind';
import { Player } from '../../../Services/models';

const cx = classNames.bind(styles);
type PlayerLineUpBar = {
	side?: 'home' | 'away';
	player: Player;
	onClick: () => void;
};

export const PlayerLineUpBar = (props: PlayerLineUpBar) => {
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
		<>
			<li onClick={props.onClick} className=''>
				<div className={blockSideCheck}>
					<div className={`${cx('__number')}`}>{props.player.shirtNumber}</div>
					<img className='w-[4rem] my-0 mx-5' src={props.player.image}></img>
					<div>
						<span className='flex font-normal text-white text-lg'>
							{props.player.lastName + ' ' + props.player.firstName}
						</span>
						<span className={nationalitySideCheck}>
							<img
								className='w-[30px] h-[20px] inline-block'
								src={props.player.flag}></img>
							<span className={sideCheck}>{props.player.nationality}</span>
						</span>
					</div>
				</div>
			</li>
		</>
	);
};
