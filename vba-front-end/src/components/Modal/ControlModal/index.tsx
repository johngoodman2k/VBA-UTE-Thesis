import React, { useEffect, useState } from 'react';
import { CustomTeam, Match, Player, Process } from '../../../Services/models';
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
const cx = classNames.bind(styles);

type OffenseUpdateModalProps = {
	matchId: string | undefined;
	modalType?: 'edit' | 'update';
	homePlayers?: CustomTeam[];
	awayPlayers?: CustomTeam[];
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
	{ name: '3PT', value: '3PT' },
	{ name: '2PT', value: '2PT' },
	{ name: 'Free Throw', value: 'FT' }
];

const defenseOptions = [
	{ name: 'REBOUND', value: '3PT' },
	{ name: 'STEAL', value: '2PT' },
	{ name: 'BLOCK', value: 'FT' }
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
	const [clickedId, setClickedId] = useState('');
	const [defenseType, setDefenseType] = useState('rebound');
	const [offenseType, setOffenseType] = useState('2PT');
	const [quaterSelected, setQuaterSelected] = useState('q1');
	const [typeSelected, setTypeSelected] = useState('offensive');
	const [sideSelected, setSideSelected] = useState('home');
	const [playerSelected, setPlayerSelected] = useState('');
	const [assistantSelected, setAssistantSelected] = useState('');
	const [subInSelected, setSubInSelected] = useState('');
	const [subOffSelected, setSubOffSelected] = useState('');

	const onEdit = async (e: any) => {
		e.preventDefault();
		const type = typeSelected;
		const side = sideSelected;
		const offense = offenseType;
		const defense = defenseType;
		const quater = quaterSelected;
		const des = e.target.des.value;

		const assistant = assistantSelected
		const player = playerSelected
		const mins = e.target.mins.value;
		const subIn = subInSelected
		const subOff = subOffSelected
		const checkType = type === 'offensive' ? offense : type === 'defensive' ? defense : 'sub';
		const checkPlayer = subIn && subOff ? [subIn, subOff] : player && assistant ? [player, assistant] : player ? [player] : undefined;

		console.log("typeSelected", typeSelected)
		console.log("side", sideSelected)
		console.log("offense", offenseType)
		console.log("defense", defenseType)
		console.log("quater", quaterSelected)
		console.log("des", des)
		console.log("player", player)
		console.log("mins", mins)





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
		<>
			<ModalBlock>
				<form onSubmit={modalType === 'update' ? onUpdate : onEdit}>
					<section className='container mx-auto text-left '>
						<div className='max-w-[70%] text-7xl font-bold uppercase'>Thông tin trận đấu</div>
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
											name='des'
											defaultValue={process?.description}
											className={`${cx('__modal__input--des')}`}></input>
									</div>

									<div className={`grid grid-cols-3   text-center ${cx('__modal__main')}`}>
										<PlayerSelect
											required={true}
											title='Ghi điểm'
											sideSelected={sideSelected}
											value={playerSelected}
											onChange={(e: any) => {
												setPlayerSelected(e.target.value);
											}}
											homePlayers={homePlayers}
											awayPlayers={awayPlayers}></PlayerSelect>

										<PlayerSelect
											required={true}
											title='Hỗ trợ'
											sideSelected={sideSelected}
											value={assistantSelected}
											onChange={(e: any) => {
												setAssistantSelected(e.target.value);
											}}
											homePlayers={homePlayers}
											awayPlayers={awayPlayers}></PlayerSelect>

										<div>
											<label className={`${cx('__modal__title')}`}>
												Thời gian&nbsp;
												<div className='inline'>*</div>
											</label>
											<input type="number" id='mins' defaultValue={process?.mins} name="mins" className={`${cx('__modal__input--goal')}`}></input>
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
											name='des'
											defaultValue={process?.description}
											className={`${cx('__modal__input--des')}`}></input>
									</div>

									<div className={`grid grid-cols-2   text-center ${cx('__modal__main')}`}>
										<div>
											<PlayerSelect
												required={true}
												title='Name'
												sideSelected={sideSelected}
												value={playerSelected}
												onChange={(e: any) => {
													setPlayerSelected(e.target.value);
												}}
												homePlayers={homePlayers}
												awayPlayers={awayPlayers}></PlayerSelect>
										</div>
										<div>
											<label className={`${cx('__modal__title')}`}>
												Thời gian&nbsp;
												<div className='inline'>*</div>
											</label>
											<input id='mins' defaultValue={process?.mins} className={`${cx('__modal__input--goal')}`}></input>
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
												<a>
													<div>
														<img className='w-[5rem] h-[5rem] m-auto' src={"matchDetail?.home.teamlogo" as string}></img>
													</div>
												</a>
												<label className={`${cx('__modal__title')}`}>Đội hình ra sân</label>
												<PlayerSelect
													required={false}
													sideSelected={sideSelected}
													value={playerSelected}
													onChange={(e: any) => {
														setPlayerSelected(e.target.value);
													}}
													homePlayers={homePlayers}
													awayPlayers={awayPlayers}></PlayerSelect>
												<PlayerSelect
													required={false}
													sideSelected={sideSelected}
													value={playerSelected}
													onChange={(e: any) => {
														setPlayerSelected(e.target.value);
													}}
													homePlayers={homePlayers}
													awayPlayers={awayPlayers}></PlayerSelect>
												<PlayerSelect
													required={false}
													sideSelected={sideSelected}
													value={playerSelected}
													onChange={(e: any) => {
														setPlayerSelected(e.target.value);
													}}
													homePlayers={homePlayers}
													awayPlayers={awayPlayers}></PlayerSelect>
												<PlayerSelect
													required={false}
													sideSelected={sideSelected}
													value={playerSelected}
													onChange={(e: any) => {
														setPlayerSelected(e.target.value);
													}}
													homePlayers={homePlayers}
													awayPlayers={awayPlayers}></PlayerSelect>
												<PlayerSelect
													required={false}
													sideSelected={sideSelected}
													value={playerSelected}
													onChange={(e: any) => {
														setPlayerSelected(e.target.value);
													}}
													homePlayers={homePlayers}
													awayPlayers={awayPlayers}></PlayerSelect>
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
												<a>
													<div>

														<img className='w-[5rem] h-[5rem] m-auto' src={"matchDetail?.away?.teamlogo" as string ?? ""}></img>
													</div>
												</a>
												<label className={`${cx('__modal__title')}`}>Đội hình ra sân</label>
											</header>
											<PlayerSelect
												required={false}
												sideSelected={sideSelected}
												value={playerSelected}
												onChange={(e: any) => {
													setPlayerSelected(e.target.value);
												}}
												homePlayers={homePlayers}
												awayPlayers={awayPlayers}></PlayerSelect>
											<PlayerSelect
												required={false}
												sideSelected={sideSelected}
												value={playerSelected}
												onChange={(e: any) => {
													setPlayerSelected(e.target.value);
												}}
												homePlayers={homePlayers}
												awayPlayers={awayPlayers}></PlayerSelect>
										</div>
										<div className='col-span-2'>
											{/* <PlayerCard player={getPlayerById(playerSelected)}></PlayerCard> */}
										</div>
									</div>
								)}
							</>
						) : (
							<div>
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
											sideSelected={sideSelected}
											value={subInSelected}
											onChange={(e: any) => {
												setSubInSelected(e.target.value);
											}}
											homePlayers={homePlayers}
											awayPlayers={awayPlayers}></PlayerSelect>
										<div>
											<PlayerSelect
												required={true}
												title='Ra sân'
												sideSelected={sideSelected}
												value={subOffSelected}
												onChange={(e: any) => {
													setSubOffSelected(e.target.value);
												}}
												homePlayers={homePlayers}
												awayPlayers={awayPlayers}></PlayerSelect>
										</div>

										<div>
											<label className={`${cx('__modal__title')}`}>
												Thời gian&nbsp;
												<div className='inline'>*</div>
											</label>
											<input id='mins' defaultValue={process?.mins} className={`${cx('__modal__input--goal')}`}></input>
										</div>
									</div>
								</div>
							</div>
						)}
						<div>
							<div className={cx('__modal__action')}>
								<div className={cx('__modal__action__wrapper')}>
									<ul className={cx('__modal__action__wrapper--adjust')}>
										<li>
											<button
												id='save'
												type='submit'
												onClick={handleCloseModal}
												className={clickedId === 'save' ? cx('__editActive') : ''}>
												Save
											</button>
										</li>
										<li
											id='close'
											onClick={handleCloseModal}
											className={clickedId === 'close' ? cx('__editActive') : ''}>
											Close
										</li>
									</ul>
								</div>
							</div>
						</div>
					</section>
				</form>
			</ModalBlock>
		</>
	);
};
