import React from 'react';
import styles from './playerSelect.module.scss';
import classNames from 'classnames/bind';
import { StringLiteral } from 'typescript';
import { CustomTeam, Player, Team } from '../../../Services/models';
import { HomePlayers } from '../../../pages/Client/TeamInfoPage/GameLeaders/HomePlayers';
const cx = classNames.bind(styles);

type PlayerSelectProps = {
	title?: string;
	value: string;
	onChange: (e: any) => void;
	players?: Player[];
	required: boolean;
};

export const PlayerSelect = (props: PlayerSelectProps) => {

	return (
		<div className="min-w-[350px]">
			<label className={`${cx('__modal__title')}`}>
				{props.title}&nbsp;
				<div className='inline'>{props.required === true ? '*' : ''}</div>
			</label>


			{props.players&& props.players.length !== 0 && <div className={`relative block ${cx('__optionsDropdown')}`}>
				<select  value={props.value} onChange={props.onChange} className={`${cx('__options')}`}>
					<option selected>Choose player</option>
					{props.players.map((x: Player,index:number) => {
						return <option value={x.id}>{x.lastname + ' ' + x.firstname}</option>
					})}
			</select>
			</div>}
				
			
		</div>
	);
};
