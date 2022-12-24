import React from 'react';
import classNames from 'classnames/bind';
import styles from './sidebarButton.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

type SidebarButtonProps = {
	title: string;
	to: 'tournaments' | 'seasons' | 'teams' | 'players' | 'news';
};

export const SidebarButton = ({ title, to }: SidebarButtonProps) => {
	return (
		<Link to={`/admin/${to}`} className={`${cx('_button')}`}>
			<span className='z-10 relative '>{title}</span>
			<div className={`${cx('_mask')}`}></div>
		</Link>
	);
};
