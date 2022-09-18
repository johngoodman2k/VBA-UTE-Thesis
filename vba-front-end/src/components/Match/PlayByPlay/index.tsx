import React, { useEffect, useState } from 'react';
import styles from './playByplay.module.scss';
import classNames from 'classnames/bind';
import { PlayByPlayTeam } from './components/PlayByPlayTeam';
import { PlayByPlayBlock } from './components/PlayByPlayBlock';
import { vbaContext } from '../../../Services/services';
import { id } from 'date-fns/locale';
import { Process } from '../../../Services/models';
const cx = classNames.bind(styles);

type PlayByPlayProps = {
	process: Process[] | undefined;
};

const processServices = vbaContext.getProcessServices();
export const PlayByPlay = (props: PlayByPlayProps) => {
	const [clickedId, setClickedId] = useState('');
	const [process, setProcess] = useState([]);
	console.log(props.process);
	// useEffect(() => {
	// 	async () => {
	// 		const res = await processServices.getProcessById();
	// 		setProcess(res);
	// 	};
	// });

	return (
		<div className={cx('__wrapper')}>
			<section className={cx('__block')}>
				<div className={cx('__container')}>
					<div className={cx('__quaterBlock')}>
						<nav className={cx('__quaterBlock__nav')}>
							<button
								id='Q1'
								onClick={(e: any) =>
									e.currentTarget.id === 'Q1' ? setClickedId('Q1') : ''
								}
								className={
									clickedId === 'Q1'
										? cx(
												'__quaterBlock__button',
												'__quaterBlock__button--active'
										  )
										: cx(
												'__quaterBlock__button',
												'__quaterBlock__button--inactive'
										  )
								}>
								Q1
							</button>
							<button
								id='Q2'
								onClick={(e: any) =>
									e.currentTarget.id === 'Q2' ? setClickedId('Q2') : ''
								}
								className={
									clickedId === 'Q2'
										? cx(
												'__quaterBlock__button',
												'__quaterBlock__button--active'
										  )
										: cx(
												'__quaterBlock__button',
												'__quaterBlock__button--inactive'
										  )
								}>
								Q2
							</button>
							<button
								id='Q3'
								onClick={(e: any) =>
									e.currentTarget.id === 'Q3' ? setClickedId('Q3') : ''
								}
								className={
									clickedId === 'Q3'
										? cx(
												'__quaterBlock__button',
												'__quaterBlock__button--active'
										  )
										: cx(
												'__quaterBlock__button',
												'__quaterBlock__button--inactive'
										  )
								}>
								Q3
							</button>
							<button
								id='Q4'
								onClick={(e: any) =>
									e.currentTarget.id === 'Q4' ? setClickedId('Q4') : ''
								}
								className={
									clickedId === 'Q4'
										? cx(
												'__quaterBlock__button',
												'__quaterBlock__button--active'
										  )
										: cx(
												'__quaterBlock__button',
												'__quaterBlock__button--inactive'
										  )
								}>
								Q4
							</button>
						</nav>
					</div>
					<PlayByPlayTeam></PlayByPlayTeam>
					{props.process?.map((x: any) => {
						return <PlayByPlayBlock side={x.side}></PlayByPlayBlock>;
					})}
				</div>
			</section>
		</div>
	);
};
