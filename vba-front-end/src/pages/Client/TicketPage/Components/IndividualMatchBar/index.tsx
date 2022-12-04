import React from 'react';
import classNames from 'classnames/bind';
import styles from './individualMatchBar.module.scss';

const cx = classNames.bind(styles);
export const IndividualMatchBar = () => {
	return (
		<div className='grid grid-cols-7 mb-7 text-center border border-solid border-gray-500 rounded-md  '>
			{/* side */}
			<div className={`${cx('__side')} xl:col-span-1 md:col-span-1 sm:col-span-1`}>
				<p className='uppercase font-extrabold leading-6 text-xl'>
					<p className='text-[#5a5a5a] uppercase text-[1.1rem] font-normal leading-none m-0'>MONDAY</p>
				</p>

				<p className='uppercase font-bold leading-none text-[2rem] '>DEC 28</p>

				<p className='uppercase font-bold  text-sm'>
					<span className='text-[1.1rem] text-[#5a5a5a] uppercase leading-none font-medium'>7:30 PM ET </span>
				</p>
			</div>
			{/* shirt */}
			{/* <div className={`${cx('__content')} xl:col-span-1 md:col-span-1 sm:col-span-1`}>
				<a href='' className='mx-auto my-0 w-full max-w-[12.5rem] relative'>
					<img
						src='https://sport5.mediacdn.vn/2019/11/26/photo-1574780315715-1574780315724959665461.jpeg'
						alt=''
						className='w-full mx-auto max-w-[6.25rem] block  h-auto'
					/>
					<span className='block uppercase mt-5 pb-5 text-center text-xs font-bold'>Go shop now</span>
				</a>
			</div> */}

			{/* rivalry */}
			<div className={`${cx('__content')} xl:col-span-2 md:col-span-2 sm:col-span-2 grid-cols-3`}>
				<a href='' className='mx-auto my-0 w-full max-w-[12.5rem] relative'>
					<img
						src='https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
						alt=''
						className='w-full mx-auto max-w-[6.25rem] block  h-auto'
					/>
				</a>
				<p className='text-[#8d8d8d] text-[1.8rem] font-bold'>vs</p>
				<a href='' className='mx-auto my-0 w-full max-w-[12.5rem] relative'>
					<img
						src='https://i.logocdn.com/nba/2015/milwaukee-bucks.svg'
						alt=''
						className='w-full mx-auto max-w-[6.25rem] block  h-auto'
					/>
				</a>
			</div>

			{/* detail information */}
			<div className={`${cx('__detailInfo')} xl:col-span-3 sm:col-span-3`}>
				<p className='uppercase font-extrabold leading-6 text-xl'>
					chicago bulls
					<span className='text-base text-gray-400 uppercase font-medium'> vs </span>
					milwaukee bucks
				</p>

				<p className='uppercase font-extrabold leading-6 text-xl'>WEDNESDAY, OCTOBER 12</p>

				<p className='uppercase font-bold  text-sm'>
					<span className='text-base text-gray-400 uppercase font-medium'>stadium: </span>
					TAN BINH AREA
				</p>
			</div>

			{/* game recap */}
			<div className={`${cx('__content')} xl:col-span-1 sm:col-span-1`}>
				<a className={`${cx('__button')} uppercase`}>Game Recap</a>
			</div>
		</div>
	);
};
