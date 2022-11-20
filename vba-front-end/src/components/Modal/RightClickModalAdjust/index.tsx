import React from 'react';
import styles from './rightClickModalAdjust.module.scss';
import classNames from 'classnames/bind';
const text = [{ name: 'Update' }, { name: 'Delete' }, { name: 'Comment' }];
type RightClickModalAdjustProps = {
	x: any;
	y: any;
	onClick?: () => void;
};
const cx = classNames.bind(styles);

export const RightClickModalAdjust = (props: RightClickModalAdjustProps) => {
	return (
		<div
			style={{
				position: 'fixed',
				top: `${props.y - 900}px`,
				left: `${props.x}px`
			}}
			className={`${cx('__wrapper')}`}>
			<div id=''>
				<ul className={`${cx('__optionsBlock')}`}>
					{text.map((x: any) => {
						return (
							<li className={`${cx('__list')}`}>
								<button onClick={props.onClick} className={`${cx('__button')}`}>
									<span className={`${cx('__text')}`}>{x.name}</span>
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
