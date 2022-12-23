import React from 'react';
import classNames from 'classnames/bind';
import styles from './nextGameBar.module.scss';
import { Match, Team } from '../../../../../Services/models';
import { dateFormat } from '../../../../../utils/dateFormat';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
type NextGameBar = {
	match?: Match
	id?: string;
}
export const NextGameBar = ({ match, id }: NextGameBar) => {
	return (
		<div className='grid grid-cols-12 mb-7 text-center border border-solid border-gray-500 rounded-md  '>
			{/* side */}
			<div
				className={`${cx('__side')} xl:col-span-1 md:col-span-2 sm:col-span-4`}>
				<p className='uppercase text-sm font-bold '>{match && match.home?.id === id ? 'Nhà' : 'Khách'}</p>
			</div>
			{/* shirt */}
			<div
				className={`${cx(
					'__content'
				)} xl:col-span-2 md:col-span-2 sm:col-span-4`}>
				<a href='' className='mx-auto my-0 w-full max-w-[12.5rem] relative'>
					<img
						src='https://sport5.mediacdn.vn/2019/11/26/photo-1574780315715-1574780315724959665461.jpeg'
						alt=''
						className='w-full mx-auto max-w-[6.25rem] block  h-auto'
					/>
					{/* <span className='block uppercase mt-5 pb-5 text-center text-xs font-bold'>
						Go shop now
					</span> */}
				</a>
			</div>

			{/* rivalry */}
			<div
				className={`${cx(
					'__content'
				)} xl:col-span-2 md:col-span-2 sm:col-span-4`}>
				<a href='' className='mx-auto my-0 w-full max-w-[12.5rem] relative'>
					<img
						src={match && match.home?.id !== id ? match?.home?.teamLogo as string : match?.away?.teamLogo as string}
						alt=''
						className='w-full mx-auto max-w-[6.25rem] block  h-auto'
					/>
				</a>
			</div>

			{/* detail information */}
			<div className={`${cx('__detailInfo')} xl:col-span-5 sm:col-span-5`}>
				<p className='uppercase font-extrabold leading-6 text-xl'>
					<span className='text-base text-gray-400 uppercase font-medium'>
						vs:{' '}
					</span>

					{match && match.home?.id !== id ? match?.home?.teamName : match?.away?.teamName}
				</p>

				<p className='uppercase font-extrabold leading-6 text-xl'>
					{dateFormat(match?.matchday)}
				</p>

				<p className='uppercase font-bold  text-sm'>
					<span className='text-base text-gray-400 uppercase font-medium'>
						SVĐ:{' '}
					</span>
					{match?.home?.stadiumname}
				</p>
			</div>

			{/* game recap */}
			<div className={`${cx('__content')} xl:col-span-2 sm:col-span-1`}>
				<Link to={`/fixtures/match/${match?.id}`}>
					<a className={`${cx('__button')} uppercase`}>Chi tiết</a>
				</Link>
			</div>
		</div>
	);
};
