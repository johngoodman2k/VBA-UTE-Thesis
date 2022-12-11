import React from 'react';
import classNames from 'classnames/bind';
import styles from './booking.module.scss';

const cx = classNames.bind(styles);
export const TicketBooking = () => {
	return (
		<>
			<div className={cx('movie-container')}>
				<label> Select a something:</label>
				<select id='movie'>
					<option value='220'>Khang dam sau</option>
					<option value='320'>duc cop </option>
					<option value='250'>duc bong</option>
					<option value='260'>hoanglun</option>
				</select>
			</div>

			<ul className={cx('showcase')}>
				<li>
					<div className={cx('seat')}></div>
					<small>Available</small>
				</li>
				<li>
					<div className={cx('seat', 'selected')}></div>
					<small>Selected</small>
				</li>
				<li>
					<div className={cx('seat', 'sold')}></div>
					<small>Sold</small>
				</li>
			</ul>
			<div className={cx('container')}>
				<div className={cx('screen')}></div>

				<div className={cx('row')}>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
				</div>

				<div className={cx('row')}>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat', 'sold')}></div>
					<div className={cx('seat', 'sold')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
				</div>
				<div className={cx('row')}>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat', 'sold')}></div>
					<div className={cx('seat', 'sold')}></div>
				</div>
				<div className={cx('row')}>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
				</div>
				<div className={cx('row')}>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat', 'sold')}></div>
					<div className={cx('seat', 'sold')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
				</div>
				<div className={cx('row')}>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat')}></div>
					<div className={cx('seat', 'sold')}></div>
					<div className={cx('seat', 'sold')}></div>
					<div className={cx('seat', 'sold')}></div>
					<div className={cx('seat')}></div>
				</div>
			</div>

			<p className={cx('row')}>
				You have selected <span id='count'>0</span> seat for a price of RS.<span id='total'>0</span>
			</p>
		</>
	);
};
