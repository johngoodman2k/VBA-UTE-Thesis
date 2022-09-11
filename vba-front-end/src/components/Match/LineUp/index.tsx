import React from 'react';
import styles from './lineUp.module.scss';
import classNames from 'classnames/bind';
import { PlayerLineUpBar } from '../../Player/PlayerLineUpBar';
import { PlayerCard } from '../../Player/PlayerCard';
const cx = classNames.bind(styles);
export const LineUp = () => {
	return (
		<div className='grid grid-cols-3 pt-4'>
			<div className='px-4'>
				<header className={`${cx('__header')}`}>
					<a>
						<div>
							<img
								className='w-[5rem] h-[5rem] m-auto'
								src='http://api-news.vba.vn/storage/images/hanoi-buffaloes-logo.png'></img>
						</div>
					</a>
					<div>Hanoi Buffaloes</div>
				</header>
				<div>
					<PlayerLineUpBar side='home'></PlayerLineUpBar>
				</div>
			</div>
			<div>
				<PlayerCard></PlayerCard>
			</div>
			<div className='px-4'>
				<header className={`${cx('__header')}`}>
					<a>
						<div>
							<img
								className='w-[5rem] h-[5rem] m-auto'
								src='http://api-news.vba.vn/storage/images/hanoi-buffaloes-logo.png'></img>
						</div>
					</a>
					<div>Hanoi Buffaloes</div>
				</header>
				<div>
					<PlayerLineUpBar side='away'></PlayerLineUpBar>
				</div>
			</div>
		</div>
	);
};
