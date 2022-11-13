import React from 'react';
import classNames from 'classnames/bind';
import styles from './upComingGamesBlock.module.scss';
const cx = classNames.bind(styles);
export const UpComingGamesBlock = () => {
	return (
		<div className={`${cx('__block', ' hover:cursor-pointer')}`}>
			<div className={`${cx('__contentBlock')}`}>
				<div className={`${cx('__title')}`}>
					<div className='text-xs uppercase tracking-wide'>SEP 30</div>
					<div className='text-xs uppercase tracking-wide'>6:00 AM ET</div>
				</div>
				<a>
					<div className='relative mt-0 mb-0'>
						<div className='flex justify-between items-center align-middle'>
							<div className='w-5'>
								<img
									className='min-w-full'
									src='https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
									alt=''
								/>
							</div>
							<div className={`${cx('__contentBlock__teamName')}`}>
								<p className='font-bold text-xs leading-5 uppercase'>BOS</p>
							</div>
							<div className='leading-5 text-xs font-normal text-slate-400'>
								0-0
							</div>
						</div>
					</div>
					<div className='relative mt-0 mb-0'>
						<div className='flex justify-between items-center align-middle'>
							<div className='w-5'>
								<img
									className='min-w-full'
									src='https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
									alt=''
								/>
							</div>
							<div className={`${cx('__contentBlock__teamName')}`}>
								<p className='font-bold text-xs leading-5 uppercase'>BOS</p>
							</div>
							<div className='leading-5 text-xs font-normal text-slate-400'>
								0-0
							</div>
						</div>
					</div>
				</a>

				<div className='flex justify-between align-center text-slate-400'>
					VTV3
				</div>
			</div>
		</div>
	);
};
