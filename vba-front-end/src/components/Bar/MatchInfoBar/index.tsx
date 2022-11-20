import React, { useEffect, useRef } from 'react';

import { ReactComponent as RefereeLogo } from '../../../assets/images/referee-com.svg';
import { ReactComponent as StadiumLogo } from '../../../assets/images/stadium-com.svg';
import { ReactComponent as EyesLogo } from '../../../assets/images/eyes-com.svg';
import styles from './matchInfoBar.module.scss';
import classNames from 'classnames/bind';
import { RightClickModal } from '../../Modal/RightClickModal';
import { EditMatchInfoModal } from '../../Modal/EditMatchInfoModal';

type MatchInfoBarProps = {
	date: string | undefined;
	referee: string | undefined;
	// onContextMenu: () => {};
	stadiumName?: string;
	spectators: string | undefined;
};
type Position = {
	x: number;
	y: number;
};

const cx = classNames.bind(styles);
export const MatchInfoBar = (props: MatchInfoBarProps) => {
	const context = useRef<any>();
	const [show, setShow] = React.useState(false);
	const [positions, setPositions] = React.useState({ x: 0, y: 0 });
	const [updateModal, setUpdateModal] = React.useState(false);
	const handleContextMenu = (e: any) => {
		e.preventDefault();
		setShow(true);
		setPositions({ x: e.pageX, y: e.pageY });
	};
	useEffect(() => {
		const handleClick = () => setShow(false);
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);

	return (
		<>
			<div className={cx('__matchBar')}>
				<div onContextMenu={handleContextMenu} className={cx('__matchBar__text', '__matchBar__position')} style={{}}>
					{props.date}
				</div>
				<div onContextMenu={handleContextMenu} className={cx('__matchBar__text', '__matchBar__position')}>
					<RefereeLogo className={cx('__matchBar__referee')}></RefereeLogo>

					{props.referee}
				</div>
				<div onContextMenu={handleContextMenu} className={cx('__matchBar__text', '__matchBar__position')}>
					<StadiumLogo className={cx('__matchBar__stadium')}></StadiumLogo>

					{props.stadiumName}
				</div>
				<div onContextMenu={handleContextMenu} className={cx('__matchBar__text', '__matchBar__position')}>
					<EyesLogo className={cx('__matchBar__attendance')}></EyesLogo>

					{props.spectators}
				</div>
			</div>
			<div></div>

			{show === true ? (
				<RightClickModal
					onClick={() => {
						setUpdateModal(true);
					}}
					x={positions.x}
					y={positions.y}></RightClickModal>
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
		</>
	);
};
