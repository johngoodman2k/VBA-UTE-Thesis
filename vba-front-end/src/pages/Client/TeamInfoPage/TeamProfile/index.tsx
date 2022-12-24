import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamProfile.module.scss';
import { CoachingStaff } from './CoachingStaff';
import { FantasyNews } from './FantasyNews';
import { Team } from '../../../../Services/models';
const cx = classNames.bind(styles);
type TeamProfileProps = {
	details?: Team
}
export const TeamProfile = ({ details }: TeamProfileProps) => {
	return (
		<div className={`${cx('__block')}`}>
			<div className={`${cx('__block__inner')}`}>
				<CoachingStaff></CoachingStaff>
				<FantasyNews details={details}></FantasyNews>
			</div>
		</div>
	);
};
