import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './tournamentManager.module.scss';
import { ReactComponent as Plus } from '../../../assets/svg/plus-com.svg';
import { AdminTeamCard } from '../Components/AdminTeamCard';
import { AdminSeasonCard } from '../Components/AdminSeasonCard';
import { AdminPlayerCard } from '../Components/AdminPlayerCard';
import { CreateTournamentModal } from '../../../components/Modal/CreateTournamentModal';
import { vbaContext } from '../../../Services/services';
import { Tournament } from '../../../Services/models';
import { NewsBlock } from '../../../components/News/NewsBlock';
const cx = classNames.bind(styles);

const tournamnetServices = vbaContext.getTournamentServices();

export const TournamentManager = () => {
	const [clicked, setClicked] = useState(false);
	const [listTournament, setListTournament] = useState<Tournament[]>([]);
	const [reload, setReload] = useState(false);

	const handleCreate = () => {
		setClicked(!clicked);
	};
	const handleCloseModal = () => {
		setClicked(false);
	};
	React.useMemo(async () => {
		try {
			const res = await tournamnetServices.getAllTournament();
			setListTournament(res);
			console.log(listTournament);
		} catch (err) {
			alert('Error get tournament');
		}
	}, [reload]);
	return (
		<>
			<div className='border-b border-solid'>
				<p
					className='uppercase font-bold text-4xl  text-left p-4 mx-2 flex
                 '
				>
					Quản lý giải đấu
					<div className='ml-auto text-right hover:cursor-pointer'>
						<Plus onClick={handleCreate} className='w-[48px] h-[48px]'></Plus>
					</div>
				</p>
			</div>
			<div className={clicked === true ? cx('__active') : cx('__inactive')}>
				<CreateTournamentModal title='Tạo giải đấu' handleCloseModal={handleCloseModal} ></CreateTournamentModal>
			</div>
			<div className='m-2 p-2 justify-start flex-1 block space-y-8 md:space-y-0 md:space-x-8 md:flex'>
				{listTournament.map((tournament: Tournament, i: number) => (
					<AdminTeamCard
						reload={reload}
						setReload={setReload}
						type='tournament'
						tournamentPic='https://vba.vn/assets/img/svg/vba-logo.svg'
						tournament={tournament}
					></AdminTeamCard>
				))}



				{/* 
                <AdminTeamCard
                    type="team"
                    teamName="Boston Celtics"
                    teamLogo="https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg"
                    teamStadium="https://www.enr.com/ext/resources/Issues/NewEng_Issues/2020/11-Nov/16-Nov/Best-Projects/td-garden1.jpg"
                    teamColor="#007A33"
                    stadiumName="TD Garden"
                ></AdminTeamCard>
                <AdminTeamCard
                    type="tournament"
                    tournamentName="VBA"
                    tournamentPic="https://vba.vn/assets/img/svg/vba-logo.svg"
                    tournamentType="Round Robin"
                ></AdminTeamCard> */}

				{/* <AdminTeamCard
					type='team'
					teamName='Boston Celtics'
					teamLogo='https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
					teamStadium='https://www.enr.com/ext/resources/Issues/NewEng_Issues/2020/11-Nov/16-Nov/Best-Projects/td-garden1.jpg'
					teamColor='#007A33'
					stadiumName='TD Garden'></AdminTeamCard> */}
				{/* <AdminSeasonCard></AdminSeasonCard> */}
			</div>

			{/* <div className='m-2 p-2 justify-between flex-1 block space-y-8 md:space-y-0 md:space-x-8 md:flex'>
				<AdminPlayerCard></AdminPlayerCard>
			</div> */}
		</>
	);
};
