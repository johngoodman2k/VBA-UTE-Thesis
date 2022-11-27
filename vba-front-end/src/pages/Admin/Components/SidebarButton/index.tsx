import React from 'react';
import classNames from 'classnames/bind';
import styles from './sidebarButton.module.scss';
const cx = classNames.bind(styles);

export const SidebarButton = () => {
	return (
		<a className={`${cx('_button')}`}>
			<span className='z-10 relative'>Tournaments</span>
			<div className={`${cx('_mask')}`}></div>
		</a>
	);
};
