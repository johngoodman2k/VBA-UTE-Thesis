import React from 'react';
import classNames from 'classnames/bind';
import styles from './upComingGamesBlock.module.scss';
import { Match } from '../../../../Services/models';
import { dateFormat, shortDateFormat, timeFormat } from '../../../../utils/dateFormat';
const cx = classNames.bind(styles);
type UpCommingGamesProps = {
	fixtures?: Match
}
export const UpComingGamesBlock = ({ fixtures }: UpCommingGamesProps) => {
	return (
		<div className={`${cx('__block', ' hover:cursor-pointer')}`}>
			<div className={`${cx('__contentBlock')}`}>
				<div className={`${cx('__title')}`}>
					<div className='text-xs uppercase tracking-wide'>{shortDateFormat(fixtures?.matchday)}</div>
					<div className='text-xs uppercase tracking-wide'>{timeFormat(fixtures?.matchday)}</div>
				</div>
				<a>
					<div className='relative mt-0 mb-0'>
						<div className='flex justify-between items-center align-middle'>
							<div className='w-5'>
								{fixtures?.home && fixtures.home.teamLogo &&
									<img
										className='min-w-full'
										src={fixtures?.home?.teamLogo as string}
										alt=''
									/>
								}
							</div>
							<div className={`${cx('__contentBlock__teamName')}`}>
								<p className='font-bold text-xs leading-5 uppercase'>{fixtures?.home?.shortName}</p>
							</div>
							<div className='leading-5 text-xs font-normal text-slate-400'>
								0-0
							</div>
						</div>
					</div>
					<div className='relative mt-0 mb-0'>
						<div className='flex justify-between items-center align-middle'>
							<div className='w-5'>
								{fixtures?.away && fixtures.away.teamLogo &&
									<img
										className='min-w-full'
										src={fixtures.away.teamLogo as string}
										alt=''
									/>
								}
							</div>
							<div className={`${cx('__contentBlock__teamName')}`}>
								<p className='font-bold text-xs leading-5 uppercase'>{fixtures?.away?.shortName}</p>
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
