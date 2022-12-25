import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './adminPlayerCard.module.scss';
import { Player } from '../../../../Services/models';
import { converMToFeet } from '../../../../utils/convert';
import { CreatePlayerModal } from '../../../../components/Modal/CreatePlayerModal';
import { Link } from 'react-router-dom';
import { vbaContext } from '../../../../Services/services';
const cx = classNames.bind(styles);
type AdminPlayerCardProps = {
	reload?: boolean;
	setReload?: React.Dispatch<React.SetStateAction<boolean>>
	player?: Player
	teamImage?: string;
};

const playerServices = vbaContext.getPlayerServices()

export const AdminPlayerCard = ({ reload, setReload, player, teamImage }: AdminPlayerCardProps) => {
	const [openEditModal, setOpenEditModal] = useState(false)
	const handleEditPlayer = () => {
		setOpenEditModal(true)
	}
	const handleDeletePlayer = async ()=>{
		if(player && player.id)
		await playerServices.deletePlayer(player.id)
		if(setReload)setReload(!reload)
	}
	return (
		<div className='relative basis-1/5 group  bg-black rounded-md text-white overflow-hidden'>
			<button
				type="button"
				onClick={handleDeletePlayer}
				className={`${cx(
					'text-center uppercase tracking-wider text-transparent group-hover:text-[#f23333] font-light text-[2rem] leading-[4.25rem] font-[Teko] m-0 z-[5] absolute top-[5%] left-[5%]',
					'_number'
				)}`}>
				X
			</button>
			<div onClick={handleEditPlayer} className="hover:cursor-pointer">
				<img src={player ? player.image as string : 'https://i.ibb.co/dKPn924/hieu-thanh.png'} className='w-full max-w-full h-auto block'></img>

			</div>
			<p
				className={`${cx(
					'text-center uppercase tracking-wider text-[#2d2d2d] group-hover:text-white font-medium text-[4.25rem] leading-[4.25rem] font-[Teko] m-0 z-[5] absolute top-[5%] right-[5%]',
					'_number'
				)}`}>
				{player ? player.shirtNumber ?? player.shirtnumber : ""}
			</p>
			<a className={`${cx('_logo')}`}>
				<img src={player ? teamImage as string ?? player.teamlogo : 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'} alt='' />
			</a>
			<Link to={`/player/${player?.id ?? ""}`} className={`${cx('_playerInfo')}`}>
				<p className={`${cx('font-extrabold text-left !leading-5 text-2xl !ml-0 mb-1', '_name')}`}>
					{player ? player.lastName ?? player.lastname : ""}
					<span className='block mt-1'>{player ? player.firstName ?? player.firstname : ""}</span>
				</p>
				<p className='pb-4 ml-0 text-left uppercase font-bold text-xs '>Foward</p>
				<p className=' text-left uppercase font-normal text-sm !leading-4 text-xl !ml-0 my-2'>
					Cân nặng
					<span className='block font-extrabold my-2'>{player ? player.weight + " KG" : undefined}</span>
				</p>
				<p className=' text-left uppercase font-normal text-sm !leading-4 text-xl !ml-0 my-2'>
					Chiều cao
					<span className='block font-extrabold my-2'>{converMToFeet(player ? player.height : undefined)}</span>
				</p>{' '}
			</Link>
			{openEditModal && <CreatePlayerModal reload={reload} setReload={setReload} player={player} title="Edit Player" handleCloseModal={() => setOpenEditModal(false)}></CreatePlayerModal>}
		</div>
	);
};
