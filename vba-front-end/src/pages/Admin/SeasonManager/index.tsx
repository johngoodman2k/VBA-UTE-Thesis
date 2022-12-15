import React, { useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './seasonManager.module.scss';
import { ReactComponent as Plus } from '../../../assets/svg/plus-com.svg';
import { AdminTeamCard } from '../Components/AdminTeamCard';
import { AdminSeasonCard } from '../Components/AdminSeasonCard';
import { AdminPlayerCard } from '../Components/AdminPlayerCard';

import { CreateSeasonModal } from '../../../components/Modal/CreateSeasonModal';
import { vbaContext } from '../../../Services/services';
import { Season } from '../../../Services/models';
import toastNotify from '../../../utils/toast';
import { NoData } from '../Components/NoData';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

const seasonServices = vbaContext.getSeasonServices();

export const SeasonManager = () => {
	const params = useParams();
	const [listSeason, setListSeason] = useState<Season[]>([]);
	const [clicked, setClicked] = useState(false);
	const handleCreate = () => {
		setClicked(!clicked);
	};
	const handleCloseModal = () => {
		setClicked(false);
	};
	useMemo(async () => {
		try {
			let res: Season[] = [];
			if (params && params.id) {
				res = await seasonServices.getSeasonByTournamentId(params.id);
			} else {
				res = await seasonServices.getAllSeason();
			}
			setListSeason(res);

			console.log(listSeason);
		} catch (err) {
			console.log(err);
			toastNotify('Error for get seasons', 'error');
		}
	}, []);
	return (
		<>
			<div className='border-b border-solid'>
				<p className='uppercase font-bold text-4xl  text-left p-4 mx-2 flex flex-col'>
					{params.id && <div className='block'>Tournament: {params.id}</div>}

					<div className='ml-6 block'>Season manager</div>
					{/* <div className='ml-auto text-right hover:cursor-pointer'>
						<Plus onClick={handleCreate} className='w-[48px] h-[48px]'></Plus>
					</div> */}
				</p>
			</div>
			<div className={clicked === true ? cx('__active') : cx('__inactive')}>
				<CreateSeasonModal handleCloseModal={handleCloseModal}></CreateSeasonModal>
			</div>
			<div className='m-2 p-2 justify-start flex-1 block space-y-8 md:space-y-0 md:space-x-8 md:flex'>
				{listSeason.length > 0 ? (
					listSeason.map((season: Season, i: number) => <AdminSeasonCard title={season.name ?? ''}></AdminSeasonCard>)
				) : (
					<NoData content='No Data Season' />
				)}
			</div>
		</>
	);
};
