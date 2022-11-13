import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './teamInfoFixturesPage.module.scss';
import { ReactComponent as HomeLogo } from '../../../../assets/images/home-com.svg';
import { ReactComponent as PlaneLogo } from '../../../../assets/images/plane-com.svg';
import { ReactComponent as DownArrowLogo } from '../../../../assets/images/downarrow-com.svg';
import { TeamInfoHeader } from '../TeamInfoHeader';
import { NextGameBar } from './NextGameBar';
import { GameLeaders } from '../GameLeaders';
const cx = classNames.bind(styles);
export const TeamInfoFixturesPage = () => {
	const [clicked, setClicked] = useState(false);
	return (
		<div className={`${cx('__wrapper')}`}>
			<section>
				<div className='block bg-[#008348]'>
					<div className={`${cx('__headerContainer')}`}>
						<div className='py-5 px-4'>
							<h4 className='text-white text-center font-bold uppercase'>
								Boston Celtics
							</h4>
							<h1 className={`${cx('__title')} text-center text-white`}>
								Season<br></br>Schedule
							</h1>
						</div>
					</div>
				</div>
				<div className={`${cx('__container')}`}>
					{/* controller */}
					<div className='my-8 container'>
						<div className={`header-wrap justify-between w-full  flex`}>
							<div id='filter-section' className='flex flex-col w-full '>
								<h3 className='uppercase text-lg mb-2'>
									Filter Game Selection{' '}
								</h3>
								<div className='flex m-0 w-full'>
									<div className={`${cx('__filterByType')}`}>
										<label
											onClick={() => {
												setClicked(true);
											}}
											className={
												clicked === true
													? `${cx('__filterBackground', '__active')}`
													: `${cx('__filterBackground')}`
											}>
											<img
												className={`${cx('__filterBackground__image')}`}
												src='https://brooklynse.net/bkn/schedule/assets/all.svg'></img>
										</label>
										<label className={`${cx('__filterBackground')}`}>
											<HomeLogo className={`${cx('__homeLogo')}`}></HomeLogo>
										</label>{' '}
										<label className={`${cx('__filterBackground')}`}>
											<PlaneLogo className={`${cx('__homeLogo')}`}></PlaneLogo>
										</label>{' '}
										{/* <label className={`${cx('__filterBackground')}`}>
											<img
												className={`${cx('__filterBackground__image')}`}
												src='https://brooklynse.net/bkn/schedule/assets/all.svg'></img>
										</label> */}
									</div>
									{/* month */}
									<div className='relative inline-block w-2/5 mr-2 ml-2 '>
										<label className={`${cx('__selection')} w-full `}>
											<select className={`${cx('__selection__button')} `}>
												<option
													className={`${cx('__selection__button')}`}
													value='all-month'>
													MONTH:ALL
												</option>
												<option
													className={`${cx('__selection__button')}`}
													value='all-month'>
													MONTH:ALL
												</option>
												<option
													className={`${cx('__selection__button')}`}
													value='all-month'>
													MONTH:ALL
												</option>
											</select>
											<div className={`${cx('__arrow')}`}>
												<DownArrowLogo className='w-4 h-4'></DownArrowLogo>
											</div>
										</label>
									</div>

									{/* Day */}
									<div className='relative inline-block w-2/5 mr-2 ml-2 '>
										<label className={`${cx('__selection')} w-full `}>
											<select className={`${cx('__selection__button')} `}>
												<option
													className={`${cx('__selection__button')}`}
													value='all-month'>
													MONTH:ALL
												</option>
												<option
													className={`${cx('__selection__button')}`}
													value='all-month'>
													MONTH:ALL
												</option>
												<option
													className={`${cx('__selection__button')}`}
													value='all-month'>
													MONTH:ALL
												</option>
											</select>
											<div className={`${cx('__arrow')}`}>
												<DownArrowLogo className='w-4 h-4'></DownArrowLogo>
											</div>
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* schedule */}
					<div className='my-8 container'>
						<div className={`header-wrap justify-between w-full  flex`}>
							<div id='filter-section' className='flex flex-col w-full '>
								<h3 className='uppercase text-lg mb-2'>Regular Season </h3>
								<NextGameBar></NextGameBar>
								{/* <div className='flex w-full'>
									<div>Home</div>
									<div>Shirt</div>
									<div>LOGO</div>
									<div>Info</div>
									<div>Match recap</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <div className={`${cx('__displayAd')}`}></div>
    <div className={`${cx('__container')}`}>
        <div className={`${cx('__background')}`}>
            <div className={`${cx('__background__block')}`}>
                <img
                    src='https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
                    className={`${cx('__background__block--adjust')}`}
                    alt=''
                />
            </div>
        </div>
        <TeamUpCommingGames></TeamUpCommingGames>
        <TeamRoster></TeamRoster>
        <TeamProfile></TeamProfile>
    </div> */}
			<GameLeaders></GameLeaders>
		</div>
	);
};
