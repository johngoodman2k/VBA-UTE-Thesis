import React, { useEffect, useState } from 'react';
import { Player, Process } from '../../../Services/models';
import { vbaContext } from '../../../Services/services';
import { EditorSelect } from '../../Utils/EditorSelect';
import { ModalBlock } from '../ModalBlock';
import styles from './controlModal.module.scss';
import classNames from 'classnames/bind';
import { PlayerSelect } from '../../Utils/PlayerSelect';
import { id } from 'date-fns/locale';
import process from 'process';
const cx = classNames.bind(styles);

type OffenseUpdateModalProps = {
	matchId: string | undefined;
	modalType?: 'edit' | 'update';
	homePlayers: Player[];
	awayPlayers: Player[];
	process?: Process;

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
	{ name: 'Offensive', value: 'offensive' },
	{ name: 'Defensive', value: 'defensive' },
	{ name: 'Sub', value: 'sub' },
	{
		name: 'LineUp',
		value: 'lineup'
	}
];

const sideOptions = [
	{ name: 'Home', value: 'home' },
	{ name: 'Away', value: 'away' }
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

	const getPlayerById = (id: string): Player | undefined => {
		let player = homePlayers.find((p: any) => p.id === id);
		if (!player) player = awayPlayers.find((p: any) => p.id === id);
		return player;
	};

	const getPlayerBySide = (side: string) => {
		if (side === 'home') return homePlayers[0].id;
		else {
			return awayPlayers[0].id;
		}
	};

	const onEdit = async (e: any) => {
		e.preventDefault();
		const type = typeSelected;
		const side = sideSelected;

		const offense = offenseType;
		const defense = defenseType;
		const quater = quaterSelected;
		const des = typeSelected !== 'sub' ? e.target.des.value : '';
		const assistant =
			assistantSelected !== ''
				? getPlayerById(assistantSelected)
				: getPlayerById(getPlayerBySide(side));
		console.log('128', playerSelected);
		const player =
			playerSelected !== ''
				? getPlayerById(playerSelected)
				: getPlayerById(getPlayerBySide(side));

		const mins = e.target.mins.value;
		const subIn =
			subInSelected !== ''
				? getPlayerById(subInSelected)
				: getPlayerById(getPlayerBySide(side));
		const subOff =
			subOffSelected !== ''
				? getPlayerById(subOffSelected)
				: getPlayerById(getPlayerBySide(side));

		const checkType =
			type === 'offensive' ? offense : type === 'defensive' ? defense : 'sub';

		console.log('129', player);

		const checkPlayer =
			subIn && subOff
				? [subIn, subOff]
				: player && assistant
				? [player, assistant]
				: player
				? [player]
				: undefined;
		console.log('137', checkPlayer);

		const process = {
			type: type,
			side: side,
			option: checkType,
			quater: quater,
			description: des,
			mins: mins,
			player: checkPlayer ? checkPlayer : new Array<Player>()
		};

		console.log('148', process);
		const res3 = await matchServices.addProcessToMatch(matchId, [process]);

		// setReload(!reload);
	};
	useEffect(() => {
		(async () => {
			if (modalType === 'update' && process) {
				if (process.type === 'offensive') {
					setTypeSelected(process.type);
					setOffenseType(process.option);
					setPlayerSelected(process.player[0].id);
					setAssistantSelected(process.player[1].id);
				} else if (process.type === 'defensive') {
					setTypeSelected(process.type);
					setDefenseType(process.option);
					setPlayerSelected(process.player[0].id);
				} else if (process.type === 'sub') {
					setTypeSelected(process.type);

					setSubInSelected(process.player[0].id);
					setSubOffSelected(process.player[1].id);
				}
				setSideSelected(process.side);
				setQuaterSelected(process.quater);
			}
		})();
	}, [process]);

	const onUpdate = async (e: any) => {
		e.preventDefault();
		const type = typeSelected;
		const side = sideSelected;
		const offense = offenseType;
		const defense = defenseType;
		const quater = quaterSelected;
		const des = typeSelected !== 'sub' ? e.target.des.value : '';
		const assistant = getPlayerById(assistantSelected);
		const player = getPlayerById(playerSelected);

		const mins = e.target.mins.value;
		const subIn = getPlayerById(subInSelected);
		const subOff = getPlayerById(subOffSelected);

		const checkType =
			type === 'offensive' ? offense : type === 'defensive' ? defense : 'sub';

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
						<div className='max-w-[70%] text-7xl font-bold uppercase'>
							match detail
						</div>
						<EditorSelect
							title='Type'
							value={typeSelected}
							onChange={(e: any) => {
								setTypeSelected(e.target.value);
							}}
							options={typeOptions}></EditorSelect>
						{typeSelected === 'offensive' ? (
							<div>
								<EditorSelect
									title='Side'
									value={sideSelected}
									onChange={(e: any) => {
										setSideSelected(e.target.value);
									}}
									options={sideOptions}></EditorSelect>

								<div>
									<EditorSelect
										title='Offense options'
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
											Description&nbsp;
											<div className='inline'>*</div>
										</label>
										<input
											name='des'
											defaultValue={process?.description}
											className={`${cx('__modal__input--des')}`}></input>
									</div>

									<div
										className={`grid grid-cols-3   text-center ${cx(
											'__modal__main'
										)}`}>
										<PlayerSelect
											title='Scorer'
											sideSelected={sideSelected}
											value={playerSelected}
											onChange={(e: any) => {
												setPlayerSelected(e.target.value);
											}}
											homePlayers={homePlayers}
											awayPlayers={awayPlayers}></PlayerSelect>

										<PlayerSelect
											title='Assistant'
											sideSelected={sideSelected}
											value={assistantSelected}
											onChange={(e: any) => {
												setAssistantSelected(e.target.value);
											}}
											homePlayers={homePlayers}
											awayPlayers={awayPlayers}></PlayerSelect>

										<div>
											<label className={`${cx('__modal__title')}`}>
												Mins&nbsp;
												<div className='inline'>*</div>
											</label>
											<input
												id='mins'
												defaultValue={process?.mins}
												className={`${cx('__modal__input--goal')}`}></input>
										</div>
									</div>
								</div>
							</div>
						) : typeSelected === 'defensive' ? (
							<div>
								<EditorSelect
									title='Side'
									value={sideSelected}
									onChange={(e: any) => {
										setSideSelected(e.target.value);
									}}
									options={sideOptions}></EditorSelect>

								<div>
									<EditorSelect
										title='Defense options'
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
											Description&nbsp;
											<div className='inline'>*</div>
										</label>
										<input
											name='des'
											defaultValue={process?.description}
											className={`${cx('__modal__input--des')}`}></input>
									</div>

									<div
										className={`grid grid-cols-2   text-center ${cx(
											'__modal__main'
										)}`}>
										<div>
											<PlayerSelect
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
												Mins&nbsp;
												<div className='inline'>*</div>
											</label>
											<input
												id='mins'
												defaultValue={process?.mins}
												className={`${cx('__modal__input--goal')}`}></input>
										</div>
									</div>
								</div>
							</div>
						) : typeSelected === 'lineup' ? (
							<></>
						) : (
							<div>
								<div>
									<EditorSelect
										title='Side'
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

									<div
										className={`grid grid-cols-3   text-center ${cx(
											'__modal__main'
										)}`}>
										<PlayerSelect
											title='Substituition In'
											sideSelected={sideSelected}
											value={subInSelected}
											onChange={(e: any) => {
												setSubInSelected(e.target.value);
											}}
											homePlayers={homePlayers}
											awayPlayers={awayPlayers}></PlayerSelect>
										<div>
											<PlayerSelect
												title='Substituition Off'
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
												Mins&nbsp;
												<div className='inline'>*</div>
											</label>
											<input
												id='mins'
												defaultValue={process?.mins}
												className={`${cx('__modal__input--goal')}`}></input>
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
												className={
													clickedId === 'save' ? cx('__editActive') : ''
												}>
												Save
											</button>
										</li>
										<li
											id='close'
											onClick={handleCloseModal}
											className={
												clickedId === 'close' ? cx('__editActive') : ''
											}>
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
