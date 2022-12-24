import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './teamInfoFixturesPage.module.scss';
import { ReactComponent as HomeLogo } from '../../../../assets/images/home-com.svg';
import { ReactComponent as PlaneLogo } from '../../../../assets/images/plane-com.svg';
import { ReactComponent as DownArrowLogo } from '../../../../assets/images/downarrow-com.svg';
import { TeamInfoHeader } from '../TeamInfoHeader';
import { NextGameBar } from './NextGameBar';
import { GameLeaders } from '../GameLeaders';
import { vbaContext } from '../../../../Services/services';
import { Match, Team } from '../../../../Services/models';
import { useParams } from 'react-router-dom';
const teamServices = vbaContext.getTeamServices();
const cx = classNames.bind(styles);
export const TeamInfoFixturesPage = () => {
	const [clicked, setClicked] = useState(false);
	const [team, setTeam] = useState<Team>();
	const [home, setHome] = useState('')
	const handleHomeMatch = () => {
		setHome('home')
		console.log(home)
	}

	const param = useParams()
	useEffect(() => {
		(async () => {
			if (param.id) {
				const res1 = await teamServices.getTeamById(param.id);
				setTeam(res1);
				console.log(res1)
			}
		})();
	}, []);
	return (
		<div className={`${cx('__wrapper')}`}>
			<section>
				<div className='block' style={{ backgroundColor: `${team?.color}` }}>
					<div className={`${cx('__headerContainer')}`}>
						<div className='py-5 px-4'>
							<h4 className='text-white text-center font-bold uppercase'>{team?.teamname}</h4>
							<h1 className={`${cx('__title')} text-center text-white`}>
								Lịch thi đấu
							</h1>
						</div>
					</div>
				</div>
				<div className={`${cx('__container')}`}>
					{/* controller */}
					<div className='my-8 container'>
						<div className={`header-wrap justify-between w-full  flex`}>
							<div id='filter-section' className='flex flex-col w-full hidden '>
								<h3 className='uppercase text-lg mb-2'>Tìm kiếm </h3>
								<div className='flex m-0 w-full'>
									<div className={`${cx('__filterByType')}`}>
										<label
											onClick={() => {
												setClicked(true);
											}}
											className={
												clicked === true ? `${cx('__filterBackground', '__active')}` : `${cx('__filterBackground')}`
											}>
											<img
												className={`${cx('__filterBackground__image')}`}
												src='https://brooklynse.net/bkn/schedule/assets/all.svg'></img>
										</label>
										<label onClick={handleHomeMatch}
											className={
												home === 'home' ? `${cx('__filterBackground', '__active')}` : `${cx('__filterBackground')}`
											}>
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
												<option className={`${cx('__selection__button')}`} value='all-month'>
													MONTH:ALL
												</option>
												<option className={`${cx('__selection__button')}`} value='all-month'>
													MONTH:ALL
												</option>
												<option className={`${cx('__selection__button')}`} value='all-month'>
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
												<option className={`${cx('__selection__button')}`} value='all-month'>
													MONTH:ALL
												</option>
												<option className={`${cx('__selection__button')}`} value='all-month'>
													MONTH:ALL
												</option>
												<option className={`${cx('__selection__button')}`} value='all-month'>
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
								<h3 className='uppercase text-lg mb-2'>Mùa thường niên </h3>
								{team?.matches?.map((x: Match) =>
									<NextGameBar id={param.id} match={x}></NextGameBar>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
