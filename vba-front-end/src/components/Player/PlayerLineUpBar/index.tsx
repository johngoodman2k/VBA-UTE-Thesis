import React from 'react';
import styles from './playerLineUpBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const player = [
	{
		name: 'Kevin Durant',
		number: '7',
		nationality: 'USA',
		position: 'foward',
		flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
		img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p51940.png'
	},
	{
		name: 'Minh Khang',
		number: '7',
		nationality: 'USA',
		position: 'foward',
		flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
		img: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p51940.png'
	},
	{
		name: 'Kyrie Irving',
		number: '11',
		nationality: 'USA',
		position: 'guard',
		flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
	}
];

type PlayerLineUpBar = {
	side?: 'home' | 'away';
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
			{player.map((y: any) => {
				return (
					<ul className='list-none'>
						<li className=''>
							<a className={blockSideCheck} href=''>
								<div className={`${cx('__number')}`}>{y.number}</div>
								<img className='w-[4rem] my-0 mx-5' src={y.img}></img>
								<div>
									<span className='flex font-normal text-white text-lg'>
										{y.name}
									</span>
									<span className={nationalitySideCheck}>
										<img
											className='w-[30px] h-[20px] inline-block'
											src={y.flag}></img>
										<span className={sideCheck}>{y.nationality}</span>
									</span>
								</div>
							</a>
						</li>
					</ul>
				);
			})}
		</>
	);
};
