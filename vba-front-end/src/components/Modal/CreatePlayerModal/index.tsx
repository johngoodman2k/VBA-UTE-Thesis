import React, { useState, useEffect } from 'react';
import styles from './modalAddTeam.module.scss';
import classNames from 'classnames/bind';
import { ModalBlock } from '../ModalBlock';
import { vbaContext } from '../../../Services/services';
import { ReactComponent as Close } from '../../../assets/svg/close-com.svg';
import validate from './validate';
import toastNotify from '../../../utils/toast';
import { Player } from '../../../Services/models';
import { checkDuplicateObject } from '../../../utils/checker';
import ReactFlagsSelect from "react-flags-select";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const cx = classNames.bind(styles);
const teamServices = vbaContext.getTeamServices();
const playerServices = vbaContext.getPlayerServices();

type createPlayerProps = {
	title: string;
	handleCloseModal?: () => void;
	id?: string;
	player?: Player;
	setReload?: React.Dispatch<React.SetStateAction<boolean>>;
	reload?: boolean;
};
export const CreatePlayerModal = (props: createPlayerProps) => {
	const [fileDataURL, setFileDataURL] = useState<any>(null);
	const [file, setFile] = useState<File | undefined>();
	const [countrySelected, setCountrySelected] = useState("");


	const onChangeImage = (e: any) => {
		const file = e.target.files[0];
		if (!file.type.match(imageMimeType)) return;
		setFile(file);
	};
	useEffect(() => {
		let isCancel = false;
		let fileReader = new FileReader();

		if (file) {
			fileReader.onload = (e: ProgressEvent<FileReader> | null) => {
				if (e && e.target) {
					const { result } = e.target;
					if (e.target.result && !isCancel) {
						setFileDataURL(result);
					}
				}
			};
			fileReader.readAsDataURL(file);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [file]);


	const handleCreateOrEditPlayer = async (e: any) => {
		e.preventDefault();
		console.log(96, props.id)

		const firstName = e.target.firstname.value
		const lastName = e.target.lastname.value
		const dateOfBirth = e.target.dateofbirth.value
		const shirtNumber = e.target.shirtnumber.value
		const country = countrySelected
		const weight = e.target.weight.value
		const height = e.target.height.value
		const image = file
		const validata = validate(firstName, lastName, dateOfBirth, shirtNumber, country, weight, height, image)


		try {
			if (validata) {
				const formData = new FormData()
				formData.append("firstName", validata.firstName)
				formData.append("lastName", validata.lastName)
				formData.append("dateOfBirth", validata.dateOfBirth)
				formData.append("shirtNumber", validata.shirtNumber)
				formData.append("country", validata.country)
				formData.append("weight", validata.weight)
				formData.append("height", validata.height)
				formData.append("image", validata.image)
				if (props.player && props.player.id) {
					if (checkDuplicateObject(props.player, validata)) {
						toastNotify('Please change anything', 'warn');
					} else {
						const res = await playerServices.updatePlayer(props.player.id, formData as Player);
						toastNotify("Team have been updated", "success")
					}

				} else if (props.id) {
					formData.append("teamId", props.id)
					const res = await teamServices.addPlayerToTeam(formData as Player);
					toastNotify("Create player and add to team success", "success")

				}
				if (props.setReload)
					props.setReload(!props.reload)
				if (props.handleCloseModal) props.handleCloseModal()
			}
		} catch (e) {
			toastNotify("Create player and add to team failed", "error")
		}
	}

	return (
		<ModalBlock>
			<div className={cx('ModalTitle')}>
				{props.title}
				<div className='ml-auto text-right hover:cursor-pointer'>
					<Close onClick={props.handleCloseModal} className='w-[48px] h-[48px]'></Close>
				</div>
			</div>

			<form onSubmit={handleCreateOrEditPlayer}>
				<div className='flex flex-row'>
					<div className='basis-3/6 flex flex-wrap'>
						<div className='basis-1/2'>
							<div className={cx('TitleTop')}>First Name</div>
							<input id={props.title + "_firstname"} name="firstname" type='text' className={cx('Input', 'Input__Top')}></input>
						</div>

						<div className='basis-1/2'>
							<div className={cx('TitleTop')}>Last Name</div>
							<input id={props.title + "_lastname"} name="lastname" type='text' className={cx('Input', 'Input__Top')}></input>
						</div>

						<div className='basis-1/2 mt-1.5'>
							<div className={cx('TitleTop')}>Date of Birth</div>
							<input id={props.title + "_dayofbirth"} name="dateofbirth" type='date' className={cx('Input', 'Input__Top')}></input>
						</div>

						<div className='basis-1/2 mt-1.5'>
							<div className={cx('TitleTop')}>Shirt Number</div>
							<input id={props.title + "_shirtnumber"} name="shirtnumber" type='number' min="0" max="999" className={cx('Input', 'Input__Top')}></input>
						</div>
						<div className='basis-full mt-3'>
							{/* <div className={cx('TitleTop')}>Country</div>
							<input id={props.title+"_country"}  name="country" type='text' className={cx('Input', 'Input__Top', 'Input__Top--oneobject')}></input> */}
							<div className="bg-white color text-black rounded w-[90%] mx-auto">
								<ReactFlagsSelect
									className="pb-0"
									selected={countrySelected}
									onSelect={(code) => setCountrySelected(code)}
								/>
							</div>

						</div>
					</div>

					<div className='basis-1/6 flex flex-col'>
						<div className='h-auto w-full'>
							<div className={cx('TitleTop')}>Weight(Kg)</div>
							<input id={props.title + "_weight"} name="weight" type="number" min="20" max="200" className={cx('Input', 'Input__Top', 'Input__Top--oneobject')}></input>
						</div>
						<div className='h-auto w-full mt-1.5'>
							<div className={cx('TitleTop')}>Height(m)</div>
							<input id={props.title + "_height"} name="height" type='number' min="1" max="3" step="0.001" className={cx('Input', 'Input__Top', 'Input__Top--oneobject')}></input>
						</div>
						<div className='h-auto w-full mt-1.5'>
							<div className={cx('TitleTop')}>Position</div>
							<input type='text' className={cx('Input', 'Input__Top', 'Input__Top--oneobject')}></input>
						</div>
					</div>

					<div className='basis-2/6 flex flex-col '>
						<div className={cx('TitleTop')}>Image</div>

						<div className='flex flex-col relative mt-4 h-full w-full rounded-md'>
							<div className='w-full h-full bg-white rounded-md'>
								<div className='w-full h-[162px]'>
									<img
										src={
											fileDataURL !== null ? fileDataURL : props.player?.image ? props.player?.image
												: 'https://th.bing.com/th/id/OIP.uQ03KuU1Jb_7HNs_We8__wAAAA?pid=ImgDet&rs=1'

										}
										alt='playerImage'
										className={cx('Input__Preview__Image')}></img>
								</div>
							</div>
							<div className={cx('ImageUploadWrap')}>
								<label className={cx('Input__ButtonLabel')} htmlFor={props.id ?? "upload_player"}>
									Upload image
								</label>
								<input
									id={props.id ?? "upload_player"}
									type='file'
									accept='image/*'
									onChange={onChangeImage}
									className={cx('Input', 'Input__Image')}></input>
								<div className={cx('Input__Preview', 'Input__Preview__TextBlock')}></div>
							</div>
						</div>
					</div>
				</div>
				<div className={cx('ModalFooter')}>
					<button type="submit" className={cx('ModalFooter__ButtonBlock')}>Submit</button>
				</div>
			</form>

		</ModalBlock>
	);
};
