import React, { useEffect, useState } from 'react';
import { Player } from '../../../Services/models';
import { vbaContext } from '../../../Services/services';
import { EditorSelect } from '../../Utils/EditorSelect';
import { ModalBlock } from '../ModalBlock';
import styles from './offenseUpdateModal.module.scss';
import classNames from 'classnames/bind';
import { PlayerSelect } from '../../Utils/PlayerSelect';
const cx = classNames.bind(styles);

type OffenseUpdateModalProps = {
	matchId: string | undefined;
	modalType?: 'edit' | 'update';
	homeId: string | undefined;
	awayId: string | undefined;
	process?: ProcessProps;
};
type ProcessProps = {
	option: string;
	quater: string;
	player: Player[];
	type: string;
	side: string;
	description: string;
	mins: string;
};

const typeOptions = [
	{ name: 'Offensive', value: 'offensive' },
	{ name: 'Defensive', value: 'defensive' },
	{ name: 'Sub', value: 'sub' }
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
export const OffenseUpdateModal = ({
	matchId,
	modalType = 'edit',
	homeId,
	awayId,
	process
}: OffenseUpdateModalProps) => {
	const [clickedId, setClickedId] = useState('');

	const [defenseType, setDefenseType] = useState('rebound');
	const [offenseType, setOffenseType] = useState('2PT');
	const [quaterSelected, setQuaterSelected] = useState('q1');

	const [homePlayers, setHomePlayers] = useState<Player[]>([]);
	const [awayPlayers, setAwayPlayers] = useState<Player[]>([]);

	const [typeSelected, setTypeSelected] = useState('offensive');
	const [sideSelected, setSideSelected] = useState('home');

	const [playerSelected, setPlayerSelected] = useState('');
	const [assistantSelected, setAssistantSelected] = useState('');
	const [subInSelected, setSubInSelected] = useState('');
	const [subOffSelected, setSubOffSelected] = useState('');

	useEffect(() => {
		(async () => {
			const res1 = await playerServices.getPlayersByTeamId(homeId);
			const res2 = await playerServices.getPlayersByTeamId(awayId);

			setHomePlayers(res1);
			setAwayPlayers(res2);

			if (modalType === 'update') {
				if (process) {
					if (process.type === 'offensive') {
						setOffenseType(process.option);
						setPlayerSelected(process.player[0].id);
						setAssistantSelected(process.player[1].id);
					} else if (process.type === 'defensive') {
						setDefenseType(process.option);
						setPlayerSelected(process.player[0].id);
					} else if (process.type === 'sub') {
						setSubInSelected(process.player[0].id);
						setSubOffSelected(process.player[1].id);
					}
					setSideSelected(process.side);
					setQuaterSelected(process.quater);
				}
			}
		})();
	}, []);

	const getPlayerById = (id: string): Player | undefined => {
		let player = homePlayers.find((p: any) => p.id === id);
		if (!player) player = awayPlayers.find((p: any) => p.id === id);
		return player;
	};

	const onEdit = async (e: any) => {
		e.preventDefault();
		const type = typeSelected;
		const side = sideSelected;
		const offense = offenseType;
		const defense = defenseType;
		const quater = quaterSelected;
		const des = e.target.des.value;
		const assistant = getPlayerById(assistantSelected);
		const player = getPlayerById(playerSelected);
		let homeResult = '';
		let awayResult = '';
		const mins = e.target.mins.value;
		// let card = '';
		const subIn = getPlayerById(subInSelected);
		const subOff = getPlayerById(subOffSelected);

		const checkType =
			type === 'offensive' ? offense : type === 'defensive' ? defense : null;

		const checkPlayer =
			type === 'sub'
				? [subIn, subOff]
				: type === 'offensive'
				? [player, assistant]
				: [player];

		const process = {
			type: type,
			side: side,
			option: checkType,
			quater: quater,
			des: des,
			mins: mins,
			player: checkPlayer
		};
		const res3 = await matchServices.addProcessToMatch(matchId, [process]);
		console.log('168', res3);

		// setReload(!reload);
	};

	const onUpdate = () => {};

	return (
		<>
			<ModalBlock>
				<form onSubmit={modalType === 'update' ? onUpdate : onEdit}>
					<section className='container mx-auto text-left'>
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
												className={`${cx('__modal__input--goal')}`}></input>
										</div>
									</div>
								</div>
							</div>
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
												onClick={(e: any) =>
													e.currentTarget.id === 'save'
														? setClickedId('save')
														: ''
												}
												className={
													clickedId === 'save' ? cx('__editActive') : ''
												}>
												Save
											</button>
										</li>
										<li
											id='close'
											onClick={(e: any) =>
												e.currentTarget.id === 'close'
													? setClickedId('close')
													: ''
											}
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
