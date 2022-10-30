import React from 'react';
import styles from './articles.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const Articles = () => {
	return (
		<article>
			<div className={`${cx('__wrapper')}`}>
				<div className={`${cx('__layout')}`}>
					<div className={`${cx('__left')}`}>
						<div className={`${cx('__header')}`}>
							<figure className='md:mb-10'>
								<img
									className='mb-1'
									src='https://cdn.nba.com/teams/uploads/sites/1610612738/2022/10/tatumUntitled-1.jpg'></img>
							</figure>
							<h1 className={`${cx('__header__text')}`}>
								Tatum continues historic start
							</h1>
							<div className={`${cx('__infor')}`}>
								<div className={`${cx('__infor__text')}`}>
									<div className='font-bold'>Khang Dam Sau</div>
								</div>
								<div className={`${cx('__infor__text')}`}>
									<span>October 23,2022</span>
									<span className='ml-2'>12:16 AM EDT</span>
								</div>
							</div>
						</div>
						<div className={`${cx('__content')}`}>
							<p>
								Jayson Tatum has officially put the slow-start narrative to bed.
								He’s tucked it in, shut off the light, and closed the door on it
								because this season, he's off to the best start in Celtics
								history.
							</p>
						</div>
					</div>
					<div className={`${cx('__right')}`}></div>
				</div>
			</div>
		</article>
	);
};
