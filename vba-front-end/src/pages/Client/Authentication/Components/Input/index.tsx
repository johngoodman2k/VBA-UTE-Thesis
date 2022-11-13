import React from 'react';

import classNames from "classnames/bind";
import styles from "./input.module.scss";

type InputProps = {
    name:string;
    type:string;
    
}

const cx = classNames.bind(styles);
export const Input = (props:InputProps)=> {
	return (
		<>
			<div className={cx('__block')}>
				<div className={cx('form-field')}>
					<input
						name={props.name}
						type={props.type}
						className='form-input'
						placeholder=' '></input>
					<label  className={cx('form-label')}>
						{props.name}
					</label>
				</div>
			</div>
		</>
	);
};