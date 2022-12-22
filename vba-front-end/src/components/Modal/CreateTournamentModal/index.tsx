//import { TournamentContainer } from "../components/TournamentContainer";
// import { CreateTournamentContainer } from '../components/CreateTournamentContainer';
// import { CreateTournamentHeading } from '../components/CreateTournamentHeading';
import React, { useState } from 'react';
// import UploadAndDisplayImage from '../components/UploadandDisplayImage';
import { ReactComponent as Close } from '../../../assets/svg/close-com.svg';
import { validate } from './validate';
// import { TournamentHeading } from '../components/TournamentHeading';
// import { TournamentButtonGroup } from '../components/TournamentButtonGroup';
// import { TournamentType } from '../components/TournamentType';
import { ButtonGroup } from '../../Button/ButtonGroup';
import { Type } from '../../Button/Type';
import classNames from 'classnames/bind';
import styles from './createTournament.module.scss';
import { ModalBlock } from '../ModalBlock';
import { vbaContext } from '../../../Services/services';
import toastNotify from '../../../utils/toast';
import { Tournament } from '../../../Services/models';
import { convertToDateTime } from '../../../utils/dateFormat';
import { checkDuplicateObject } from '../../../utils/checker';
const cx = classNames.bind(styles);
type createTournamentProps = {
	handleCloseModal?: () => void;
	title: string;
	tournament?: Tournament;
	reload?: boolean;
	setReload?: React.Dispatch<React.SetStateAction<boolean>>;
};

const typeOptions = [
	{
		name: 'Loại trực tiếp',
		image: 'https://www.interbasket.net/wp-content/uploads/14-team-bracket-single-elimination.jpg',
		value: 'eliminate'
	},
	{
		name: 'Vòng tròn',
		image: 'https://www.interbasket.net/wp-content/uploads/14-team-bracket-single-elimination.jpg',
		value: 'roundrobin'
	}
];

const ButtonOptions = [
	{ name: 'One', value: 'one' },
	{ name: 'Double', value: 'double' }
];

const getTournamentServices = vbaContext.getTournamentServices();

export const CreateTournamentModal = (props: createTournamentProps) => {
	const initState = {
		name: props.tournament?.name ?? "",
		startDate: props.tournament?.startDate ?? "",
		endDate: props.tournament?.endDate ?? "",
		competitor: props.tournament?.competitor ?? "",
		description: props.tournament?.description,
		type: props.tournament?.type ?? ""
	}
	console.log(initState)
	const [tournamentType, setTournamentType] = useState<string>(initState.type);
	const [competitor, setCompetitor] = useState<string>(initState.competitor);




	//Create TOURNAMENT
	const createOrUpdateTournament = async (e: any) => {
		e.preventDefault();
		// const id = e.target.id.value;
		const name = e.target.name.value;
		const description = e.target.description.value;
		const startDate = e.target.startdate.value;
		const endDate = e.target.enddate.value;
		const type = tournamentType;
		const newCompetitor = competitor;
		const validata = validate(name, newCompetitor, startDate, endDate, description, type);
		try {
			if (validata) {
				if (props.tournament && props.tournament.id) {
					props.tournament.startDate = convertToDateTime(props.tournament.startDate)
					props.tournament.endDate = convertToDateTime(props.tournament.endDate)
					if (checkDuplicateObject(props.tournament, validata)) {
						toastNotify('Please change anything', 'warn');
					} else {
						await getTournamentServices.updateTournament(props.tournament.id, validata);
						toastNotify('Update tournament is successfully', 'success');
						if (props.handleCloseModal) props.handleCloseModal()

					}
					if (props.setReload) props.setReload(!props.reload);
					if (props.handleCloseModal) props.handleCloseModal()
				} else {
					await getTournamentServices.createTournament(validata);
					toastNotify('Create tournament is successfully', 'success');
					if (props.handleCloseModal) props.handleCloseModal()
				}
			}
		} catch (e) {
			console.log('this is error tournament create ', e);
		}
	};

	//Edit Tournament


	return (
		<>
			{/* <TournamentContainer>
        <h1>Create Tournament</h1>
      </TournamentContainer> */}
			<ModalBlock>
				<div className='container text-center m-auto '>
					<div className={`${cx('panel')}`}>
						<header className={`${cx('createtournament_type-header')}`}>
							<div className='container flex justify-center items-center '>
								<h1 className='text-2xl font-bold text-white uppercase '>{props.title}</h1>
								<div className='ml-auto text-right hover:cursor-pointer'>
									<Close onClick={props.handleCloseModal} className='w-[48px] h-[48px]'></Close>
								</div>
							</div>
						</header>
						<div className={`${cx('createtournament-body')}`}>
							<form onSubmit={createOrUpdateTournament}>
								<div
									className={`${cx(
										'createtourament-body-adjust',
										'createtournament_row-wrapper',
										'grid grid-cols-2',
										'text-left'
									)}`}
								>
									<div className='w-full pr-4'>
										{/* <div className='my-2'>
											<p className={`${cx('createtournament_text-adjust')}`}>ID</p>
											<input className={`${cx('createtournament_input')}`} type='text' name='id' />
										</div> */}
										<div className='my-2'>
											<p className={`${cx('createtournament_text-adjust')}`}>Tên giải đấu</p>
											<input defaultValue={props.tournament ? initState.name : undefined} className={`${cx('createtournament_input')}`} type='text' name='name' />

										</div>
										<div className='mb-4 w-full'>
											<p className={`${cx('createtournament_text-adjust')}`}>Thể thức</p>
											<ButtonGroup defaultValue={initState.competitor} buttons={ButtonOptions} getValue={setCompetitor}></ButtonGroup>
										</div>
									</div>
									<div className=''>
										<div className='my-2'>
											<p className={`${cx('createtournament_text-adjust')}`}>Ngày bắt đầu</p>
											<input required defaultValue={convertToDateTime(initState.startDate)} className={`${cx('createtournament_input-date')}`} type='datetime-local' name='startdate' />
											{/* defaultValue={props.tournament ?"2022-12-01":undefined} */}
										</div>
										<div className='my-2'>
											<p className={`${cx('createtournament_text-adjust')}`}>Ngày kết thúc</p>
											<input required defaultValue={convertToDateTime(initState.endDate)} className={`${cx('createtournament_input-date')}`} type='datetime-local' name='enddate' />
										</div>
									</div>
								</div>
								<div className={`${cx('createtournament_row-wrapper')}`}>
									<div className={`${cx('position-adjust')}`}>
										<h1 className={`${cx('createtournament_text-desc')}`}>Mô tả</h1>
										<textarea
											className={`${cx('createtournament_textarea')}`}
											name='description'
											rows={6}
											cols={50}
											defaultValue={initState.description}
											placeholder='Write something ... '
										></textarea>
									</div>
								</div>

								<div className=''>
									<label className={`${cx('createtournament_type-header')}`}>Loại giải đấu</label>
									<div className={`${cx('createtournament_type-block')}`}>
										<Type defaultValue={initState.type} type={typeOptions} getValue={setTournamentType}></Type>
									</div>
								</div>

								<div className={`${cx('createTournamentButton-block')}`}>
									<button type='submit' className={`${cx('position-adjust', 'createTournamentButton-adjust')}`}>
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
