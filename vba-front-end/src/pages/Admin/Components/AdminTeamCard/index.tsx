import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './adminTeamCard.module.scss';
import { ReactComponent as BasketballIcon } from '../../../../assets/svg/basketball.svg';
import { CustomSelectBar } from '../CustomSelectBar';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

type AdminTeamCardProps = {
	type?: string;
	teamName?: string;
	stadiumName?: string;
	teamLogo?: string;
	teamStadium?: string;
	teamColor?: string;
	tournamentPic?: string;
	tournamentName?: string;
	tournamentType?: string;
	tournamentId?: string;
};

export const AdminTeamCard = (props: AdminTeamCardProps) => {
	return (
		<div className='w-1/4'>
			{props.type === 'tournament' ? (
				<Link className={`${cx('team__card-box')}`} to={`${props.tournamentId}`}>
					<div className='absolute z-20 right-8 top-8	'>
						<CustomSelectBar addNext='Season'></CustomSelectBar>
					</div>
					<div className={`${cx('team__card-image')}`}>
						<span>
							<img
								className={`${cx('team__card-image--adjust')}`}
								src='https://cdnmedia.webthethao.vn/uploads/2022-08-16/nha-thi-dau-CIS-1.jpeg'
								alt=''
							/>
						</span>
					</div>
					<div className={`${cx('team__card-image--badge')}`}>
						<span className={`${cx('team__card-image--badge---container')}`}>
							<img className={`${cx('team__card-image--badge---adjust')}`} src={`${props.tournamentPic}`} alt='' />
						</span>
					</div>
					<div style={{ backgroundColor: 'white', color: 'black' }} className={`${cx('team__card-info--box')}`}>
						<div className=''>
							<h4 className={`${cx('team__card-info--box---adjust')}`}>{props.tournamentName}</h4>
							<div className={`${cx('team__card-info--box---stadiumname')}`}>{props.tournamentType}</div>
						</div>
						<div className={`${cx('team__card-info--box---button')}`}>
							<span className={`${cx('team__card-info--box---button----text')}`}>Tournament Details</span>
							<span className={cx('__block__icon')}>
								<img
									className={cx('__block__icon--adjust')}
									src='https://cdn-icons-png.flaticon.com/512/6780/6780680.png'
									alt=''
								/>
							</span>
						</div>
					</div>
				</Link>
			) : props.type === 'team' ? (
				<a className={`${cx('team__card-box')}`}>
					<div className={`${cx('team__card-image')}`}>
						<span>
							<img className={`${cx('team__card-image--adjust')}`} src={props.teamStadium} alt='' />
						</span>
					</div>
					<div className={`${cx('team__card-image--badge')}`}>
						<span className={`${cx('team__card-image--badge---container')}`}>
							<img className={`${cx('team__card-image--badge---adjust')}`} src={`${props.teamLogo}`} alt='' />
						</span>
					</div>
					<div style={{ backgroundColor: `${props.teamColor}` }} className={`${cx('team__card-info--box')}`}>
						<div className=''>
							<h4 className={`${cx('team__card-info--box---adjust')}`}>{props.teamName}</h4>
							<div className={`${cx('team__card-info--box---stadiumname')}`}>{props.stadiumName}</div>
						</div>
						<div className={`${cx('team__card-info--box---button')}`}>
							<span className={`${cx('team__card-info--box---button----text', '!text-white')}`}>
								Tournament Details
							</span>
							<span className={cx('__block__icon')}>
								<img
									className={cx('__block__icon--adjust')}
									src='https://cdn-icons-png.flaticon.com/512/6780/6780680.png'
									alt=''
								/>
							</span>
						</div>
					</div>
				</a>
			) : (
				<></>
			)}
		</div>
	);
};
