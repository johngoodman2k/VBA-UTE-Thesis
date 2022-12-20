import React, { useEffect, useState } from 'react';
import styles from './playerInformation.module.scss';
import classNames from 'classnames/bind';
import { PlayerServices } from '../../../Services';
import { vbaContext } from '../../../Services/services';
import { Player } from '../../../Services/models';
import { useParams } from 'react-router-dom';
import { TeamRoster } from '../../../pages/Client/TeamInfoPage/TeamRoster';
import PlayerCard1 from '../PlayerCard1';

const cx = classNames.bind(styles);
const playerServices = vbaContext.playerServices;
const PlayerInformation = () => {
	const params = useParams();
	const [player, setPlayer] = useState<Player>();
	useEffect(() => {
		(async () => {
			const res = await playerServices?.getPlayerById(params.id);
			console.log('17', res);
			setPlayer(res);
		})();
	}, []);
	return (
		<div className={cx('_bigBox')}>
			<div className={cx('_block', 'container', 'm-auto')}>
				<div className={cx('PlayerInformation')}>
					{/* box phía trên */}

					<div className={`${cx('PlayerInformation__Information')}`}>
						{/* logo chìm */}
						<div className={cx('PlayerInformation__Information__TeamLogo')}>
							<div className={cx('PlayerInformation__Information__TeamLogo__LogoBlock')}>
								<img
									src='https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg'
									alt='logo'
									className={cx('PlayerInformation__Information__TeamLogo__LogoBlock__Logo')}></img>
							</div>
						</div>
						{/* ---logo chìm--- */}

						<div className={cx('TopWarp')}>
							<div className={cx('PlayerInformation__Information__InformationBlock')}>
								{/* image bên trái */}
								<div className={cx('PlayerInformation__Information__InformationBlock__ImageBlock')}>
									<div className={cx('PlayerInformation__Information__InformationBlock__ImageBlock__ImageWarp')}>
										<a
											className={cx('PlayerInformation__Information__InformationBlock__ImageBlock__ImageWarp__TeamLogo')}
											href='/'>
											<img
												src='https://cdn.nba.com/logos/nba/1610612744/global/D/logo.svg'
												alt='teamlogo'
												className='w-full h-full object-contain'></img>
										</a>

										<div className={cx('PlayerInformation__Information__InformationBlock__ImageBlock__ImageWarp__Image')}>
											<img src={player?.image as string} alt='playerimage' className='w-full h-full'></img>
										</div>
									</div>
									{/* <div
              className={cx(
                "PlayerInformation__Information__InformationBlock__ImageBlock__ImageWarp"
              )}
            >
              <div
                className={cx(
                  "PlayerInformation__Information__InformationBlock__ImageBlock__ImageWarp__Image"
                )}
              >
                <img
                  src="https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png"
                  alt="playerimage"
                  className="w-full h-full"
                ></img>
              </div>
            </div> */}
								</div>
								{/* ---image bên trái--- */}
								{/* bên phải */}
								<div className={cx('PlayerInformation__Information__InformationBlock__ContentBlock')}>
									<div className={cx('PlayerInformation__Information__InformationBlock__ContentBlock__Content')}>
										<div className='flex flex-col text-white'>
											<p className='t11 md:t2'>Golden State Warriors | #30 | Guard</p>
											<p
												className={cx('PlayerInformation__Information__InformationBlock__ContentBlock__Content__TextName')}>
												{player?.firstName}
											</p>
											<p
												className={cx('PlayerInformation__Information__InformationBlock__ContentBlock__Content__TextName')}>
												{player?.lastName}
											</p>
										</div>
										{/* <div>asdasdasd</div> */}
									</div>
								</div>
								{/* ---bên phải--- */}
							</div>
						</div>
					</div>
					{/* box phía dưới */}
					<div className={cx('PlayerInformation__PlayerSumaryWrap')}>
						<div
							className={`flex flex-row justify-center divide-x divide-[#0268d6] ${cx(
								'PlayerInformation__PlayerSumaryWrap__PlayerSumary'
							)}`}>
							<div
								className={`grid grid-cols-4 divide-x divide-[#0268d6] border border-[#0268d6] text-white ${cx(
									'PlayerInformation__PlayerSumaryWrap__PlayerSumary__Game'
								)}`}>
								<div className='flex justify-center items-center flex-col'>
									<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Game__Text')}>PPG</p>
									<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Game__Number')}>102</p>
								</div>
								<div className='flex justify-center items-center flex-col'>
									<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Game__Text')}>RPG</p>
									<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Game__Number')}>102</p>
								</div>
								<div className='flex justify-center items-center flex-col'>
									<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Game__Text')}>APG</p>
									<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Game__Number')}>102</p>
								</div>
								<div className='flex justify-center items-center flex-col'>
									<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Game__Text')}>PIE</p>
									<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Game__Number')}>102</p>
								</div>
							</div>
							<div
								className={`grid grid-cols-4 divide-x divide-[#0268d6] text-white ${cx(
									'PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt'
								)}`}>
								<div className={`grid grid-rows-2 divide-y divide-[#0268d6]`}>
									<div className='flex justify-center items-center flex-col'>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Text')}>HEIGHT</p>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Number')}>102</p>
									</div>
									<div className='flex justify-center items-center flex-col'>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Text')}>AGE</p>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Number')}>102</p>
									</div>
								</div>
								<div className={`grid grid-rows-2 divide-y divide-[#0268d6]`}>
									<div className='flex justify-center items-center flex-col'>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Text')}>WEIGHT</p>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Number')}>102</p>
									</div>
									<div className='flex justify-center items-center flex-col'>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Text')}>BIRTHDATE</p>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Number')}>102</p>
									</div>
								</div>
								<div className={`grid grid-rows-2 divide-y divide-[#0268d6]`}>
									<div className='flex justify-center items-center flex-col'>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Text')}>COUNTRY</p>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Number')}>102</p>
									</div>
									<div className='flex justify-center items-center flex-col'>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Text')}>DRAFT</p>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Number')}>102</p>
									</div>
								</div>
								<div className={`grid grid-rows-2 divide-y divide-[#0268d6] `}>
									<div className='flex justify-center items-center flex-col'>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Text')}>LAST ATTENDED</p>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Number')}>102</p>
									</div>
									<div className='flex justify-center items-center flex-col'>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Text')}>EXPERIENCE</p>
										<p className={cx('PlayerInformation__PlayerSumaryWrap__PlayerSumary__Detailt__Number')}>102</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-4 py-10'>
					<PlayerCard1></PlayerCard1>
					<PlayerCard1></PlayerCard1>
					<PlayerCard1></PlayerCard1>
					<PlayerCard1></PlayerCard1>

				</div>
			</div>
		</div>



	);
};

export default PlayerInformation;
