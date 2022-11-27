import React from 'react';
import classNames from 'classnames/bind';
import styles from './adminPlayerCard.module.scss';
const cx = classNames.bind(styles);
type AdminPlayerCardProps = {
	visible: boolean;
};

export const AdminPlayerCard = () => {
	return (
		<div className='relative group  bg-black rounded-md text-white overflow-hidden'>
			<img src='https://i.ibb.co/dKPn924/hieu-thanh.png' className='w-full max-w-full h-auto block'></img>
			<p
				className={`${cx(
					'text-center uppercase tracking-wider text-[#2d2d2d] group-hover:text-white font-medium text-[4.25rem] leading-[4.25rem] font-[Teko] m-0 z-[5] absolute top-[5%] right-[5%]',
					'_number'
				)}`}>
				22
			</p>
			<a className={`${cx('_logo')}`}>
				<img src='https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg' alt='' />
			</a>
			<div className={`${cx('_playerInfo')}`}>
				<p className={`${cx('font-extrabold text-left !leading-5 text-2xl !ml-0 mb-1', '_name')}`}>
					Jimmy
					<span className='block mt-1'>Butler</span>
				</p>
				<p className='pb-4 ml-0 text-left uppercase font-bold text-xs '>Foward</p>
				<p className=' text-left uppercase font-normal text-sm !leading-4 text-xl !ml-0 my-2'>
					Height
					<span className='block font-extrabold my-2'>6'7</span>
				</p>
				<p className=' text-left uppercase font-normal text-sm !leading-4 text-xl !ml-0 my-2'>
					Height
					<span className='block font-extrabold my-2'>6'7</span>
				</p>{' '}
			</div>
		</div>
	);
};
