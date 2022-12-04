import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ticketDetailPage.module.scss';
import { ReactComponent as HomeLogo } from '../../../assets/images/home-com.svg';
import { ReactComponent as PlaneLogo } from '../../../assets/images/plane-com.svg';
import { ReactComponent as DownArrowLogo } from '../../../assets/images/downarrow-com.svg';
import { NextGameBar } from '../TeamInfoPage/TeamInfoFixturesPage/NextGameBar';

const cx = classNames.bind(styles);
export const TicketDetailsPage = () => {
	const [clicked, setClicked] = useState(false);
	return (
		<div className={`${cx('__wrapper')}`}>
			<section>
				<div className={`${cx('_block')}`}>
					<div className={`${cx('__headerContainer')}`}>
						<div className='flex   justify-center items-center'>
							<a href='' className='mx-auto my-0 w-full max-w-[12.5rem] relative'>
								<img
									src='https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
									alt=''
									className='w-full mx-auto max-w-[6.25rem] block  h-auto'
								/>
							</a>
							<p className='text-white text-[1.8rem] font-bold mx-4'>vs</p>
							<a href='' className='mx-auto my-0 w-full max-w-[12.5rem] relative'>
								<img
									src='https://i.logocdn.com/nba/2015/milwaukee-bucks.svg'
									alt=''
									className='w-full mx-auto max-w-[6.25rem] block  h-auto'
								/>
							</a>
						</div>

						<div className={`${cx('_matchInfo')}`}>
							<h1 className='flex text-[1.4rem] leading-normal mb-[10px]'>
								Boston Celtics vs. Charlotte Hornets
								<button className={`${cx('_button')}`}>More info</button>
							</h1>
							<div className={`${cx('_event-date')}`}>
								<div>Mon • Nov 28 • 7:30 PM</div>
								<div>TD Garden, Boston, MA</div>
							</div>
						</div>

						<div className='block max-w-[124px] h-full w-full ml-auto'>
							<img src='https://vba.vn/assets/img/svg/vba-logo.svg' className='w-full h-full' alt='' />
						</div>
					</div>
				</div>
				<div className={`${cx('__container')}`}>
					{/* controller */}
					<div className='grid grid-cols-3'>
						<div className='col-span-2 relative px-[15px]'>
							<div className='mb-[30px] bg-[#e3e3e3] leading-tight'>
								<div className={`${cx('_ticketPrice')} flex justify-center py-[8px] px-[15px]`}>
									<div className='flex w-1/2'>
										{' '}
										<div className={`${cx('_square')}`}></div>
										<div className='px-4'>
											<p className='text-[#666] font-bold'>VVIp</p>
											<p className='text-[#666]'>2,500,000 VND</p>
										</div>
									</div>
									<div className='flex w-1/2'>
										{' '}
										<div className={`${cx('_square')}`}></div>
										<div className='px-4'>
											<p className='text-[#666] font-bold'>VVIp</p>
											<p className='text-[#666]'>2,500,000 VND</p>
										</div>
									</div>
								</div>

								<div className={`${cx('_ticketPrice')} flex justify-center py-[8px] px-[15px]`}>
									<div className='flex w-1/2'>
										{' '}
										<div className={`${cx('_square')}`}></div>
										<div className='px-4'>
											<p className='text-[#666] font-bold'>VVIp</p>
											<p className='text-[#666]'>2,500,000 VND</p>
										</div>
									</div>
									<div className='flex w-1/2'>
										{' '}
										<div className={`${cx('_square')}`}></div>
										<div className='px-4'>
											<p className='text-[#666] font-bold'>VVIp</p>
											<p className='text-[#666]'>2,500,000 VND</p>
										</div>
									</div>
								</div>
							</div>
							{/* seatmap */}
							<div></div>
						</div>

						<div className='px-[15px]'>
							<div className={`${cx('_personalBlock')}`}>
								<div className='w-full'>
									<div className='mb-2'>
										<div className='border-solid border-b-[3px] p-2 border-[#ccc]'>
											<h1 className='font-bold text-xl'>Thông tin người nhận vé</h1>
										</div>

										<div className='flex justify-between items-center my-2 py-2 border-dashed border-b-[1px] border-solid'>
											<div>
												<h1>Họ tên</h1>
											</div>
											<div>
												<p>nothingtosay </p>
											</div>
										</div>
										<div className='flex justify-between items-center my-2 py-2 border-dashed border-b-[1px] border-solid'>
											<div>
												<h1>Email</h1>
											</div>
											<div>
												<p> johngoodman2k@gmail.com </p>
											</div>
										</div>
										<div className='flex justify-between items-center my-2 py-2 '>
											<div>
												<h1>Điện thoại</h1>
											</div>
											<div>
												<p>0923644JQK</p>
											</div>
										</div>
									</div>

									<div className='mb-2'>
										<div className='border-solid border-b-[3px] p-2 border-[#ccc]'>
											<h1 className='font-bold text-xl'>HÌNH THỨC THANH TOÁN</h1>
										</div>

										<div className='flex justify-between items-center my-2 py-2 border-dashed border-b-[1px] border-solid'>
											<div>
												<h1>Vi dien tu</h1>
											</div>
										</div>
										<div className='flex justify-between items-center my-2 py-2 border-dashed border-b-[1px] border-solid'>
											<div>
												<h1>Email</h1>
											</div>
											<div>
												<p> johngoodman2k@gmail.com </p>
											</div>
										</div>
										<div className='flex justify-between items-center my-2 py-2 '>
											<div>
												<h1>Điện thoại</h1>
											</div>
											<div>
												<p>0923644JQK</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
