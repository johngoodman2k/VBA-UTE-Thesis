import React from 'react';
import styles from './playByplayTeam.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
export const PlayByPlayTeam = () => {
	return (
		<div className={`flex pt-4 pb-1 leading-nonex text-lg font-black `}>
			<div className='w-1/2 justify-center items-center flex leading-none bg-white text-black'>
				<div className='w-10 h-10 mr-1'>
					<div className='relative min-w-full'>
						<img
							className='relative min-w-full'
							src='https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
							alt=''
						/>
					</div>
				</div>
				Milwaukee Bucks
			</div>
			<div className='w-1/2 justify-center items-center flex leading-none bg-white text-black'>
				<div className='w-10 h-10 mr-1'>
					<div className='relative min-w-full'>
						<img
							className='relative min-w-full'
							src='https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
							alt=''
						/>
					</div>
				</div>
				Milwaukee Bucks
			</div>
		</div>
	);
};
