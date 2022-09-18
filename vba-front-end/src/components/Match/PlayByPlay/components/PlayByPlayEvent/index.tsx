import React, { ReactElement } from 'react';
import styles from './playByplayEvent.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type PlayByPlayEventProps = {
	side: string;
	onContextMenu: (e: any) => void;
};

export const PlayByPlayEvent = (props: PlayByPlayEventProps) => {
	const sideCheck =
		props.side === 'home'
			? ' items-center flex  justify-start'
			: ' items-center flex justify-end';

	const timeCheck =
		props.side === 'home' ? ' md:order-last' : ' md:order-first';

	const itemCheck = props.side === 'home' ? '  justify-end' : ' justify-start';

	return (
		<div
			onContextMenu={props.onContextMenu}
			className={`${cx('__pbpEvent', sideCheck)} `}>
			<p className={cx('__pbpEvent__time', timeCheck)}>
				<span className='block'>12:00</span>
			</p>
			<div
				className={`${
					(cx('__pbpEvent__info'), itemCheck)
				} px-2 py-1 h-full flex-1 items-center flex text-sm `}>
				<a className='items-center flex text-sm'>
					<span className='items-center'>
						<span className={`${cx('__pbpEvent__info__img')} `}>
							<img
								className={`${cx(
									'__pbpEvent__info__img--adjust'
								)}h-full w-full block object-cover `}
								src='https://cdn.nba.com/headshots/nba/latest/260x190/203507.png'
								alt=''
							/>
						</span>
					</span>
					<span className='px-1 capitalize leading-tight md:text-sm'>
						Giannis Atetokoumpo
					</span>
				</a>
			</div>
		</div>
	);
};
