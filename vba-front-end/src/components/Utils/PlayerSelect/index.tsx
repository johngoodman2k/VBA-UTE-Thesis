import React from 'react';
import styles from './playerSelect.module.scss';
import classNames from 'classnames/bind';
import { StringLiteral } from 'typescript';
import { Player } from '../../../Services/models';
const cx = classNames.bind(styles);

type PlayerSelectProps = {
	title: string;
	sideSelected: string;
	value: string;
	onChange: (e: any) => void;
	homePlayers: Player[];
	awayPlayers: Player[];
};

export const PlayerSelect = (props: PlayerSelectProps) => {
	return (
		<div>
			<label className={`${cx('__modal__title')}`}>
				{props.title}&nbsp;
				<div className='inline'>*</div>
			</label>

			{props.sideSelected === 'home' ? (
				<>
					<div className={`relative block ${cx('__optionsDropdown')}`}>
						<select
							value={props.value}
							onChange={props.onChange}
							className={`${cx('__options')}`}>
							{props.homePlayers?.map((x: any) => {
								return <option value={x.id}>{x.name}</option>;
							})}
						</select>
					</div>
				</>
			) : (
				<>
					<div className={`relative block ${cx('__optionsDropdown')}`}>
						<select
							value={props.value}
							onChange={props.onChange}
							className={`${cx('__options')}`}>
							{props.awayPlayers?.map((x: any) => {
								return <option value={x.id}>{x.name}</option>;
							})}
						</select>
					</div>
				</>
			)}
		</div>
	);
};
