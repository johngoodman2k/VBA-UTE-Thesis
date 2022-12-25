import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateSeasonModal } from '../../../../components/Modal/CreateSeasonModal';
import { CreateTeamModal } from '../../../../components/Modal/CreateTeamModal';
import { Season } from '../../../../Services/models';
import { vbaContext } from '../../../../Services/services';
import toastNotify from '../../../../utils/toast';
import { CustomSelectBar } from '../CustomSelectBar';

type AdminSeasonCardProps = {
	season?: Season;
	reload?: boolean;
	setReload?: React.Dispatch<React.SetStateAction<boolean>>
};

export const AdminSeasonCard = ({season,reload,setReload }: AdminSeasonCardProps) => {
	const [openModalAdd, setOpenModalAdd] = useState(false)
	const [openModalEdit, setOpenModalEdit] = useState(false)

	const handleAdd= ()=>{
		setOpenModalAdd(true)
	}
	const handleEdit =()=>{
		setOpenModalEdit(true)
	}
	const handleDelete = async ()=>{
		if(season && season.id){
			const isdelete  = await vbaContext.getSeasonServices().deleteSeason(season.id)
			if(isdelete === 0) {toastNotify("Xóa thất bại ","error")}
			else {
				toastNotify("Xóa thành công ","success");
				if(setReload) setReload(!reload)
			}
		}
	}

	const handleCloseModalAdd =()=>{
		setOpenModalAdd(false)
	}
	const handleCloseModalEdit =()=>{
		setOpenModalEdit(false)
	}

	return (
		<>
		<div className='relative basis-1/5  w-full transition duration-300 ease-in-out delay-150 bg-black hover:text-white hover:-translate-y-1'>
			<div className='absolute z-20 right-8 top-8	'>
				<CustomSelectBar addNext='Team'  handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete}></CustomSelectBar>
			</div>
			<Link to={`../seasons/${season?.id??""}`} >

			<img
				src='https://vba.vn/assets/img/svg/vba-logo.svg'
				className='w-full h-full object-contain wp-post-image'
				alt=''
			/>
			</Link>
			<div className='absolute bottom-0 w-full p-4 bg-black'>
				<h4 className='text-xl font-sorabold'>{season?.name ?? ""}</h4>
			</div>
		</div>
		{openModalAdd && <CreateTeamModal title="Create Team" seasonId={season?.id} handleCloseModal={handleCloseModalAdd}></CreateTeamModal>}
		{openModalEdit && <CreateSeasonModal reload={reload} setReload={setReload} season={season} handleCloseModal={handleCloseModalEdit}></CreateSeasonModal>}

		</>
		
	);
};
