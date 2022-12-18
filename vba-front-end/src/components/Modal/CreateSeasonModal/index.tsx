//import { SeasonContainer } from "../components/SeasonContainer";
// import { CreateSeasonContainer } from '../components/CreateSeasonContainer';
// import { CreateSeasonHeading } from '../components/CreateSeasonHeading';
import React, { useState } from 'react';
// import UploadAndDisplayImage from '../components/UploadandDisplayImage';
import { ReactComponent as Close } from '../../../assets/svg/close-com.svg';
// import { validate } from './validate';
// import { createSeasonApi } from '../Apis/createSeasonApi.api';
// import { SeasonHeading } from '../components/SeasonHeading';
// import { SeasonButtonGroup } from '../components/SeasonButtonGroup';
// import { SeasonType } from '../components/SeasonType';
import { ButtonGroup } from '../../Button/ButtonGroup';
import { Type } from '../../Button/Type';
import classNames from 'classnames/bind';
import styles from './createSeason.module.scss';
import { ModalBlock } from '../ModalBlock';
import validate from './validate';
import { vbaContext } from '../../../Services/services';
import toastNotify from '../../../utils/toast';
import { Season } from '../../../Services/models';
import { checkDuplicateObject } from '../../../utils/checker';

const cx = classNames.bind(styles);
type createSeasonProps = {
	id?: string
	handleCloseModal?: () => void;
	setReload?: React.Dispatch<React.SetStateAction<boolean>>
	season?: Season;
	reload?:boolean
};
const getTournamentServices = vbaContext.getTournamentServices()
const getSeasonServices = vbaContext.getSeasonServices()

export const CreateSeasonModal = ({id,handleCloseModal,setReload,reload,season}: createSeasonProps) => {
	const initState = {
		name: season?.name ?? "",
		
	}

	const handleCreateOrEditSeason = async (e:any) =>{
		e.preventDefault();
		if(!id && !season) return ;
		const name = e.target.name.value
		const validata = validate(name)
		try{
			if(validata){
				if(season && season.id){
					if(checkDuplicateObject(season,validata)){
						toastNotify('Please change anything', 'warn');
					}else{
						const res = await getSeasonServices.updateSeason(season.id,validata);
						console.log(66,res)
						toastNotify("season have been updated","success")
					}

				}else if(id){
					const res = await getTournamentServices.createSeasonAndAddToTournament(validata.name,id);
					console.log(66,res)
					toastNotify("Create season and add to tournament success","success")
					
				}
				if(setReload)
				setReload(!reload)
				if(handleCloseModal) handleCloseModal()
			}
				
				
				
		}catch (e){
			toastNotify("Create season and add to tournament failed","error")
		}
	}

	return (
		<>
			{/* <SeasonContainer>
        <h1>Create Season</h1>
      </SeasonContainer> */}
			<ModalBlock>
				<div className='container text-center m-auto '>
					<div className={`${cx('panel')}`}>
						<header className={`${cx('createSeason_type-header')}`}>
							<div className='container flex justify-center items-center '>
								<h1 className='text-2xl font-bold text-white uppercase '>Create Season</h1>
								<div className='ml-auto text-right hover:cursor-pointer'>
									<Close onClick={handleCloseModal} className='w-[48px] h-[48px]'></Close>
								</div>
							</div>
						</header>
						<div className={`${cx('createSeason-body')}`}>
							<form onSubmit={handleCreateOrEditSeason}>
								<div className='flex justify-between'>
									<div className='my-2 w-full'>
										<p className={`${cx('createSeason_text-adjust')}`}>Season Name</p>
										<input defaultValue={initState.name} id="createSeasonModal_input" className={`${cx('createSeason_input')}`} type='text' name='name' />
									</div>
									<div className={`${cx('createSeasonButton-block')}`}>
										<button type='submit' className={`${cx('position-adjust', 'createSeasonButton-adjust')}`}>
											<span>Go !</span>
											<span className={cx('__block__icon', 'w-[15px]', 'h-[14px]')}>
												<img
													className={`${cx('__block__icon--adjust')}`}
													src='https://www.freeiconspng.com/uploads/right-arrow-icon-12.png'
													alt=''
												/>
											</span>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</ModalBlock>
		</>
	);
};
