import React, { useEffect, useRef } from 'react';
import styles from './playByplayBlock.module.scss';
import classNames from 'classnames/bind';
import { PlayByPlayEvent } from '../PlayByPlayEvent';
import { RightClickModal } from '../../../../Modal/RightClickModal';
import { EditMatchInfoModal } from '../../../../Modal/EditMatchInfoModal';
import { RightClickModalAdjust } from '../../../../Modal/RightClickModalAdjust';
const cx = classNames.bind(styles);

type PlayByPlayBlockProps = {
	side?: string;
};

type Position = {
	x: number;
	y: number;
};
export const PlayByPlayBlock = (props: PlayByPlayBlockProps) => {
	const context = useRef<any>();
	const [show, setShow] = React.useState(false);
	const [positions, setPositions] = React.useState({ x: 0, y: 0 });
	const [updateModal, setUpdateModal] = React.useState(false);
	const handleContextMenu = (e: any) => {
		console.log('context menu clicked');
		e.preventDefault();
		setShow(true);
		setPositions({ x: e.pageX, y: e.pageY });
		console.log(positions.x, positions.y);
	};

	useEffect(() => {
		const handleClick = () => setShow(false);
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);
	const sideCheck = cx(
		'md:mb-1 text-sm flex',
		props.side === 'home' ? 'justify-start' : 'justify-end'
	);

	return (
		<div className='-mx-4 md:mx-0'>
			<h2 className='px-2 my-2 text-sm uppercase font-bold text-center text-black'>
				Q1 Start
			</h2>
			<article className={sideCheck}>
				<PlayByPlayEvent
					onContextMenu={handleContextMenu}
					side='home'></PlayByPlayEvent>
				{show === true ? (
					<RightClickModalAdjust
						onClick={() => {
							setUpdateModal(true);
						}}
						x={positions.x}
						y={positions.y}></RightClickModalAdjust>
				) : (
					''
				)}

				{updateModal === true ? (
					<EditMatchInfoModal
						close={() => {
							setUpdateModal(false);
						}}></EditMatchInfoModal>
				) : (
					''
				)}
			</article>
		</div>
	);
};
