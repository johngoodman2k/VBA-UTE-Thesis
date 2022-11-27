import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './footer.module.scss';

const cx = classNames.bind(styles);
export const Footer = () => {
	return (
		<>
			<div className={`${cx('footer-block')}`}>
				<div className={`${cx('footer-header')}`}>
					Sections
					<p>
						<Link to='/main'>Home</Link>
					</p>
					<p>
						<Link to='/main'>News</Link>
					</p>
					<p>
						<Link to='/main'>Single</Link>
					</p>
					<p>
						<Link to='/main'>Article</Link>
					</p>
				</div>
				<div className={`${cx('footer-ceremony')}`}>
					This website is developed by K & J<p>Thank you for your supporting</p>
				</div>

				<div className={`${cx('logo-footer-adjustment')}`}>
					<img src='https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg' className={`${cx('logo')}`}></img>
				</div>
			</div>
		</>
	);
};
