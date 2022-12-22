import React from 'react';
import styles from './playByplayTeam.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
type PlayByPlayTeamProps = {
	homeImage?: string;
	homeName?: string;
	awayImage?: string;
	awayName?: string;
}


export const PlayByPlayTeam = ({homeImage,homeName,awayImage,awayName}:PlayByPlayTeamProps) => {
	return (
		<div className={`flex pt-4 pb-1 leading-nonex text-lg font-black `}>
			<div className='w-1/2 justify-center items-center flex leading-none bg-white text-black'>
				<div className='w-10 h-10 mr-1'>
					<div className='relative min-w-full'>
						{homeImage && <img
							className='relative min-w-full'
							src={homeImage}
							alt={homeName??"TeamLogo"}
						/>}
					</div>
				</div>
				{homeName?? ""}
			</div>
			<div className='w-1/2 justify-center items-center flex leading-none bg-white text-black'>
				<div className='w-10 h-10 mr-1'>
					<div className='relative min-w-full'>
						{awayImage && <img
							className='relative min-w-full'
							src={awayImage}
							alt={awayName ?? "TeamLogo"}
						/>}
					</div>
				</div>
				{awayName ?? ""}
			</div>
		</div>
	);
};
