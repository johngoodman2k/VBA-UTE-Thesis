import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './matchResultDetailBar.module.scss';
import { RightClickModal } from '../../Modal/RightClickModal';

type MatchResultDetailBarProps = {
	homeBadge?: string;
	homeName: string;
	homeResult: string;
	awayBadge: string;
	awayName: string;
	awayResult: string;
};

const cx = classNames.bind(styles);
export const MatchResultDetailBar = (props: MatchResultDetailBarProps) => {
	const [show, setShow] = React.useState(false);
	const [positions, setPositions] = React.useState({ x: 0, y: 0 });

	const handleContextMenu = (e: any) => {
		e.preventDefault();
		setShow(true);
		setPositions({ x: e.clientX, y: e.clientY });
		// context.current.style.transform = `translate(${positions.x}, ${positions.y})`;
	};
	useEffect(() => {
		const handleClick = () => setShow(false);
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);

	return (
		<div className={cx('__container')}>
			<div className={cx('__team', 'home')}>
				<a onContextMenu={handleContextMenu} className={cx('home__badgeContainer')}>
					<span className={cx('home__badgeContainer__image')}>
						<img className={cx('home__badgeContainer__image--adjust')} src={props.homeBadge}></img>
					</span>
				</a>

				<a onContextMenu={handleContextMenu} href='' className={cx('teamName', 'teamName__home')}>
					<span className={cx('teamName--adjust')}>{props.homeName}</span>
				</a>
			</div>

			<div className={cx('__scoreContainer')}>
				<div className={cx('__scoreContainer__score')}>
					{props.homeResult} - {props.awayResult}
				</div>
			</div>

			<div className={cx('__team', 'away')} onContextMenu={handleContextMenu}>
				<a href='' className={cx('teamName', 'teamName__away')}>
					<span className={cx('teamName--adjust')}>{props.awayName}</span>
				</a>
				<a className={cx('away__badgeContainer')}>
					<span className={cx('away__badgeContainer__image')}>
						<img className={cx('away__badgeContainer__image--adjust')} src={props.awayBadge}></img>
					</span>
				</a>
			</div>

			{show === true ? <RightClickModal x={positions.x} y={positions.y}></RightClickModal> : ''}
		</div>
	);
};
