import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamInfoHeader.module.scss';
const cx = classNames.bind(styles);
type teamInfoHeaderProps = {
	name?: string;
	image?: string;
	color?: string;
};
export const TeamInfoHeader = (props: teamInfoHeaderProps) => {
	return (
		<div style={{ background: `${props.color}` }} className={`block`}>
			<div className={`${cx('__container')}`}>
				<div className={`${cx('__background')}`}>
					<div className={`${cx('__background__block')}`}>
						<img
							src={props.image}
							className={`${cx('__background__block--adjust')}`}
							alt=''
						/>
					</div>
				</div>
				<div className={`${cx('__teamLogoBlock')}`}>
					<div className={`${cx('__teamLogoBlock__container')}`}>
						<img
							className={`${cx('__teamLogoBlock__image')}`}
							src={props.image}
							alt=''
						/>
					</div>
				</div>
				<div className={`${cx('__teamInfo')}`}>
					<div className={`${cx('__teamInfo__middle')}`}>
						<div className={`${cx('__teamInfo__middle__name')}`}>
							{props.name}
						</div>
						<div className={`${cx('__teamInfo__middle__record')}`}>
							<span>0-0</span>
						</div>
					</div>
					<div className='inline-block relative '>
						<button className={`${cx('__infoButton')}`}>
							<span className={`${cx('__infoButton__text')}`}>FOLLOW ME</span>
						</button>
					</div>
				</div>
				<div className={`${cx('__rank')}`}>
					<div className={`${cx('__rank__block')}`}>
						<div className={`${cx('__rank__label')}`}>PPG</div>
						<div className={`${cx('__rank__ordinal')}`}>
							<span>-</span>
						</div>
						<div className={`${cx('__rank__value')}`}>-</div>
					</div>
					<div className={`${cx('__rank__block')}`}>
						<div className={`${cx('__rank__label')}`}>PPG</div>
						<div className={`${cx('__rank__ordinal')}`}>
							<span>-</span>
						</div>
						<div className={`${cx('__rank__value')}`}>-</div>
					</div>
					<div className={`${cx('__rank__block')}`}>
						<div className={`${cx('__rank__label')}`}>PPG</div>
						<div className={`${cx('__rank__ordinal')}`}>
							<span>-</span>
						</div>
						<div className={`${cx('__rank__value')}`}>-</div>
					</div>
					<div className={`${cx('__rank__block')}`}>
						<div className={`${cx('__rank__label')}`}>PPG</div>
						<div className={`${cx('__rank__ordinal')}`}>
							<span>-</span>
						</div>
						<div className={`${cx('__rank__value')}`}>-</div>
					</div>
				</div>
			</div>
		</div>
	);
};
