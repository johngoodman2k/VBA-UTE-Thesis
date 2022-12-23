import React, { useEffect, useState } from 'react';
import { CustomTeam, Match, Player, Process, Team } from '../../../Services/models';
import { vbaContext } from '../../../Services/services';
import { EditorSelect } from '../../Utils/EditorSelect';
import { ModalBlock } from '../ModalBlock';
import styles from './controlModal.module.scss';
import classNames from 'classnames/bind';
import { PlayerSelect } from '../../Utils/PlayerSelect';
import { id } from 'date-fns/locale';
import process from 'process';
import { MatchDetailPage } from '../../../pages/Client/MatchDetailPage';
import { PlayerCard } from '../../Player/PlayerCard';
import { validateOffensive, validateDefensive, validateSub, validateLineUp } from './validate';
import toastNotify from '../../../utils/toast';
const cx = classNames.bind(styles);

type OffenseUpdateModalProps = {
	matchId: string | undefined;
	modalType?: 'edit' | 'update';
	homePlayers?: Player[];
	awayPlayers?: Player[];
	process?: Process;
	matchDetail?: Match | undefined;
	handleCloseModal?: () => void;
};
// type ProcessProps = {
// 	id?: string;
// 	option: string;
// 	quater: string;
// 	player: Player[];
// 	type: string;
// 	side: string;
// 	description: string;
// 	mins: string;
// };

const typeOptions = [
	{ name: 'Tấn công', value: 'offensive' },
	{ name: 'Phòng thủ', value: 'defensive' },
	{ name: 'Thay người', value: 'sub' },
	{
		name: 'Đội hình',
		value: 'lineup'
	}
];

const sideOptions = [
	{ name: 'Đội nhà', value: 'home' },
	{ name: 'Đội khách', value: 'away' }
];

const scoreOptions = [
	{ name: '3 ĐIỂM', value: '3PT' },
	{ name: '2 ĐIỂM', value: '2PT' },
	{ name: 'NÉM PHẠT', value: 'FT' }
];

const defenseOptions = [
	{ name: 'BẮT BÓNG', value: 'RB' },
	{ name: 'CƯỚP BÓNG', value: 'STL' },
	{ name: 'CHẶN BÓNG', value: 'BLK' }
];

