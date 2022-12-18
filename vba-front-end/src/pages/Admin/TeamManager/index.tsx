import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './teamManager.module.scss';
import { ReactComponent as Plus } from '../../../assets/svg/plus-com.svg';
import { AdminTeamCard } from '../Components/AdminTeamCard';
import { AdminSeasonCard } from '../Components/AdminSeasonCard';
import { AdminPlayerCard } from '../Components/AdminPlayerCard';
import { CreateTeamModal } from '../../../components/Modal/CreateTeamModal';
import { Player, Season, Team } from '../../../Services/models';
import { NoData } from '../Components/NoData';
import { useParams } from 'react-router-dom';
import { vbaContext } from '../../../Services/services';
import toastNotify from '../../../utils/toast';
import { SeasonServices } from '../../../Services';
const cx = classNames.bind(styles);

const teamServices = vbaContext.getTeamServices()
const seasonServices = vbaContext.getSeasonServices()


export const TeamManager = () => {
	const params = useParams();
	const [listTeam,setListTeam] = useState<Team[]>([])
	const [clicked, setClicked] = useState(false);
	const [reload,setReload] =useState(false);
	const [season,setSeason] = useState<Season>()
	const handleCreate = () => {
		setClicked(!clicked);
	};
	const handleCloseModal = () => {
		setClicked(false);
	};

	useEffect(()=>{
		(async () => {
		try {
			let res: any;
			let res1: Season
			if (params && params.id) {
				res = await teamServices.getTeamsBySeasonId(params.id);
				res1 = await seasonServices.getSeasonById(params.id)
				setSeason(res1);
				setListTeam(res);
			} else {
				res = await teamServices.getAllTeams();
				setListTeam(res.list);

			}

			console.log(listTeam);
		} catch (err) {
			console.log(err);
			toastNotify('Error for get Team', 'error');
		}
	})()
	}, [reload]);
	return (
		<>
			<div className='border-b border-solid'>
				<p className='uppercase font-bold text-4xl  text-left p-4 mx-2 flex flex-col'>

					{params.id && <div className='block'>Season: {season ? season.name : ""}</div>}

					<div className='ml-6 block'>Team manager</div>
					<div className='ml-auto text-right hover:cursor-pointer'>
						<Plus onClick={handleCreate} className='w-[48px] h-[48px]'></Plus>
					</div>
				</p>
			</div>
			<div className={clicked === true ? cx('__active') : cx('__inactive')}>
				<CreateTeamModal title="Create Team" seasonId={params.id} reload={reload} setReload={setReload}  handleCloseModal={handleCloseModal}></CreateTeamModal>
			</div>
			
			<div className='m-2 p-2 justify-start flex-wrap block space-y-8 md:space-y-0 md:space-x-8 md:flex'>
			{listTeam.length > 0 ? (
					listTeam.map((team: Team, i: number) =><AdminTeamCard reload={reload} setReload={setReload} type="team" team={team}></AdminTeamCard>)
				) : (
					<NoData content='No Data Team' />
				)}
			</div>
		</>
	);
};
