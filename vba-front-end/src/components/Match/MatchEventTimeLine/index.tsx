import React from 'react';

import classNames from 'classnames/bind';
import styles from './matchEventTimeLine.module.scss';
import { ReactComponent as SoccerLogo } from '../../../assets/images/soccer-com.svg';

import { ReactComponent as SubstitutionLogo } from '../../../assets/images/substitution-com.svg';
import { ReactComponent as RedCardLogo } from '../../../assets/images/redcard-com.svg';
import { ReactComponent as YellowCardLogo } from '../../../assets/images/yellowcard-com.svg';
import { ReactComponent as SubOff } from '../../../assets/images/suboff-com.svg';
import { ReactComponent as SubOn } from '../../../assets/images/subon-com.svg';
import { ReactComponent as TickLogo } from '../../../assets/images/tick-com.svg';
import { ReactComponent as CrossLogo } from '../../../assets/images/cross-com.svg';

type TournamentEventProps = {
	type?: string;
	mins?: number;
	homeBadge: string;
	homeName: string;
	homeResult: string;
	awayBadge: string;
	awayName: string;
	awayResult: string;
	side: string;
	index?: number;
	// playerName?: string;
	// playerImg?: string;
	// playerNumber?: number;
	// assistance?: string;
	// subOn?: string;
	// subOnImg?: string;
	// subOnNumber?: number;
	// subOff?: string;
	// subOffImg?: string;
	// subOffNumber?: number;

};

const cx = classNames.bind(styles);
const test = { mins: 27 };

