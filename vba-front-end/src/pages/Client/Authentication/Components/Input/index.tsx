import React from 'react';

import classNames from 'classnames/bind';
import styles from './input.module.scss';

type InputProps = {
	name: string;
	type: string;
};

const cx = classNames.bind(styles);
export const Input = (props: InputProps) => {
	return (
		<>
			<div className={cx('input-block')}>
				<div className={cx('form-field')}>
					<input name={props.name} type={props.type} className={cx('form-input')} placeholder=' '></input>
					<label className={cx('form-label')}>{props.name}</label>
				</div>
			</div>
		</>
	);
};
