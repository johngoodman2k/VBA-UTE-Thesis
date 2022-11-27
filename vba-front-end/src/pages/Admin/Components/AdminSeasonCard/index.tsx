import React from 'react';

export const AdminSeasonCard = () => {
	return (
		<a className='relative block w-1/4 transition duration-300 ease-in-out delay-150 bg-black hover:text-white hover:-translate-y-1 hover:scale-105 hover:cursor-pointer'>
			<img
				src='https://vba.vn/assets/img/svg/vba-logo.svg'
				className='w-full h-full object-contain wp-post-image'
				alt=''
			/>
			<div className='absolute bottom-0 w-full p-4 bg-black'>
				<h4 className='text-xl font-sorabold'>2022-2023 SEASON</h4>
			</div>
		</a>
	);
};