const quaterOptions = [
	{ name: 'Q1', value: 'q1' },
	{ name: 'Q2', value: 'q2' },
	{ name: 'Q3', value: 'q3' },
	{ name: 'Q4', value: 'q4' }
];
const teamServices = vbaContext.getTeamServices();
const matchServices = vbaContext.getMatchServices();
const playerServices = vbaContext.getPlayerServices();
export const ControlModal = ({
	matchId,
	modalType = 'edit',
	homePlayers,
	awayPlayers,
	process,
	matchDetail,
	handleCloseModal
}: OffenseUpdateModalProps) => {

	const [typeSelected, setTypeSelected] = useState('offensive');
	const [quaterSelected, setQuaterSelected] = useState('q1');
	const [sideSelected, setSideSelected] = useState('home');

	const [defenseType, setDefenseType] = useState('rebound');
	const [offenseType, setOffenseType] = useState('2PT');

	const [playerOneSelected, setPlayerOneSelected] = useState('');
	const [playerTwoSelected, setPlayerTwoSelected] = useState('')

	const [playerSelected, setPlayerSelected] = useState('');

	const [assistantSelected, setAssistantSelected] = useState('');
	const [subInSelected, setSubInSelected] = useState('');
	const [subOffSelected, setSubOffSelected] = useState('');

	const [homeLineUp, setHomLineUp] = useState<[string, string, string, string, string]>(["", "", "", "", ""])
	const [awayLineUp, setAwayLineUp] = useState<[string, string, string, string, string]>(["", "", "", "", ""])

	// const handleChangeHomeLineUp = () =>{
	// 	setHomLineUp()
	// }

	const onEdit = async (e: any) => {
		e.preventDefault();


		// console.log("typeSelected", typeSelected)
		// console.log("side", sideSelected)
		// console.log("offense", offenseType)
		// // console.log("defense", defenseType)
		// console.log("quater", quaterSelected)
		// console.log("des", description)
		// console.log("mins", mins)
		console.log(playerOneSelected)

		if (typeSelected === "offensive") {
			const description = e.target.des.value;
			const mins = e.target.mins.value;
			const validata = validateOffensive(typeSelected, sideSelected, offenseType, quaterSelected, description, playerOneSelected, playerTwoSelected, mins)
			if (validata) {
				console.log(validata)

				try {
					await matchServices.addProcessToMatch({ match: matchId, ...validata } as Process);
					if (handleCloseModal) handleCloseModal()
				} catch (err) {
					toastNotify("Tạo chi tiết trận đấu thất bại", "error")
				}
			}
		} else if (typeSelected === "defensive") {
			const description = e.target.des.value;
			const mins = e.target.mins.value;
			const validata = validateDefensive(typeSelected, sideSelected, defenseType, quaterSelected, description, playerOneSelected, mins)
			if (validata) {
				console.log(validata)

				try {
					await matchServices.addProcessToMatch({ match: matchId, ...validata } as Process);
					if (handleCloseModal) handleCloseModal()
				} catch (err) {
					toastNotify("Tạo chi tiết trận đấu thất bại", "error")
				}
			}
		} else if (typeSelected === "sub") {
			const mins = e.target.mins.value;
			const validata = validateSub(typeSelected, sideSelected, quaterSelected, playerOneSelected, playerTwoSelected, mins)
			if (validata) {
				console.log(validata)

				try {
					await matchServices.addProcessToMatch({ match: matchId, ...validata } as Process);
					if (handleCloseModal) handleCloseModal()
				} catch (err) {
					toastNotify("Tạo chi tiết trận đấu thất bại", "error")
				}
			}
		} else if (typeSelected === "lineup") {
			if (sideSelected === "home") {
				const validataHomeLineUp = validateLineUp(homeLineUp)
				// const validataHomeLineUp = validateLineUp(homeLineUp)
				console.log(validataHomeLineUp)

				if (validataHomeLineUp && matchId) {
					const newHomeLineUp = validataHomeLineUp.teamLineUp.map((t) => { return { id: t } })
					try {
						await matchServices.updateMatch(matchId, { homeLineUp: newHomeLineUp } as Match);
						if (handleCloseModal) handleCloseModal()
					} catch (err) {
						toastNotify("Cập nhật đội hình thất bại", "error")
					}
				}
			} else {
				const validataAwayLineUp = validateLineUp(awayLineUp)
				// const validataHomeLineUp = validateLineUp(homeLineUp)

				if(validataAwayLineUp && matchId){
					const newAwayLineUp = validataAwayLineUp.teamLineUp.map((t)=> {return {id: t}})
					console.log(newAwayLineUp)
					try{
						await matchServices.updateMatch(matchId, {awayLineUp: newAwayLineUp} as Match );
						if(handleCloseModal) handleCloseModal()
					}catch(err){
						toastNotify("Cập nhật đội hình thất bại","error")
					}
				}
			}

		}







		// const process = {
		// 	type: type,
		// 	side: side,
		// 	option: checkType,
		// 	quater: quater,
		// 	description: des,
		// 	mins: mins,
		// 	player: checkPlayer ? checkPlayer : new Array<Player>()
		// };

		// console.log('148', process);
		// const res3 = await matchServices.addProcessToMatch(matchId, [process]);

		// setReload(!reload);
	};
	// useEffect(() => {
	// 	(async () => {
	// 		if (modalType === 'update' && process) {
	// 			if (process.type === 'offensive') {
	// 				setTypeSelected(process.type);
	// 				setOffenseType(process.option ?? "");
	// 				setPlayerSelected(process.playerAttack?? "");
	// 				setAssistantSelected(process.playerSupport?? "");
	// 			} else if (process.type === 'defensive') {
	// 				setTypeSelected(process.type);
	// 				setDefenseType(process.option ?? "");
	// 				setPlayerSelected(process.playerAttack ?? "");
	// 			} else if (process.type === 'sub') {
	// 				setTypeSelected(process.type);

	// 				setSubInSelected(process.playerAttack ?? "");
	// 				setSubOffSelected(process.playerSupport ?? "");
	// 			}
	// 			setSideSelected(process.side ?? "");
	// 			setQuaterSelected(process.quater ?? "");
	// 		}
	// 	})();
	// }, [process]);

	const onUpdate = async (e: any) => {
		e.preventDefault();
		const type = typeSelected;
		const side = sideSelected;
		const offense = offenseType;
		const defense = defenseType;
		const quater = quaterSelected;
		const des = typeSelected !== 'sub' ? e.target.des.value : '';
		const assistant = "getPlayerById(assistantSelected);"
		const player = "getPlayerById(playerSelected);"
		const mins = e.target.mins.value;
		const subIn = "getPlayerById(subInSelected);"
		const subOff = "getPlayerById(subOffSelected);"

		const checkType = type === 'offensive' ? offense : type === 'defensive' ? defense : 'sub';

		const checkPlayer =
			type === 'sub' && subIn && subOff
				? [subIn, subOff]
				: type === 'offensive' && player && assistant
					? [player, assistant]
					: player
						? [player]
						: undefined;

		const updatedProcess = {
			id: process?.id,
			type: type,
			side: side,
			option: checkType,
			quater: quater,
			description: des,
			mins: mins,
			player: checkPlayer ? checkPlayer : new Array<Player>()
		};

		const res4 = await matchServices.updateProcess(matchId, updatedProcess);
	};

	return (
		<ModalBlock>
			<form onSubmit={modalType === 'update' ? onUpdate : onEdit}>
				<section className='container mx-auto text-left '>
					<div className='max-w-[100%] text-7xl font-bold uppercase'>Chi tiết trận đấu</div>
					<EditorSelect
						title='Chọn loại'
						value={typeSelected}
						onChange={(e: any) => {
							setTypeSelected(e.target.value);
						}}
						options={typeOptions}></EditorSelect>
					{typeSelected === 'offensive' ? (
						<div>
							<EditorSelect
								title='Chọn bên'
								value={sideSelected}
								onChange={(e: any) => {
									setSideSelected(e.target.value);
								}}
								options={sideOptions}></EditorSelect>

							<div>
								<EditorSelect
									title='Loại tấn công'
									value={offenseType}
									onChange={(e: any) => {
										setOffenseType(e.target.value);
									}}
									options={scoreOptions}></EditorSelect>

								<EditorSelect
									title='Quater'
									value={quaterSelected}
									onChange={(e: any) => {
										setQuaterSelected(e.target.value);
									}}
									options={quaterOptions}></EditorSelect>

								<div>
									<label className={`${cx('__modal__title')}`}>
										Mô tả&nbsp;
										<div className='inline'>*</div>
									</label>
									<input
										id="offensive_des"
										name='des'
										defaultValue={process?.description}
										className={`${cx('__modal__input--des')}`}></input>
								</div>

								<div className={`grid grid-cols-3   text-center ${cx('__modal__main')}`}>

									<PlayerSelect
										required={true}
										title='Ghi điểm'
										value={playerOneSelected}
										onChange={(e: any) => {
											setPlayerOneSelected(e.target.value);
										}}
										players={sideSelected === "home" ? homePlayers : awayPlayers}></PlayerSelect>

									<PlayerSelect
										required={true}
										title='Hỗ trợ'
										value={playerTwoSelected}
										onChange={(e: any) => {
											setPlayerTwoSelected(e.target.value);
										}}
										players={sideSelected === "home" ? homePlayers : awayPlayers}></PlayerSelect>

									<div>
										<label className={`${cx('__modal__title')}`}>
											Thời gian&nbsp;
											<div className='inline'>*</div>
										</label>
										<input type="number" max="12" min="0" step={0.1} id='offensive_mins' defaultValue={process?.mins} name="mins" className={`${cx('__modal__input--goal')}`}></input>
									</div>
								</div>
							</div>
						</div>
					) : typeSelected === 'defensive' ? (
						<div>
							<EditorSelect
								title='Chọn bên'
								value={sideSelected}
								onChange={(e: any) => {
									setSideSelected(e.target.value);
								}}
								options={sideOptions}></EditorSelect>
							<div>
								<EditorSelect
									title='Loại phòng thủ'
									value={defenseType}
									onChange={(e: any) => {
										setDefenseType(e.target.value);
									}}
									options={defenseOptions}></EditorSelect>

								<EditorSelect
									title='Quater'
									value={quaterSelected}
									onChange={(e: any) => {
										setQuaterSelected(e.target.value);
									}}
									options={quaterOptions}></EditorSelect>

								<div>
									<label className={`${cx('__modal__title')}`}>
										Mô tả&nbsp;
										<div className='inline'>*</div>
									</label>
									<input
										name='defensive_des'
										defaultValue={process?.description}
										className={`${cx('__modal__input--des')}`}></input>
								</div>

								<div className={`grid grid-cols-2   text-center ${cx('__modal__main')}`}>
									<div>
										<PlayerSelect
											required={true}
											title='Cầu thủ phòng thủ'
											value={playerOneSelected}
											onChange={(e: any) => {
												setPlayerOneSelected(e.target.value);
											}}
											players={sideSelected === "home" ? homePlayers : awayPlayers}></PlayerSelect>
									</div>
									<div>
										<label className={`${cx('__modal__title')}`}>
											Thời gian&nbsp;
											<div className='inline'>*</div>
										</label>
										<input type="number" max="12" min="0" step={0.1} id='defensive_mins' name="mins" defaultValue={process?.mins} className={`${cx('__modal__input--goal')}`}></input>
									</div>
								</div>
							</div>
						</div>
					) : typeSelected === 'lineup' ? (
						<>
							<EditorSelect
								title='Chọn bên'
								value={sideSelected}
								onChange={(e: any) => {
									setSideSelected(e.target.value);
								}}
								options={sideOptions}></EditorSelect>
							{sideSelected === 'home' ? (
								<div className='grid grid-cols-3 pt-4'>
									<div className='px-4'>
										<header className={`${cx('__header')}`}>
											<div>
												{matchDetail && matchDetail.home && matchDetail.home.teamlogo &&
													<img className='w-[5rem] h-[5rem] m-auto' src={matchDetail.home.teamlogo as string} alt={matchDetail.home.teamname ?? "TeamLogo"}></img>
												}
											</div>
											<label className={`${cx('__modal__title')}`}>Đội hình ra sân</label>

											<PlayerSelect
												required={false}
												value={homeLineUp[0]}
												onChange={(e: any) => {
													setHomLineUp([e.target.value, homeLineUp[1], homeLineUp[2], homeLineUp[3], homeLineUp[4]]);
												}}
												players={homePlayers}></PlayerSelect>
											<PlayerSelect
												required={false}
												value={homeLineUp[1]}
												onChange={(e: any) => {
													setHomLineUp([homeLineUp[0], e.target.value, homeLineUp[2], homeLineUp[3], homeLineUp[4]]);
												}}
												players={homePlayers}></PlayerSelect>
											<PlayerSelect
												required={false}
												value={homeLineUp[2]}
												onChange={(e: any) => {
													setHomLineUp([homeLineUp[0], homeLineUp[1], e.target.value, homeLineUp[3], homeLineUp[4]]);
												}}
												players={homePlayers}></PlayerSelect>
											<PlayerSelect
												required={false}
												value={homeLineUp[3]}
												onChange={(e: any) => {
													setHomLineUp([homeLineUp[0], homeLineUp[1], homeLineUp[2], e.target.value, homeLineUp[4]]);
												}}
												players={homePlayers}></PlayerSelect>
											<PlayerSelect
												required={false}
												value={homeLineUp[4]}
												onChange={(e: any) => {
													setHomLineUp([homeLineUp[0], homeLineUp[1], homeLineUp[2], homeLineUp[3], e.target.value]);
												}}
												players={homePlayers}></PlayerSelect>
										</header>
										<div>
											<ul className='list-none'></ul>
										</div>
									</div>
									<div>{/* <PlayerCard player={playerInfo}></PlayerCard> */}</div>
								</div>
							) : (
								<div className='grid grid-cols-3 pt-4'>
									<div className='px-4'>
										<header className={`${cx('__header')}`}>

											<div>
												{matchDetail && matchDetail.away && matchDetail.away.teamlogo &&
													<img className='w-[5rem] h-[5rem] m-auto' src={matchDetail.away.teamlogo as string} alt={matchDetail.away.teamname ?? "TeamLogo"}></img>
												}
											</div>

											<label className={`${cx('__modal__title')}`}>Đội hình ra sân</label>
										</header>
										<PlayerSelect
											required={false}
											value={awayLineUp[0]}
											onChange={(e: any) => {
												setAwayLineUp([e.target.value, awayLineUp[1], awayLineUp[2], awayLineUp[3], awayLineUp[4]]);
											}}
											players={awayPlayers}></PlayerSelect>
										{/* <img className='w-[5rem] h-[5rem]'></img> */}
										<PlayerSelect
											required={false}
											value={awayLineUp[1]}
											onChange={(e: any) => {
												setAwayLineUp([awayLineUp[0], e.target.value, awayLineUp[2], awayLineUp[3], awayLineUp[4]]);
											}}
											players={awayPlayers}></PlayerSelect>
										<PlayerSelect
											required={false}
											value={awayLineUp[2]}
											onChange={(e: any) => {
												setAwayLineUp([awayLineUp[0], awayLineUp[1], e.target.value, awayLineUp[3], awayLineUp[4]]);
											}}
											players={awayPlayers}></PlayerSelect>
										<PlayerSelect
											required={false}
											value={awayLineUp[3]}
											onChange={(e: any) => {
												setAwayLineUp([awayLineUp[0], awayLineUp[1], awayLineUp[2], e.target.value, awayLineUp[4]]);
											}}
											players={awayPlayers}></PlayerSelect>
										<PlayerSelect
											required={false}
											value={awayLineUp[4]}
											onChange={(e: any) => {
												setAwayLineUp([awayLineUp[0], awayLineUp[1], awayLineUp[2], awayLineUp[3], e.target.value]);
											}}
											players={awayPlayers}></PlayerSelect>
									</div>
									<div className='col-span-2'>
										{/* <PlayerCard player={getPlayerById(playerSelected)}></PlayerCard> */}
									</div>
								</div>
							)}
						</>
					) : (

						<div>
							<EditorSelect
								title='Chọn bên'
								value={sideSelected}
								onChange={(e: any) => {
									setSideSelected(e.target.value);
								}}
								options={sideOptions}></EditorSelect>
							<EditorSelect
								title='Quater'
								value={quaterSelected}
								onChange={(e: any) => {
									setQuaterSelected(e.target.value);
								}}
								options={quaterOptions}></EditorSelect>
							<div className={`grid grid-cols-3   text-center ${cx('__modal__main')}`}>
								<PlayerSelect
									required={true}
									title='Vào sân'
									value={playerOneSelected}
									onChange={(e: any) => {
										setPlayerOneSelected(e.target.value);
									}}
									players={sideSelected === "home" ? homePlayers : awayPlayers}></PlayerSelect>
								<div>
									<PlayerSelect
										required={true}
										title='Ra sân'
										value={playerTwoSelected}
										onChange={(e: any) => {
											setPlayerTwoSelected(e.target.value);
										}}
										players={sideSelected === "home" ? homePlayers : awayPlayers}></PlayerSelect>
								</div>
								<div>
									<label className={`${cx('__modal__title')}`}>
										Thời gian&nbsp;
										<div className='inline'>*</div>
									</label>
									<input type="number" max="12" min="0" step={0.1} id='sub_mins' name='mins' defaultValue={process?.mins} className={`${cx('__modal__input--goal')}`}></input>
								</div>
							</div>
						</div>

					)}
					<div className="flex justify-end gap-4">
						<button
							id='modalVBA_save'
							type='submit'
							className="text-[#ec8521] font-bold text-2xl">
							Save
						</button>
						<button
							type="button"
							id='modalVBA_close'
							onClick={handleCloseModal}
							className="text-[#ec8521] font-bold text-2xl">
							Close
						</button>

					</div>
				</section>
			</form>
		</ModalBlock>

	);
};
