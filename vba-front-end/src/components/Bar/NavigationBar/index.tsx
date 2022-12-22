import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './navigationBar.module.scss';
import { Link } from 'react-router-dom';
import { Tournament } from '../../../Services/models';
const cx = classNames.bind(styles);
// type NavigationBarProps = {
//   children: any;
// };
type NavigationBarProps = {
	ref?: (e: any) => void;

	tournament?: Tournament;
};
export const NavigationBar = ({ ref, tournament }: NavigationBarProps) => {
	const [clickedId, setClickedId] = useState('');

	return (
		<>
			<header
				ref={ref}
				className={`m-0 p-0 z-[110] relative w-full inline-block box-border align-middle ${cx('__wrapper')}`}>
				<div className={cx('__block')}>
					<div className='relavitve w-full h-full p-0 pl-[5%] pr-[5%] text-third-color'>
						<div className={`w-[743px]  relative float-left text-right h-full ${cx('__left')}`}>
							<div></div>
							<div className='h-full text-left pr-0 inline-block align-middle'>
								<nav className={`w-auto h-full m-0 relative inline-block align-middle ${cx('__main-menu')} `}>
									<ul className={cx('__left-divided')}>
										<li>
											<a
												id='home'
												onClick={(e: any) => (e.currentTarget.id === 'home' ? setClickedId('home') : '')}
												className={cx('__left-divided__elements')}>
												<span className={cx('__item__outer')}>
													<span
														className={
															clickedId === 'home' ? cx('__item__hover', '__active') : cx('__item__hover')
														}></span>
													<span className={cx('__item__text')}>Trang chủ</span>
												</span>
											</a>
										</li>

										<li>
											<a
												id='news'
												onClick={(e: any) => (e.currentTarget.id === 'news' ? setClickedId('news') : '')}
												className={cx('__left-divided__elements')}>
												<span className={cx('__item__outer')}>
													<span
														className={
															clickedId === 'news' ? cx('__item__hover', '__active') : cx('__item__hover')
														}></span>

													<Link to={'/news'}>
														<span className={cx('__item__text')}>Tin tức</span>
													</Link>
												</span>
											</a>
										</li>

										<li>
											<a
												id='stats'
												onClick={(e: any) => (e.currentTarget.id === 'stats' ? setClickedId('stats') : '')}
												className={cx('__left-divided__elements')}>
												<span className={cx('__item__outer')}>
													<span
														className={
															clickedId === 'stats' ? cx('__item__hover', '__active') : cx('__item__hover')
														}></span>
													<Link
														to={`/standings/${tournament && tournament.seasons ? tournament.seasons[0].standingsId : ''
															}`}>
														<span className={cx('__item__text')}>Bảng xếp hạng</span>
													</Link>
												</span>
											</a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
						<div className={` absolute  w-full left-0 text-center h-full align-middle   ${cx('__center')}`}>
							<div className={`${cx('__center__inner')}`}>
								<div className='inline-block align-middle leading-4'>
									<a className='relative inline-block max-w-[100%] max-h-[130px] h-[128px]'>
										<img src='https://vba.vn/assets/img/svg/vba-logo.svg' className='m-center h-full w-auto'></img>
									</a>
								</div>
							</div>
						</div>

						<div className={`w-[743px] z-2 relative float-right text-left h-full ${cx('__right')}`}>
							<div></div>
							<div className='h-full text-left pl-0 inline-block align-middle'>
								<nav className={`w-auto h-full m-0 relative inline-block align-middle ${cx('__main-menu')} `}>
									<ul className={cx('__left-divided')}>
										<li>
											<a
												id='results'
												onClick={(e: any) => (e.currentTarget.id === 'results' ? setClickedId('results') : '')}
												className={cx('__left-divided__elements')}>
												<span className={cx('__item__outer')}>
													<span
														className={
															clickedId === 'results' ? cx('__item__hover', '__active') : cx('__item__hover')
														}></span>
													<Link to={'/about'}>
														<span className={cx('__item__text')}>Về chúng tôi</span>
													</Link>
												</span>
											</a>
										</li>

										<li>
											<a
												id='fixtures'
												onClick={(e: any) => (e.currentTarget.id === 'fixtures' ? setClickedId('fixtures') : '')}
												className={cx('__left-divided__elements')}>
												<span className={cx('__item__outer')}>
													<span
														className={
															clickedId === 'fixtures' ? cx('__item__hover', '__active') : cx('__item__hover')
														}></span>
													<Link to={`/fixtures/${tournament && tournament.seasons ? tournament?.seasons[0].id : ' '}`}>
														<span className={cx('__item__text')}>Lịch thi đấu</span>
													</Link>
												</span>
											</a>
										</li>

										<li>
											<a
												id='merch'
												onClick={(e: any) => (e.currentTarget.id === 'merch' ? setClickedId('merch') : '')}
												className={cx('__left-divided__elements')}>
												<span className={cx('__item__outer')}>
													<span
														className={
															clickedId === 'merch' ? cx('__item__hover', '__active') : cx('__item__hover')
														}></span>
													<span className={cx('__item__text')}>Đăng nhập</span>
												</span>
											</a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* {props.children} */}
		</>
	);
};
