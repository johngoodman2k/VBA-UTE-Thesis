import React from 'react';
import classNames from 'classnames/bind';
import styles from './coachingStaff.module.scss';
const cx = classNames.bind(styles);

export const CoachingStaff = () => {
	return (
		<div className={`${cx('__container')}`}>
			<section className={`${cx('__block')}`}>
				<div className={`${cx('__contentBlock')}`}>
					<div className={`${cx('__titleBlock')}`}>
						<h1 className='uppercase font-normal leading-3 text-2xl'>
							Coaching Staff
						</h1>
						{/* <div className='flex justify-center items-center'>
							<a className='font-normal text-xs leading-5 text-teal-600 mr-2'>
								See full schedule
							</a>
						</div> */}
					</div>
					<div>
						<div className='flex '>
							<h3 className={`${cx('__heading')}`}>Head Coach</h3>
							<ul className={`${cx('__list')}`}>
								<li className=' hover:underline cursor-pointer hover:text-cyan-500'>
									Khang Lit
								</li>
							</ul>
						</div>
						<div className='flex '>
							<h3 className={`${cx('__heading')}`}>Head Coach</h3>
							<ul className={`${cx('__list')}`}>
								<li className=' hover:underline cursor-pointer hover:text-cyan-500'>
									Khang Lit
								</li>{' '}
								<li className=' hover:underline cursor-pointer hover:text-cyan-500'>
									Khang Lit
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
