import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './forgotPassWord.module.scss';
import { Input } from '../Components/Input';
const cx = classNames.bind(styles);
export const ForgotPassword = () => {
	const navigate = useNavigate();
	// const forgotpassword = async e => {
	// 	e.preventDefault();
	// 	const username = e.target.Username.value;
	// 	const email = e.target.Email.value;
	// 	const validdata = validate(username, email);
	// 	if (validdata) {
	// 		const res = await forgotpasswordApi({ username, email });
	// 		console.log(res);
	// 		if (res.success) {
	// 			toastNotify('Please check OTP passcode in your email', 'warn');
	// 			navigate('/otpforgotpassword');
	// 		} else {
	// 			toastNotify(res.message, 'error');
	// 		}
	// 	}
	// };
	return (
		<>
			<div className={cx('forgotpassword-block')}>
				<div className={cx('forgotpassword')}>
					<div className={cx('forgotpassword-heading')}>Forgot Password</div>
					<div className={cx('forgotpassword-form')}>
						<form
							onSubmit={() => {}}
							className={cx('forgotpassword-form-adjust')}>
							<Input type='text' name='Username'></Input>
							<Input type='text' name='Email'></Input>
							<div className={cx('forgotpassword-form-button')}>
								{/* <ButtonHipHop name='Go !'></ButtonHipHop> */}
								<p className={cx('forgotpassword-form-already')}>
									<span>Didn't have an account ?</span>
									<Link to='/signup'>Sign up now</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
