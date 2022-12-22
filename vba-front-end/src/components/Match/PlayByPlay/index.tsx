import React, { useEffect, useState } from 'react';
import styles from './playByplay.module.scss';
import classNames from 'classnames/bind';
import { PlayByPlayTeam } from './components/PlayByPlayTeam';
import { PlayByPlayBlock } from './components/PlayByPlayBlock';
import { vbaContext } from '../../../Services/services';
import { id } from 'date-fns/locale';
import { CustomTeam, Player, Process, Team } from '../../../Services/models';
import { ControlModal } from '../../Modal/ControlModal';
import { homedir } from 'os';
const cx = classNames.bind(styles);

type PlayByPlayProps = {
	process?: Process[];
	matchId?: string;
	home?: Team;
	away?: Team;
	// handleCloseModal?: () => void;
};

const processServices = vbaContext.getProcessServices();
export const PlayByPlay = (props: PlayByPlayProps) => {
	const [clickedId, setClickedId] = useState('');
	const [updateModal, setUpdateModal] = useState('');

	const [process, setProcess] = useState<Process | undefined>();

	const processAtQ = props.process && props.process.length !==0 ? props.process.filter(process => process.quater === clickedId) : undefined;

	// console.log('27', process);
	const getProcess = (process: Process | undefined) => {
		setProcess(process);
	};

	// useEffect(() => {
	// 	async () => {
	// 		const res = await processServices.getProcessById();
	// 		setProcess(res);
	// 	};
	// });

	const handleOpenModal = () => {
		setUpdateModal('open');
	};
	const handleCloseModal = () => {
		setUpdateModal('close');
	};

	return (
		<div className={cx('__wrapper')}>
			<section className={cx('__block')}>
				<div className={cx('__container')}>
					<div className={cx('__quaterBlock')}>
						<nav className={cx('__quaterBlock__nav')}>
							<button
								id='q1'
								onClick={(e: any) => (e.currentTarget.id === 'q1' ? setClickedId('q1') : '')}
								className={
									clickedId === 'q1'
										? cx('__quaterBlock__button', '__quaterBlock__button--active')
										: cx('__quaterBlock__button', '__quaterBlock__button--inactive')
								}>
								Q1
							</button>
							<button
								id='q2'
								onClick={(e: any) => (e.currentTarget.id === 'q2' ? setClickedId('q2') : '')}
								className={
									clickedId === 'q2'
										? cx('__quaterBlock__button', '__quaterBlock__button--active')
										: cx('__quaterBlock__button', '__quaterBlock__button--inactive')
								}>
								Q2
							</button>
							<button
								id='q3'
								onClick={(e: any) => (e.currentTarget.id === 'q3' ? setClickedId('q3') : '')}
								className={
									clickedId === 'q3'
										? cx('__quaterBlock__button', '__quaterBlock__button--active')
										: cx('__quaterBlock__button', '__quaterBlock__button--inactive')
								}>
								Q3
							</button>
							<button
								id='q4'
								onClick={(e: any) => (e.currentTarget.id === 'q4' ? setClickedId('q4') : '')}
								className={
									clickedId === 'q4'
										? cx('__quaterBlock__button', '__quaterBlock__button--active')
										: cx('__quaterBlock__button', '__quaterBlock__button--inactive')
								}>
								Q4
							</button>
						</nav>
					</div>
					<PlayByPlayTeam homeImage={props.home?.teamlogo as string} awayImage={props.away?.teamlogo as string} homeName={props.home?.teamname} awayName={props.away?.teamname}></PlayByPlayTeam>
					<div className='-mx-4 md:mx-0'>
						<h2 className='px-2 my-2 text-sm uppercase font-bold text-center text-black'>{clickedId ?? ""} Start</h2>
						{processAtQ && processAtQ.map((p: Process) => {
						return (
							<PlayByPlayBlock
								// qCurrent={clickedId}
								handleOpenUpdateModal={handleOpenModal}
								side={p.side}
								process={p}
								getProcess={getProcess}></PlayByPlayBlock>
						);
						})}
					</div>

				</div>
			</section>
			<div className={updateModal === 'open' ? cx('__active') : cx('__inactive')}>
				<ControlModal
					handleCloseModal={handleCloseModal}
					modalType='update'
					matchId={props.matchId}
					homePlayers={props.home?.players}
					awayPlayers={props.away?.players}
					process={process}></ControlModal>
			</div>
		</div>
	);
};
