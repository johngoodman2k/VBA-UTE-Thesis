import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamInfoHeader.module.scss';
const cx = classNames.bind(styles);
export const TeamInfoHeader = () => {
	return (
		<div className='block bg-[#008348]'>
			<div className={`${cx('__container')}`}>
				<div className={`${cx('__background')}`}>
					<div className={`${cx('__background__block')}`}>
						<img
							src='https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
							className={`${cx('__background__block--adjust')}`}
							alt=''
						/>
					</div>
				</div>
				<div className={`${cx('__teamLogoBlock')}`}>
					<div className={`${cx('__teamLogoBlock__container')}`}>
						<img
							className={`${cx('__teamLogoBlock__image')}`}
							src='https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg'
							alt=''
						/>
					</div>
				</div>
				<div className={`${cx('__teamInfo')}`}>
					<div className={`${cx('__teamInfo__middle')}`}>
						<div className={`${cx('__teamInfo__middle__name')}`}>
							BOSTON CELTICS
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
