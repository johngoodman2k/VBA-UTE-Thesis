import React from 'react';
import classNames from 'classnames/bind';
import styles from './fantasyNews.module.scss';
import { TeamInfoArticle } from './TeamInfoArticle';
const cx = classNames.bind(styles);

export const FantasyNews = () => {
	return (
		<div className={`${cx('__container')}`}>
			<section className={`${cx('__block')}`}>
				<div className={`${cx('__contentBlock')}`}>
					<div className={`${cx('__titleBlock')}`}>
						<h1 className='uppercase font-normal leading-3 text-2xl'>
							Coaching Staff
						</h1>
						<div className='flex justify-center items-center'>
							<a className='font-normal text-xs leading-5 text-teal-600 mr-2'>
								See more
							</a>
						</div>
					</div>
					<div>
						<TeamInfoArticle></TeamInfoArticle>
						<TeamInfoArticle></TeamInfoArticle>
					</div>
				</div>
			</section>
		</div>
	);
};
