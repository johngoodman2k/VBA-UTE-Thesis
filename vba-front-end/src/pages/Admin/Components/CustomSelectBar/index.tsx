import React, { useState } from 'react';
import { ReactComponent as BasketballIcon } from '../../../../assets/svg/basketball.svg';
import classNames from 'classnames/bind';
import styles from './customSelect.module.scss';
const cx = classNames.bind(styles);

type CustomSelectBarProps = {
	addNext?: string;
	selectedValue?: string | undefined;
	styles?: React.CSSProperties;
	handleAdd?: () => void;
	handleEdit?: () => void;
	handleDelete?: () => void;
	icon?: React.ReactNode;
};

export const CustomSelectBar = ({ addNext, styles, handleAdd, handleEdit, handleDelete,icon }: CustomSelectBarProps) => {
	return (
		<div className={cx('dropdown')} style={styles}>
			<div className={cx('dropdown-select')}>
				{icon?? <BasketballIcon />}
			</div>
			<div className={cx('dropdown-list')}>
				<div className={cx('dropdown-list__item')} onClick={handleAdd}>
					Add {addNext}
				</div>
				<div className={cx('dropdown-list__item')} onClick={handleEdit}>
					Edit
				</div>
				{handleDelete && <div className={cx('dropdown-list__item')} onClick={handleDelete}>
					Delete
				</div>}
			</div>
		</div>
	);
};