export const MatchEventTimeLine = (props: TournamentEventProps) => {
	const iconClasses = cx(
		'tournamentEvent__icon',
		'tournamentEvent__icon--adjust',
		props.side === 'home' ? 'tournamentEvent__home' : 'tournamentEvent__away'
	);

	const resultHomeCheck = cx(
		'text-6xl font-bold text-center',
		parseInt(props.homeResult) > parseInt(props.awayResult)
			? 'text-red-600'
			: ''
	);

	const resultAwayCheck = cx(
		'text-6xl font-bold text-center',
		parseInt(props.homeResult) < parseInt(props.awayResult)
			? 'text-red-600'
			: ''
	);

	const headerIcon = cx('tournamentEvent__inforContainer__icon--adjust');
	return (
		<div
			className={cx('tournamentEvent__block')}
			style={
				props.side === 'home'
					? { left: `calc(${props.index ? props.index : 0}*10%` }
					: { left: `calc(${props.index ? props.index : 0}*10%` }
			}>
			<span>
				{props.type === 'won' ? (
					<TickLogo className={iconClasses}></TickLogo>
				) : (
					<CrossLogo className={iconClasses}></CrossLogo>
				)}
			</span>

			{/* {props.mins}
			<span></span> */}

			<div className={cx('tournamentEvent__inforContainer')}>
				<div className={cx('__wrapper')}>
					<div className={`${cx('tournamentEvent__inforContainer__header')}`}>
						<div className={cx('tournamentEvent__inforContainer__icon')}>
							{props.type === 'won' ? (
								<TickLogo className={iconClasses}></TickLogo>
							) : (
								<CrossLogo className={iconClasses}></CrossLogo>
							)}
						</div>

						<div className={cx('tournamentEvent__inforContainer__time')}>
							<span>17 AUG 2022</span>
						</div>

						<div className={cx('tournamentEvent__inforContainer__teamScore')}>
							<a className={cx('tournamentEvent__inforContainer__team')}>
								<span
									className={cx(
										'tournamentEvent__inforContainer__teamBadge',
										'tournamentEvent__inforContainer__homeTeamBadge'
									)}>
									<span
										className={cx(
											'tournamentEvent__inforContainer__teamBadge__icon'
										)}>
										<img
											src={props.homeBadge}
											className={cx(
												'tournamentEvent__inforContainer__teamBadge__icon--adjust'
											)}></img>
									</span>
								</span>
								<span
									className={cx(
										'tournamentEvent__inforContainer__homeTeamName'
									)}>
									{props.homeName}
								</span>
							</a>
							<span className={cx('tournamentEvent__inforContainer__team')}>
								{props.homeResult}
							</span>
							{'-'}
							<span className={cx('tournamentEvent__inforContainer__team')}>
								{props.awayResult}
							</span>

							<a className={cx('tournamentEvent__inforContainer__team')}>
								<span
									className={cx(
										'tournamentEvent__inforContainer__awayTeamName'
									)}>
									{props.awayName}
								</span>
								<span
									className={cx(
										'tournamentEvent__inforContainer__teamBadge',
										'tournamentEvent__inforContainer__awayTeamBadge'
									)}>
									<span
										className={cx(
											'tournamentEvent__inforContainer__teamBadge__icon'
										)}>
										<img
											src={props.awayBadge}
											className={cx(
												'tournamentEvent__inforContainer__teamBadge__icon--adjust'
											)}></img>
									</span>
								</span>
							</a>
						</div>
					</div>

					{/* new timeline fixed */}
					<div className={cx('tournamentEvent__inforContent')}>
						<div className='grid grid-cols-3 text-center'>
							<div>
								<a className={`${cx('_badgeBox')}`}>
									<span className='bg-white p-2 mr-2'>
										<span className='top-0 inline-block align-middle relatve mb-1'>
											<img
												src={props.homeBadge}
												className='w-40 h-40'></img>
										</span>
									</span>
								</a>
							</div>
							<div className='align-middle  text-center flex items-center justify-center text-black'>
								<span className={resultHomeCheck}>{props.homeResult}</span>
								<span className='text-6xl font-bold text-center'>-</span>
								<span className={resultAwayCheck}>{props.awayResult}</span>
							</div>
							<div>
								<a className={`${cx('_badgeBox')}`}>
									<span className='bg-white p-2 mr-2'>
										<span className='top-0 inline-block align-middle relatve mb-1'>
											<img
												src={props.awayBadge}
												className='w-40 h-40'></img>
										</span>
									</span>
								</a>
							</div>
						</div>
					</div>

					{/* {props.type === 'goal' ? (
						<div className={cx('tournamentEvent__inforContent')}>

							<img
								src={props.playerImg}
								className={cx(
									'tournamentEvent__inforContent__scorerImage'
								)}></img>
							<div className={cx('tournamentEvent__inforContent__scorerInfor')}>
								<a
									className={cx(
										'tournamentEvent__inforContent__scorerInfor__name'
									)}>
									{props.playerNumber} {'.'} {props.playerName}
								</a>
								<div
									className={cx('tournamentEvent__inforContent__assistInfor')}>
									{'Ast. '}
									<a
										className={cx(
											'tournamentEvent__inforContent__assistInfor--name'
										)}>
										{props.assistance}
									</a>
								</div>
							</div>
						</div>
					) : props.type === 'sub' ? (
						<>
							{' '}
							<div
								className={cx(
									'tournamentEvent__inforContent',
									'tournamentEvent__inforContent__substitution',
									'tournamentEvent__inforContent__substitution--subOut'
								)}>
								<img
									className={cx(
										'tournamentEvent__inforContent__substitution__image',
										'tournamentEvent__inforContent__substitution__image--subOut'
									)}
									src={props.subOffImg}></img>
								<div
									className={cx(
										'tournamentEvent__inforContent__substitution__playerInfor'
									)}>
									<a
										className={cx(
											'tournamentEvent__inforContent__substitution__playerInfor--name'
										)}>
										{props.subOffNumber} {props.subOff}
										<div
											className={cx(
												'tournamentEvent__inforContent__substitution__icon'
											)}>
											<SubOff
												className={cx(
													'tournamentEvent__inforContent__substitution__icon--adjust'
												)}></SubOff>
										</div>
									</a>
								</div>
							</div>
							<div
								className={cx(
									'tournamentEvent__inforContent',
									'tournamentEvent__inforContent__substitution',
									'tournamentEvent__inforContent__substitution--subOn'
								)}>
								<img
									className={cx(
										'tournamentEvent__inforContent__substitution__image',
										'tournamentEvent__inforContent__substitution__image--subOn'
									)}
									src={props.subOnImg}></img>
								<div
									className={cx(
										'tournamentEvent__inforContent__substitution__playerInfor--subOn'
									)}>
									<a
										className={cx(
											'tournamentEvent__inforContent__substitution__playerInfor--name',
											'tournamentEvent__inforContent__substitution__playerInfor--name--subOn'
										)}>
										{props.subOnNumber} {props.subOn}
										<div
											className={cx(
												'tournamentEvent__inforContent__substitution__icon'
											)}>
											<SubOn
												className={cx(
													'tournamentEvent__inforContent__substitution__icon--adjust',
													'tournamentEvent__inforContent__substitution__icon--subOn'
												)}></SubOn>
										</div>
									</a>
								</div>
							</div>
						</>
					) : props.type === 'card' ? (
						<>
							<div className={cx('tournamentEvent__inforContent')}>
								<img
									src={props.playerImg}
									className={cx(
										'tournamentEvent__inforContent__scorerImage'
									)}></img>
								<div
									className={cx('tournamentEvent__inforContent__scorerInfor')}>
									<a
										className={cx(
											'tournamentEvent__inforContent__scorerInfor__name'
										)}>
										{props.playerNumber} {'.'} {props.playerName}
									</a>
								</div>
							</div>
						</>
					) : (
						<>
							<div className={cx('tournamentEvent__inforContent')}>
								<img
									src={props.playerImg}
									className={cx(
										'tournamentEvent__inforContent__scorerImage'
									)}></img>
								<div
									className={cx('tournamentEvent__inforContent__scorerInfor')}>
									<a
										className={cx(
											'tournamentEvent__inforContent__scorerInfor__name'
										)}>
										{props.playerNumber} {'.'} {props.playerName}
									</a>
								</div>
							</div>
						</>
					)} */}
				</div>
			</div>
		</div>
	);
};
