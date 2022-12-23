import React from 'react';
import classNames from 'classnames/bind';
import styles from './teamUpComingGames.module.scss';
import { UpComingGamesBlock } from '../UpComingGamesBlock';
import { Match, Team } from '../../../../Services/models';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

type TeamUpCommingGamesProps = {
	fixtures?: Match[];
	id?: string;
}
export const TeamUpCommingGames = ({ fixtures, id }: TeamUpCommingGamesProps) => {
	return (
		<div className={`${cx('__container')}`}>
			<div className={`${cx('__innerBlock')}`}>
				<div className={`${cx('__innerBlock__section')}`}>
					<section className={`${cx('__sectionFull')}`}>
						<div className={`${cx('__innerBlock__content')}`}>
							<div className={`${cx('__titleBlock')}`}>
								<h1 className='uppercase font-normal leading-3 text-2xl'>
									Lịch thi đấu
								</h1>
								<div className='flex justify-center items-center'>
									{/* <Link to={`/teaminfofixtures/`}> */}
									{id && <Link to={`/teaminfofixtures/${id}`}>
										<a className='font-normal text-xs leading-5 text-teal-600 mr-2'>
											Xem thêm
										</a></Link>}

									{/* </Link> */}
								</div>
							</div>
							<div className={`${cx('__content')}`}>
								<div>
									{fixtures?.map((x: Match) =>
										<UpComingGamesBlock fixtures={x}></UpComingGamesBlock>
									)}
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};
