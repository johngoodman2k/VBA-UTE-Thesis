import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamInfoArticle.module.scss';
const cx = classNames.bind(styles);

export const TeamInfoArticle = () => {
	return (
		<article className='my-8 hover:bg-slate-200 cursor-pointer'>
			<p className={`${cx('__date')}`}>09/07/2022, 1:49 AM</p>
			<p className={`${cx('__heading')}`}>Khang Lit</p>
			<p className={`${cx('__content')}`}>
				The Warriors traded up for the 44th overall pick in the 2022 Draft to
				select Rollins, but a post-draft scan revealed a foot fracture, which
				sidelined him for Summer League. Regardless, he inked a three-year,
				$4.76 million deal, including two guaranteed years, with Golden State at
				the end of July, which suggests the Warriors aren't too overly concerned
				with the foot moving forward.
			</p>
		</article>
	);
};
