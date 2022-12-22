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
import { validate } from './validate';
import { Team } from '../../../Services/models';
import { vbaContext } from '../../../Services/services';
import toastNotify from '../../../utils/toast';
import { checkDuplicateObject } from '../../../utils/checker';

const cx = classNames.bind(styles);
type createTeamProps = {
	handleCloseModal?: () => void;
	team?: Team;
	seasonId?: string
	reload?: boolean;
	setReload?: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
};

const getTeamServices = vbaContext.getTeamServices();
const getSeasonServices = vbaContext.getSeasonServices();

export const CreateTeamModal = (props: createTeamProps) => {
	const initState = {
		teamName: props.team?.teamname ?? "",
		teamLogo: props.team?.teamlogo ?? "",
		stadiumpic: props.team?.stadiumpic ?? "",
		color: props.team?.color ?? "",
		stadiumname: props.team?.stadiumname ?? "",
		description: props.team?.description ?? "",
		shortName: props.team?.shortname ?? "",
	}
	const [fileTeamLogo, setFileTeamLogo] = useState<File | undefined>()
	const [fileStadium, setFileStadium] = useState<File | undefined>()

	//Create Team
	const createTeam = async (e: any) => {
		e.preventDefault();
		if (!props.seasonId && !props.team) return;

		const teamName = e.target.teamname.value;
		const teamLogo = fileTeamLogo;
		const stadiumpic = fileStadium;
		const color = e.target.color.value
		const stadiumname = e.target.stadium.value
		const description = e.target.description.value;
		const shortName = e.target.name.value

		const validata = validate(teamName, teamLogo, stadiumpic, color, stadiumname, description, shortName);
		try {
			if (validata) {
				const formData = new FormData()
				formData.append("teamName", validata.teamName)
				formData.append("teamLogo", validata.teamLogo)
				formData.append("stadiumpic", validata.stadiumpic)
				formData.append("color", validata.color)
				formData.append("stadiumname", validata.stadiumname)
				formData.append("description", validata.description)
				formData.append("shortName", validata.shortName)

				if (props.team && props.team.id) {

					if (checkDuplicateObject(props.team, validata)) {
						toastNotify('Please change anything', 'warn');
					} else {
						await getTeamServices.updateTeam(props.team.id, formData as Team);
						toastNotify('Update team is successfully', 'success');
					}

				} else if (props.seasonId) {
					formData.append("seasonId", props.seasonId)

					await getSeasonServices.createTeamAndAddTeamToSeason(formData as Team, props.seasonId);
					toastNotify('Create team is successfully', 'success');

				}
				if (props.setReload) props.setReload(!props.reload);
				if (props.handleCloseModal) props.handleCloseModal()
			}
		} catch (e) {
			toastNotify("Fail to create team", "error");
		}
	};

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
								<h1 className='text-2xl font-bold text-white uppercase '>{props.title}</h1>
								<div className='ml-auto text-right hover:cursor-pointer'>
									<Close onClick={props.handleCloseModal} className='w-[48px] h-[48px]'></Close>
								</div>
							</div>
						</header>
						<div className={`${cx('createTeam-body')}`}>
							<form onSubmit={createTeam} encType="multipart/form-data">
								<div
									className={`${cx(
										'createTeam-body-adjust',
										'createTeam_row-wrapper',
										'grid grid-cols-2',
										'text-left'
									)}`}>
									<div className='w-2/5'>
										<div className='my-2'>
											<p className={`${cx('createTeam_text-adjust')}`}>Tên đội</p>
											<input id={props.title + "teamname"} defaultValue={props.team ? initState.teamName : undefined} className={`${cx('createTeam_input')}`} type='text' name='teamname' />
										</div>
										<PictureChoosing defaultValue={props.team ? initState.teamLogo as string : undefined} getFile={setFileTeamLogo} header={props.team ? "Logo Đội" : "Logo Đội"}></PictureChoosing>
									</div>

									<div className='w-2/5'>
										<div className='my-2'>
											<p className={`${cx('createTeam_text-adjust')}`}>Tên sân</p>
											<input id={props.title + "stadium"} defaultValue={props.team ? initState.stadiumname : undefined} className={`${cx('createTeam_input')}`} type='text' name='stadium' />
										</div>
										<PictureChoosing defaultValue={props.team ? initState.stadiumpic as string : undefined} getFile={setFileStadium} header={props.team ? "Hình sân vận động" : "Hình sân vận động"}></PictureChoosing>
									</div>
								</div>
								<div className={`${cx('createTeam_row-wrapper', 'grid grid-cols-2')}`}>
									<div className='w-3/4'>
										<div className='mb-4'>
											<p className={`${cx('createTeam_text-adjust', 'text-left')}`}>Màu chủ đạo</p>
											<div className="block w-full">
												<input defaultValue={props.team ? initState.color : undefined} id={props.title + "teamcolor"} className={`${cx('createTeam_input', 'createTeam_input--color')}`} type='color' name='color' />
											</div>
										</div>
										<div className={`${cx('createTeam_competitortype-block')}`}>
											<p className={`${cx('createTeam_text-adjust', 'text-left')}`}>Tên viết tắt</p>
											<input id={props.title + "shortname"} defaultValue={props.team ? initState.shortName : undefined} className={`${cx('createTeam_input')}`} type='text' name='name' />
										</div>
									</div>

									<div className={`${cx('position-adjust')}`}>
										<h1 className={`${cx('createTeam_text-desc')}`}>Mô tả</h1>
										<textarea
											defaultValue={props.team ? initState.description : undefined}
											id={props.title + "description"}
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
