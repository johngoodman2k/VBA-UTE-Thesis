import React from 'react';
import classNames from 'classnames/bind';
import styles from './playerCard.module.scss';
const cx = classNames.bind(styles);
type PlayerCardProps = {
	image?:string;
	firstname?:string;
	lastname?:string;
	shirtnumber?:number;
}
export const PlayerCard = ({image,firstname,lastname,shirtnumber}:PlayerCardProps) => {
	return (
		<div
			className={`text-center uppercase font-bold text-xs p-2.5 rounded-md ${cx(
				'__background'
			)}`}>
			{image &&<img
				src={image}
				alt={firstname??"" + lastname??""}
			/>}
			<p
				className={`text-center py-2.5 my-1.5 rounded-md text-white ${cx(
					'__textBackground'
				)}`}>
				{firstname ?? ""}
				<br></br>
				{lastname ??""}
			</p>
			<p
				className={`text-center py-2.5 my-1.5 rounded-md text-white ${cx(
					'__textBackground'
				)}`}>
				{firstname+ " " ?? "" + shirtnumber  ??""} 
			</p>
		</div>
	);
};
