import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './adminTeamCard.module.scss';
import { ReactComponent as BasketBallIcon } from '../../../../assets/svg/basketball.svg';
import miamilogo from '../../../../assets/images/miami-heat-basketball-logo.png'
import clocklogo from '../../../../assets/images/clock.png'
import { ReactComponent as MiamiHeatLogo } from '../../../../assets/svg/miami-heat-logo.svg';

import { CustomSelectBar } from '../CustomSelectBar';
import { Link } from 'react-router-dom';
import { CreateSeasonModal } from '../../../../components/Modal/CreateSeasonModal';
import { CreateTournamentModal } from '../../../../components/Modal/CreateTournamentModal';
import { Team, Tournament } from '../../../../Services/models';
import { CreatePlayerModal } from '../../../../components/Modal/CreatePlayerModal';
import { CreateTeamModal } from '../../../../components/Modal/CreateTeamModal';
const cx = classNames.bind(styles);

type AdminTeamCardProps = {
	type?: string;
	team?: Team;
	reload?: boolean;
	setReload?: React.Dispatch<React.SetStateAction<boolean>>
	tournamentPic?: string;
	tournament?: Tournament;
};

export const AdminTeamCard = (props: AdminTeamCardProps) => {
	const [openSeasonModal, setOpenSeasonModal] = useState(false)
	const [openSeasonEditModal, setOpenSeasonEditModal] = useState(false)

	const [openTeamModal, setOpenTeamModal] = useState(false)
	const [openTeamEditModal, setOpenTeamEditModal] = useState(false)

	//season
	const handleAddSeason = () => {
		setOpenSeasonModal(true)
	}
	const handleCloseSeasonModal = () => {
		setOpenSeasonModal(false)
	}
	const handleEditSeason = () => {
		setOpenSeasonEditModal(true)
	}
	const handleCloseSeasonEditModal = () => {
		setOpenSeasonEditModal(false)
	}

	//team
	const handleAddTeam = () => {
		setOpenTeamModal(true)
	}
	const handleCloseTeamModal = () => {
		setOpenTeamModal(false)
	}
	const handleEditTeam = () => {
		setOpenTeamEditModal(true)
	}
	const handleCloseTeamEditModal = () => {
		setOpenTeamEditModal(false)
	}
	return (
		<div className=''>
			{props.type === 'tournament' ? (
				<div className={`${cx('team__card-box')}`} >
					<div className='absolute z-20 right-8 top-8	'>
						<CustomSelectBar addNext='Season' handleAdd={handleAddSeason} handleEdit={handleEditSeason}></CustomSelectBar>
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
							<h4 className={`${cx('team__card-info--box---adjust')}`}>{props.tournament?.name ?? ""}</h4>
							<div className={`${cx('team__card-info--box---stadiumname')}`}>{props.tournament?.type === 'roundrobin' ? 'Round Robin' : 'eliminate' ? 'Eliminate' : ''}</div>
						</div>
						<Link to={`${props.tournament?.id ?? ""}`} className={`${cx('team__card-info--box---button')}`}>
							<span className={`${cx('team__card-info--box---button----text')}`}>Tournament Details</span>
							<span className={cx('__block__icon')}>
								<img
									className={cx('__block__icon--adjust')}
									src='https://cdn-icons-png.flaticon.com/512/6780/6780680.png'
									alt=''
								/>
							</span>
						</Link>
					</div>
					{openSeasonModal && <CreateSeasonModal id={props.tournament?.id} handleCloseModal={handleCloseSeasonModal}></CreateSeasonModal>}
					{openSeasonEditModal && <CreateTournamentModal reload={props.reload} setReload={props.setReload} tournament={props.tournament} handleCloseModal={handleCloseSeasonEditModal} title={"Edit Tournament"}></CreateTournamentModal>}

				</div>
			) : props.type === 'team' && props.team ? (
				<div className={`${cx('team__card-box')}`}>
					<div className='absolute z-20 right-8 top-8	'>
						<CustomSelectBar icon={<img src={clocklogo} className="w-[50px] h-[50px] object-cover bg-transparent" />} addNext='Player' handleAdd={handleAddTeam} handleEdit={handleEditTeam}></CustomSelectBar>
					</div>
					<div className={`${cx('team__card-image')}`}>
						<span>
							<img className={`${cx('team__card-image--adjust')}`} src={props.team.stadiumpic as string ?? "https://vba.vn/assets/img/svg/vba-logo.svg"} alt='' />
						</span>
					</div>
					<div className={`${cx('team__card-image--badge')}`}>
						<span className={`${cx('team__card-image--badge---container')}`}>
							<img className={`${cx('team__card-image--badge---adjust')}`} src={props.team.teamlogo as string ?? props.team.teamLogo as string ?? "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg"} alt='' />
						</span>
					</div>
					<div style={{ backgroundColor: `${props.team.color}` }} className={`${cx('team__card-info--box')}`}>
						<div className=''>
							<h4 className={`${cx('team__card-info--box---adjust')}`}>{props.team.teamname ?? props.team.teamName ?? ""}</h4>
							<div className={`${cx('team__card-info--box---stadiumname')}`}>{props.team.stadiumname} </div>
						</div>
						<Link to={`../teams/${props.team.id}`} className={`${cx('team__card-info--box---button')}`}>
							<span className={`${cx('team__card-info--box---button----text', '!text-white')}`}>
								Team Details
							</span>
							<span className={cx('__block__icon')}>
								<img
									className={cx('__block__icon--adjust')}
									src='https://cdn-icons-png.flaticon.com/512/6780/6780680.png'
									alt=''
								/>
							</span>
						</Link>
					</div>
					{openTeamModal && <CreatePlayerModal title='Add Player' id={props.team.id} handleCloseModal={handleCloseTeamModal}></CreatePlayerModal>}
					{openTeamEditModal && <CreateTeamModal reload={props.reload} setReload={props.setReload} team={props.team} handleCloseModal={handleCloseTeamEditModal} title="Edit Team"></CreateTeamModal>}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};
