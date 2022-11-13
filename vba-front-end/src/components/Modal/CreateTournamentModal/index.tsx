//import { TournamentContainer } from "../components/TournamentContainer";
// import { CreateTournamentContainer } from '../components/CreateTournamentContainer';
// import { CreateTournamentHeading } from '../components/CreateTournamentHeading';
import React, { useState } from 'react';
// import UploadAndDisplayImage from '../components/UploadandDisplayImage';

// import { validate } from './validate';
// import { createTournamentApi } from '../Apis/createTournamentApi.api';
// import { TournamentHeading } from '../components/TournamentHeading';
// import { TournamentButtonGroup } from '../components/TournamentButtonGroup';
// import { TournamentType } from '../components/TournamentType';
import { ButtonGroup } from '../../Button/ButtonGroup';
import { Type } from '../../Button/Type';
import classNames from 'classnames/bind';
import styles from './createTournament.module.scss';

const cx = classNames.bind(styles);

export const CreateTournament = () => {
	const [kindState, setKindState] = useState('round robin');
	const [statusState, setStatusState] = useState('active');
	const test = [
		{
			name: 'eliminate',
			image:
				'https://www.interbasket.net/wp-content/uploads/14-team-bracket-single-elimination.jpg'
		},
		{
			name: 'eliminate',
			image:
				'https://www.interbasket.net/wp-content/uploads/14-team-bracket-single-elimination.jpg'
		},
		{
			name: 'eliminate',
			image:
				'https://www.interbasket.net/wp-content/uploads/14-team-bracket-single-elimination.jpg'
		}
	];
	//Create TOURNAMENT
	// const createTournament = async (e: any) => {
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
	//       const res = await createTournamentApi({
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
			{/* <TournamentContainer>
        <h1>Create Tournament</h1>
      </TournamentContainer> */}
			<div className='container text-center m-auto '>
				<div className={`${cx('panel')}`}>
					<header className={`${cx('createtournament_type-header')}`}>
						<div className='container'>
							<h1 className='text-xl font-bold text-white'>
								Create Tournament
							</h1>
						</div>
					</header>
					<div className={`${cx('createtournament-body')}`}>
						<form onSubmit={() => {}}>
							<div
								className={`${cx(
									'createtourament-body-adjust',
									'createtournament_row-wrapper',
									'grid grid-cols-2',
									'text-left'
								)}`}>
								<div className='w-1/2'>
									<div className='my-2'>
										<p className={`${cx('createtournament_text-adjust')}`}>
											ID
										</p>
										<input
											className={`${cx('createtournament_input')}`}
											type='text'
											name='id'
										/>
									</div>
									<div className='my-2'>
										<p className={`${cx('createtournament_text-adjust')}`}>
											Name
										</p>
										<input
											className={`${cx('createtournament_input')}`}
											type='text'
											name='name'
										/>
									</div>
								</div>
								<div className=''>
									<div className='my-2'>
										<p className={`${cx('createtournament_text-adjust')}`}>
											Start Date
										</p>
										<input
											className={`${cx('createtournament_input-date')}`}
											type='date'
											name='start'
										/>
									</div>
									<div className='my-2'>
										<p className={`${cx('createtournament_text-adjust')}`}>
											End Date
										</p>
										<input
											className={`${cx('createtournament_input-date')}`}
											type='date'
											name='end'
										/>
									</div>
								</div>
							</div>
							<div
								className={`${cx(
									'createtournament_row-wrapper',
									'grid grid-cols-2'
								)}`}>
								<div className='w-1/2'>
									<div className='mb-4'>
										<p
											className={`${cx(
												'createtournament_text-adjust',
												'text-left'
											)}`}>
											Competitors type
										</p>
										<ButtonGroup buttons={['One', 'Two']}></ButtonGroup>
									</div>
									<div
										className={`${cx(
											'createtournament_competitortype-block'
										)}`}>
										<p
											className={`${cx(
												'createtournament_text-adjust',
												'text-left'
											)}`}>
											Number of Teams
										</p>
										<input
											className={`${cx('createtournament_input')}`}
											type='text'
											name='name'
										/>
									</div>
								</div>

								<div className={`${cx('position-adjust')}`}>
									<h1 className={`${cx('createtournament_text-desc')}`}>
										Description
									</h1>
									<textarea
										className={`${cx('createtournament_textarea')}`}
										name='description'
										rows={6}
										cols={50}
										placeholder='Write something ... '></textarea>
								</div>
							</div>

							<div className=''>
								<label className={`${cx('createtournament_type-header')}`}>
									Choose your type
								</label>
								<div className={`${cx('createtournament_type-block')}`}>
									<Type type={test}></Type>
								</div>
							</div>

							<div className={`${cx('createTournamentButton-block')}`}>
								<button
									type='submit'
									className={`${cx(
										'position-adjust',
										'createTournamentButton-adjust'
									)}`}>
									<span>Submit!</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
