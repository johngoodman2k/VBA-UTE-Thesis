import React from 'react';
import styles from './newscontainer.module.scss';
import classNames from 'classnames/bind';
import { ReactComponent as Arrow } from '../../../assets/svg/arrow.svg';
import { NewsBlock } from '../NewsBlock';

const cx = classNames.bind(styles);
const data = [
	{
		title: 'Etihad Airways announce landmark partnership with Team Nigma',
		image:
			'https://teamnigma.com/wp-content/uploads/2021/04/Team-Nigma-Etihad-Airlines-650x650.jpg?x15147'
	},
	{
		title: 'Team Nigma makes Abu Dhabi its new home',
		image:
			'https://teamnigma.com/wp-content/uploads/2021/03/Team-Nigma-Abu-Dhabi-Thumb-650x650.jpg?x15147'
	},
	{
		title: 'Rising Stars',
		image:
			'https://teamnigma.com/wp-content/uploads/2020/11/Team-Nigma-Rising-Stars-650x650.jpg?x15147'
	},
	{
		title: 'We Save 2020',
		image:
			'https://teamnigma.com/wp-content/uploads/2020/08/We-Save-Poster-650x650.jpg?x15147'
	},
	{
		title: 'True Sight 2020',
		image:
			'https://teamnigma.com/wp-content/uploads/2020/08/TeamNigma-TrueSight2020-650x650.jpg?x15147'
	},
	{
		title: 'dota pit',
		image:
			'https://teamnigma.com/wp-content/uploads/2020/11/Team-Nigma-Dota-Pot-650x650.jpg?x15147'
	},
	{
		title: 'dota pit',
		image:
			'https://teamnigma.com/wp-content/uploads/2020/11/Team-Nigma-Dota-Pot-650x650.jpg?x15147'
	}
];

export const NewsContainer = () => {
	return (
		<div className={`container mx-auto ${cx('newsContainer')} `}>
			<div
				className={`grid grid-cols-3 gap-6 ${cx('newsContainer__ItemBlock')} `}>
				{data.map((item, index) => (
					<NewsBlock {...item}></NewsBlock>
				))}
			</div>
		</div>
	);
};
