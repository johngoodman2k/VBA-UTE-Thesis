import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './playerManager.module.scss';
import { ReactComponent as Plus } from '../../../assets/svg/plus-com.svg';
import { AdminTeamCard } from '../Components/AdminTeamCard';
import { AdminSeasonCard } from '../Components/AdminSeasonCard';
import { AdminPlayerCard } from '../Components/AdminPlayerCard';
import { CreatePlayerModal } from '../../../components/Modal/CreatePlayerModal';
const cx = classNames.bind(styles);

export const PlayerManager = () => {
	const [clicked, setClicked] = useState(false);
	const handleCreate = () => {
		setClicked(!clicked);
	};
	const handleCloseModal = () => {
		setClicked(false);
	};
	return (
		<>
			<div className='border-b border-solid'>
				<p
					className='uppercase font-bold text-4xl  text-left p-4 mx-2 flex
                 '
				>
					player manager
					<div className='ml-auto text-right hover:cursor-pointer'>
						<Plus onClick={handleCreate} className='w-[48px] h-[48px]'></Plus>
					</div>
				</p>
			</div>
			<div className={clicked === true ? cx('__active') : cx('__inactive')}>
				<CreatePlayerModal handleCloseModal={handleCloseModal}></CreatePlayerModal>
			</div>
			<div className='m-2 p-2 justify-between flex-1 block space-y-8 md:space-y-0 md:space-x-8 md:flex'>
				<AdminTeamCard
					type='tournament'
					tournamentName='VBA'
					tournamentPic='https://vba.vn/assets/img/svg/vba-logo.svg'
					tournamentType='Round Robin'
				></AdminTeamCard>

				<AdminTeamCard
					type='team'
					teamName='Boston Celtics'
					teamLogo='https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
					teamStadium='https://www.enr.com/ext/resources/Issues/NewEng_Issues/2020/11-Nov/16-Nov/Best-Projects/td-garden1.jpg'
					teamColor='#007A33'
					stadiumName='TD Garden'
				></AdminTeamCard>
				<AdminTeamCard
					type='tournament'
					tournamentName='VBA'
					tournamentPic='https://vba.vn/assets/img/svg/vba-logo.svg'
					tournamentType='Round Robin'
				></AdminTeamCard>

				{/* <AdminTeamCard
					type='team'
					teamName='Boston Celtics'
					teamLogo='https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
					teamStadium='https://www.enr.com/ext/resources/Issues/NewEng_Issues/2020/11-Nov/16-Nov/Best-Projects/td-garden1.jpg'
					teamColor='#007A33'
					stadiumName='TD Garden'></AdminTeamCard> */}
			</div>

			<div className='m-2 p-2 justify-between flex-1 block space-y-8 md:space-y-0 md:space-x-8 md:flex'>
				<AdminPlayerCard></AdminPlayerCard>
			</div>
		</>
	);
};
