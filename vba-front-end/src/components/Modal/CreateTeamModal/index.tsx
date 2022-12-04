//import { TeamContainer } from "../components/TeamContainer";
// import { CreateTeamContainer } from '../components/CreateTeamContainer';
// import { CreateTeamHeading } from '../components/CreateTeamHeading';
import React, { useEffect, useState } from 'react';
// import UploadAndDisplayImage from '../components/UploadandDisplayImage';
import { ReactComponent as Close } from '../../../assets/svg/close-com.svg';
// import { validate } from './validate';
// import { createTeamApi } from '../Apis/createTeamApi.api';
// import { TeamHeading } from '../components/TeamHeading';
// import { TeamButtonGroup } from '../components/TeamButtonGroup';
// import { TeamType } from '../components/TeamType';
import { ButtonGroup } from '../../Button/ButtonGroup';
import { Type } from '../../Button/Type';
import classNames from 'classnames/bind';
import styles from './createTeam.module.scss';
import { ModalBlock } from '../ModalBlock';
import { PictureChoosing } from '../PictureChoosing';

const cx = classNames.bind(styles);
type createTeamProps = {
	handleCloseModal?: () => void;
};

export const CreateTeamModal = (props: createTeamProps) => {
	//Create Team
	// const createTeam = async (e: any) => {
	//     e.preventDefault();
	//     const id = e.target.id.value;
	//     const name = e.target.name.value;
	//     const description = e.target.description.value;
	//     const startDate = e.target.start.value;
	//     const endDate = e.target.end.value;
	//     const kind = kindState;
	//     const status = statusState;
	//     console.log(id, name, description, startDate, endDate, kind, status);
	//     const validdata = validate(id, name, description, startDate, endDate);
	//     if (validdata) {
	//       const res = await createTeamApi({
	//         id,
	//         name,
	//         description,
	//         startDate,
	//         endDate,
	//         kind,
	//         status,
	//       });
	//       if (res.status === 1) {
	//         alert("Your request has been transfered to the Administrator");
	//       } else {
	//         alert("Try better next time.");
	//       }
	//       console.log(res, "39");
	//     }
	//   };

	return (
		<>
			{/* <TeamContainer>
        <h1>Create Team</h1>
      </TeamContainer> */}
			<ModalBlock>
				<div className='container text-center m-auto '>
					<div className={`${cx('panel')}`}>
						<header className={`${cx('createTeam_type-header')}`}>
							<div className='container flex justify-center items-center '>
								<h1 className='text-2xl font-bold text-white uppercase '>Create Team</h1>
								<div className='ml-auto text-right hover:cursor-pointer'>
									<Close onClick={props.handleCloseModal} className='w-[48px] h-[48px]'></Close>
								</div>
							</div>
						</header>
						<div className={`${cx('createTeam-body')}`}>
							<form onSubmit={() => {}}>
								<div
									className={`${cx(
										'createTeam-body-adjust',
										'createTeam_row-wrapper',
										'grid grid-cols-2',
										'text-left'
									)}`}>
									<div className='w-2/5'>
										<div className='my-2'>
											<p className={`${cx('createTeam_text-adjust')}`}>Name</p>
											<input className={`${cx('createTeam_input')}`} type='text' name='teamname' />
										</div>
										<PictureChoosing header='Team Logo'></PictureChoosing>
									</div>

									<div className='w-2/5'>
										<div className='my-2'>
											<p className={`${cx('createTeam_text-adjust')}`}>Stadium</p>
											<input className={`${cx('createTeam_input')}`} type='text' name='stadium' />
										</div>
										<PictureChoosing header='Stadium Image'></PictureChoosing>
									</div>
								</div>
								<div className={`${cx('createTeam_row-wrapper', 'grid grid-cols-2')}`}>
									<div className='w-3/4'>
										<div className='mb-4'>
											<p className={`${cx('createTeam_text-adjust', 'text-left')}`}>Team color</p>
											<input className={`${cx('createTeam_input')}`} type='text' name='color' />
										</div>
										<div className={`${cx('createTeam_competitortype-block')}`}>
											<p className={`${cx('createTeam_text-adjust', 'text-left')}`}>Team Abbreviation Name</p>
											<input className={`${cx('createTeam_input')}`} type='text' name='name' />
										</div>
									</div>

									<div className={`${cx('position-adjust')}`}>
										<h1 className={`${cx('createTeam_text-desc')}`}>Description</h1>
										<textarea
											className={`${cx('createTeam_textarea')}`}
											name='description'
											rows={6}
											cols={50}
											placeholder='Write something ... '></textarea>
									</div>
								</div>

								<div className={`${cx('createTeamButton-block')}`}>
									<button type='submit' className={`${cx('position-adjust', 'createTeamButton-adjust')}`}>
										<span>Submit!</span>
										<span className={cx('__block__icon', 'w-[15px]', 'h-[14px]')}>
											<img
												className={`${cx('__block__icon--adjust')}`}
												src='https://www.freeiconspng.com/uploads/right-arrow-icon-12.png'
												alt=''
											/>
										</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</ModalBlock>
		</>
	);
};