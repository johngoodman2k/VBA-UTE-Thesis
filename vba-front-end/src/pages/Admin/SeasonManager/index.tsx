import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './seasonManager.module.scss';
import { ReactComponent as Plus } from '../../../assets/svg/plus-com.svg';
import { AdminTeamCard } from '../Components/AdminTeamCard';
import { AdminSeasonCard } from '../Components/AdminSeasonCard';
import { AdminPlayerCard } from '../Components/AdminPlayerCard';

import { CreateSeasonModal } from '../../../components/Modal/CreateSeasonModal';
import { vbaContext } from '../../../Services/services';
import { Season, Tournament } from '../../../Services/models';
import toastNotify from '../../../utils/toast';
import { NoData } from '../Components/NoData';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

const seasonServices = vbaContext.getSeasonServices();
const tournamentServices = vbaContext.getTournamentServices();

export const SeasonManager = () => {
	const params = useParams();
	const [listSeason, setListSeason] = useState<Season[]>([]);
	const [clicked, setClicked] = useState(false);
	const [reload, setReload] = useState(false);
	const [tournament, setTournament] = useState<Tournament>()
	const handleCreate = () => {
		setClicked(true);
	};
	const handleCloseModal = () => {
		setClicked(false);
	};
	useEffect(() => {
		(async () => {
			try {
				let res: any;
				let res1: Tournament;

				if (params && params.id) {
					res = await seasonServices.getSeasonByTournamentId(params.id);
					res1 = await tournamentServices.getTournamentById(params.id);
					setTournament(res1)
					setListSeason(res);

				} else {
					res = await seasonServices.getAllSeason();
					setListSeason(res.list);
				}

				console.log(listSeason);
			} catch (err) {
				console.log(err);
				toastNotify('Error for get seasons', 'error');
			}
		})()
	}, [reload]);
	return (
		<>
			<div className='border-b border-solid'>
				<p className='uppercase font-bold text-4xl  text-left p-4 mx-2 flex flex-col'>
					{params.id && <div className='block'>Giải đấu {tournament ? tournament.name : ""}</div>}

					<div className='block'>Quản lý mùa giải</div>
					<div className='ml-auto text-right hover:cursor-pointer'>
						<Plus onClick={handleCreate} className='w-[48px] h-[48px]'></Plus>
					</div>
				</p>
			</div>
			<div className={clicked === true ? cx('__active') : cx('__inactive')}>
				<CreateSeasonModal reload={reload} setReload={setReload} id={params.id} handleCloseModal={handleCloseModal}></CreateSeasonModal>
			</div>
			<div className='m-2 p-2 justify-start flex-wrap block space-y-8 md:space-y-0 md:space-x-8 md:flex'>
				{listSeason.length > 0 ? (
					listSeason.map((season: Season, i: number) => <AdminSeasonCard reload={reload} setReload={setReload} season={season} ></AdminSeasonCard>)
				) : (
					<NoData content='No Data Season' />
				)}
			</div>
		</>
	);
};
