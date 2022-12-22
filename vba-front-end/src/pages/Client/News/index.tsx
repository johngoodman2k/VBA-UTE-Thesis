import React from 'react';
import styles from './news.module.scss';
import classNames from 'classnames/bind';
import { NewsCard } from '../../../components/News/NewsCard';
import { NewsBlock } from '../../../components/News/NewsBlock';
const cx = classNames.bind(styles);

export const News = () => {
	return (
		<article className={`${cx('__container')}`}>
			<div className={`${cx('__wrapper')}`}>
				<div className='text-white text-6xl border-b border-solid border-third-color font-bold text-left uppercase p-4'>Tin tức</div>
				<div className={`${cx('__layout')}`}>

					<div className='grid grid-cols-3 gap-8 py-2 my-2'>
						<NewsBlock
							title='Khang dam sau'
							image='https://api-news.vba.vn/storage/images/1664422093_blob'></NewsBlock>
						<NewsBlock
							title='Khang dam sau'
							image='https://api-news.vba.vn/storage/images/1664422093_blob'></NewsBlock>
						<NewsBlock
							title='Khang dam sau'
							image='https://api-news.vba.vn/storage/images/1664422093_blob'></NewsBlock>
						<NewsBlock
							title='Khang dam sau'
							image='https://api-news.vba.vn/storage/images/1664422093_blob'></NewsBlock>
						<NewsBlock
							title='Khang dam sau'
							image='https://api-news.vba.vn/storage/images/1664422093_blob'></NewsBlock>
						<NewsBlock
							title='Khang dam sau'
							image='https://api-news.vba.vn/storage/images/1664422093_blob'></NewsBlock>
						<NewsBlock
							title='Khang dam sau'
							image='https://api-news.vba.vn/storage/images/1664422093_blob'></NewsBlock>
						<NewsBlock
							title='Khang dam sau'
							image='https://api-news.vba.vn/storage/images/1664422093_blob'></NewsBlock>
					</div>
				</div>
			</div>
		</article>
	);
};
