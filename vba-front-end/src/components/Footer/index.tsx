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
						<Link to='/main'>Trang chủ</Link>
					</p>
					<p>
						<Link to='/main'>Tin tức</Link>
					</p>
					<p>
						<Link to='/main'>Bảng xếp hạng</Link>
					</p>
					<p>
						<Link to='/main'>Lịch thi đấu</Link>
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
