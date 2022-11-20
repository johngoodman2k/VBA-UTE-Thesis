import React from 'react';
import styles from './editMatchInfoModal.module.scss';
import classNames from 'classnames/bind';
import { ModalBlock } from '../ModalBlock';

const cx = classNames.bind(styles);
type EditMatchInfoModalProps = {
	close: () => void;
};

export const EditMatchInfoModal = ({ close }: EditMatchInfoModalProps) => {
	const [clickedId, setClickedId] = React.useState('');

	// const handleClose = () => {
	//   close();
	// };
	return (
		<>
			<ModalBlock>
				<section className='container mx-auto text-left'>
					<div className='max-w-[70%] text-7xl font-bold uppercase'>UPDATE</div>
					<div className={`grid grid-cols-4   text-center ${cx('__modal__main')}`}>
						<div>
							<label className={`${cx('__modal__title')}`}>
								Date&nbsp;
								<div className='inline'>*</div>
							</label>
							<input id='mins' className={`${cx('__modal__input--goal')}`}></input>
						</div>
						<div>
							<label className={`${cx('__modal__title')}`}>
								Stadium&nbsp;
								<div className='inline'>*</div>
							</label>
							<input id='mins' className={`${cx('__modal__input--goal')}`}></input>
						</div>
						<div>
							<label className={`${cx('__modal__title')}`}>
								Referee&nbsp;
								<div className='inline'>*</div>
							</label>
							<input id='mins' className={`${cx('__modal__input--goal')}`}></input>
						</div>

						<div>
							<label className={`${cx('__modal__title')}`}>
								Spectators&nbsp;
								<div className='inline'>*</div>
							</label>
							<input id='mins' className={`${cx('__modal__input--goal')}`}></input>
						</div>
					</div>

					<div>
						<div className={cx('__modal__action')}>
							<div className={cx('__modal__action__wrapper')}>
								<ul className={cx('__modal__action__wrapper--adjust')}>
									<li>
										<button
											id='save'
											type='submit'
											// onClick={(e: any) => }
											className={clickedId === 'save' ? cx('__editActive') : ''}>
											Save
										</button>
									</li>
									<li>
										<button id='close' onClick={close} className={clickedId === 'close' ? cx('__editActive') : ''}>
											Close
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</ModalBlock>
		</>
	);
};
