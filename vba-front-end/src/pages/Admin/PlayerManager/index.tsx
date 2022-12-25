import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './playerManager.module.scss';
import { ReactComponent as Plus } from '../../../assets/svg/plus-com.svg';
import { AdminTeamCard } from '../Components/AdminTeamCard';
import { AdminSeasonCard } from '../Components/AdminSeasonCard';
import { AdminPlayerCard } from '../Components/AdminPlayerCard';
import { CreatePlayerModal } from '../../../components/Modal/CreatePlayerModal';
import { useParams } from 'react-router-dom';
import { vbaContext } from '../../../Services/services';
import { Player, Team } from '../../../Services/models';
import toastNotify from '../../../utils/toast';
import { NoData } from '../Components/NoData';
const cx = classNames.bind(styles);
const teamServices = vbaContext.getTeamServices()
const playerServices = vbaContext.getPlayerServices()

export const PlayerManager = () => {
	const params = useParams();
	const [clicked, setClicked] = useState(false);
	const [listPlayer, setListPlayer] = useState<Player[]>([]);
	const [team, setTeam] = useState<Team | undefined>();
	const [reload, setReload] = useState(false)

	const handleCreate = () => {
		setClicked(!clicked);
	};
	const handleCloseModal = () => {
		setClicked(false);
	};
	useEffect(() => {
		(async () => {
			try {
				let res: Player[];
				let res1: Team
				if (params && params.id) {
					// res = await playerServices.getPlayersByTeamId(params.id);
					res1 = await teamServices.getTeamById(params.id)
					setTeam(res1)
					// setListPlayer(res);

				} else {
					res = await playerServices.getAllPlayers();
					setListPlayer(res);
					console.log("45", res)
				}



				console.log(listPlayer);
			} catch (err) {
				console.log(err);
				toastNotify('Error for get Team', 'error');
			}
		})()
	}, [reload]);
	return (
		<>
			<div className='border-b border-solid'>
				<p className='uppercase font-bold text-4xl  text-left p-4 mx-2 flex'>
					{params.id && <div className='block'>Team: {team ? team.teamName ?? team.teamname : ""}</div>}
					<div className='ml-6 block'>Quản lý cầu thủ</div>
					<div className='ml-auto text-right hover:cursor-pointer'>
						<Plus onClick={handleCreate} className='w-[48px] h-[48px]'></Plus>
					</div>
				</p>
			</div>
			<div className={clicked === true ? cx('__active') : cx('__inactive')}>
				<CreatePlayerModal reload={reload} setReload={setReload} id={params.id} title="Tạo cầu thủ" handleCloseModal={handleCloseModal}></CreatePlayerModal>
			</div>
			<div className='m-2 p-2 justify-between flex-1 block space-y-8 md:space-y-0 md:space-x-8 md:flex'>

			</div>

			{params.id ?  <div className='m-2 p-2 grid grid-cols-4 align-middle gap-12'>
				{team && team.players &&team.players.length !== 0 ? (
					team.players.map((player: Player, i: number) => <AdminPlayerCard teamImage={team?.teamlogo as string} reload={reload} setReload={setReload} player={player}></AdminPlayerCard>)
				) : (
					<NoData content='No Data Team' />
				)}
			</div>
			:<div className='m-2 p-2 grid grid-cols-4 align-middle gap-12'>
				{listPlayer.length > 0 ? (
					listPlayer.map((player: Player, i: number) => <AdminPlayerCard teamImage={team?.teamlogo as string} reload={reload} setReload={setReload} player={player}></AdminPlayerCard>)
				) : (
					<NoData content='No Data Team' />
				)}
			</div>
			}
			
		</>
	);
};
