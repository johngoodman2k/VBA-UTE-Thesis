import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamInfoArticle.module.scss';
import { Team } from '../../../../../../Services/models';
const cx = classNames.bind(styles);
type TeamInfoArticleProps = {
	des?: Team;
}
export const TeamInfoArticle = ({ des }: TeamInfoArticleProps) => {
	return (
		<article className='my-8 hover:bg-slate-200 cursor-pointer'>
			{/* <p className={`${cx('__date')}`}>09/07/2022, 1:49 AM</p>
			<p className={`${cx('__heading')}`}>Khang Lit</p> */}
			<p className={`${cx('__content')}`}>
				{des?.description}
			</p>
		</article>
	);
};
