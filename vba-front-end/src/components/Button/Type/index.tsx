import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './type.module.scss';

const cx = classNames.bind(styles);

type TournamentTypeProps = {
	type: any;
};

export const Type = (props: TournamentTypeProps) => {
	const [clickedId, setClickedId] = useState(-1);
	return (
		<>
			{props.type.map((x: any, i: any) => {
				return (
					<div className={`${cx('tournament_type-adjust')}`}>
						<label
							key={i}
							onClick={() => setClickedId(i)}
							className={
								i === clickedId
									? `${cx(
											'tournament_type-label',
											'tournament_type-label--active'
									  )}`
									: `${cx('tournament_type-label')}`
							}>
							<img
								className={`${cx('tournament_type-image')}`}
								src={x.image}></img>
							<div className={`${cx('tournament_type-text')}`}>{x.name}</div>
						</label>
					</div>
				);
			})}
		</>
	);
};
