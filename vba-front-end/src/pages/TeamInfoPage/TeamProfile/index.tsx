import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamProfile.module.scss';
import { CoachingStaff } from './CoachingStaff';
import { FantasyNews } from './FantasyNews';
const cx = classNames.bind(styles);
export const TeamProfile = () => {
	return (
		<div className={`${cx('__block')}`}>
			<div className={`${cx('__block__inner')}`}>
				<CoachingStaff></CoachingStaff>
				<FantasyNews></FantasyNews>
			</div>
		</div>
	);
};
