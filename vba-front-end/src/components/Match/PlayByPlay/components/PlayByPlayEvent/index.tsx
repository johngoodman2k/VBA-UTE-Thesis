import React, { ReactElement } from 'react';
import styles from './playByplayEvent.module.scss';
import classNames from 'classnames/bind';
import { Process } from '../../../../../Services/models';
const cx = classNames.bind(styles);

type PlayByPlayEventProps = {
	onContextMenu: (e: any) => void;
	process: Process;
};

export const PlayByPlayEvent = (props: PlayByPlayEventProps) => {
	const playerSideCheck = {};
	const sideCheck =
		props.process.side === 'home'
			? ' items-center flex  justify-start'
			: ' items-center flex justify-end';

	const timeCheck =
		props.process.side === 'home' ? ' md:order-last' : ' md:order-first';

	const itemCheck =
		props.process.side === 'home' ? '  justify-end' : ' justify-start';

	return (
		<div
			onContextMenu={props.onContextMenu}
			className={`${cx('__pbpEvent', sideCheck)} `}>
			<p className={cx('__pbpEvent__time', timeCheck)}>
				<span className='block'>{props.process.mins}</span>
			</p>
			<div
				className={`${
					(cx('__pbpEvent__info'), itemCheck)
				} px-2 py-1 h-full flex-1 items-center flex text-sm `}>
				<a className='items-center flex text-sm'>
					<span className='items-center'>
						<span className={`${cx('__pbpEvent__info__img')} `}>
							{props.process.playerOne?.image && <img
								className={`${cx(
									'__pbpEvent__info__img--adjust'
								)}h-full w-full block object-cover `}
								src={props.process.playerOne?.image as string}
								alt=''
							/>}
						</span>
					</span>
					<span className='px-1 capitalize leading-tight md:text-sm'>
						{props.process.playerOne?.firstname ?props.process.playerOne?.firstname + " " : "" } {props.process.playerOne?.lastname ?? ""} 
					</span>
					
				</a>
			</div>
		</div>
	);
};
