import React from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './newPassWord.module.scss';
import { Input } from '../Components/Input';
import ButtonTournament from '../Components/ButtonTournament';
const cx = classNames.bind(styles);
export const NewPassword = () => {
	// const { otp } = useParams();
	// const navigate = useNavigate();
	// const newpassword = async e => {
	// 	e.preventDefault();
	// 	const newpassword = e.target.NewPassword.value;
	// 	const newpasswordconfirm = e.target.ConfirmPassword.value;
	// 	const isvaliddata = validate(newpassword, newpasswordconfirm);
	// 	if (isvaliddata) {
	// 		const res = await newpasswordApi({
	// 			newpassword,
	// 			newpasswordconfirm,
	// 			otp
	// 		});

	// 		if (res.success) {
	// 			toastNotify('Your password is reseted', 'success');
	// 			navigate('/signin');
	// 		} else {
	// 			toastNotify(res.message, 'error');
	// 		}
	// 	}
	// };
	return (
		<>
			<div className={cx('newpassword-block')}>
				<div className={cx('newpassword')}>
					<div className={cx('newpassword-heading')}>New Password</div>
					<div className={cx('newpassword-form')}>
						<form onSubmit={() => {}} className={cx('newpassword-form-adjust')}>
							<Input name='NewPassword' type={''}></Input>
							<Input name='ConfirmPassword' type={''}></Input>
							<div className={cx('newpassword-form-button')}>
								<ButtonTournament type='submit' name='Go !'></ButtonTournament>
								<p className={cx('newpassword-form-already')}>
									<span>Didn't have an account ?</span>
									<Link to='/signup'>Sign up</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
