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

const cx = classNames.bind(styles);
type createSeasonProps = {
	handleCloseModal?: () => void;
};

export const CreateSeasonModal = (props: createSeasonProps) => {
	//Create Season
	// const createSeason = async (e: any) => {
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
	//       const res = await createSeasonApi({
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
									<Close onClick={props.handleCloseModal} className='w-[48px] h-[48px]'></Close>
								</div>
							</div>
						</header>
						<div className={`${cx('createSeason-body')}`}>
							<form onSubmit={() => {}}>
								<div className='flex justify-between'>
									<div className='my-2 w-full'>
										<p className={`${cx('createSeason_text-adjust')}`}>Season Name</p>
										<input className={`${cx('createSeason_input')}`} type='text' name='name' />
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
