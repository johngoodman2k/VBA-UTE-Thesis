import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './buttonGroup.module.scss';

type TournamentButtonGroupProps = {
	buttons: any;
};

const cx = classNames.bind(styles);

export const ButtonGroup = (props: TournamentButtonGroupProps) => {
	const [clickedId, setClickedId] = useState(-1);
	return (
		<>
			{props.buttons.map((x: any, i: any) => (
				<button
					key={i}
					name={x}
					onClick={() => setClickedId(i)}
					className={
						i === clickedId
							? `${cx('_customButton', '_active')}`
							: `${cx('_customButton')}`
					}>
					{x}
				</button>
			))}
		</>
	);
};
