import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamCard.module.scss';
const cx = classNames.bind(styles);
type TeamCardProps = {
	image?:string;
	name?: string;
}
export const TeamCard = ({image,name}:TeamCardProps) => {
	return (
		<div
			className={`text-center uppercase font-bold text-xs p-2.5 rounded-md grid justify-items-center items-center ${cx(
				'__background'
			)}`}>
			{image && <img
				src={image}
				alt={name?? "Team Logo"}
				className={`${cx('__logoTeam')}`}
			/>}
			{/* <p
				className={`text-center py-2.5 my-1.5 rounded-md text-white ${cx(
					'__textBackground'
				)}`}>
				Zion
				<br></br>
				Williamson
			</p>
			<p
				className={`text-center py-2.5 my-1.5 rounded-md text-white ${cx(
					'__textBackground'
				)}`}>
				Zion 17
			</p> */}
		</div>
	);
};
