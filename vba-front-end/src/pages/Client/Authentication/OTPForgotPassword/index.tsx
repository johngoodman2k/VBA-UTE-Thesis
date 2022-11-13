import React from 'react';
// import { Input } from '../../../Components/Input';
// import './style.scss';
// import ButtonHipHop from '../../../Components/ButtonHipHop';
import { Link, useNavigate } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from "./otpForgotPassword.module.scss";
import { Input } from '../Components/Input';
const cx = classNames.bind(styles);
// import toastNotify from '../../../Components/Toast';
// import { otpForgotPasswordApi } from '../../../Apis/auth.api';
// import validate from './validate';
// import Cookies from 'js-cookie';
export const OTPForgotPassword = () => {
	const navigate = useNavigate();
	// const otpforgot = async e => {
	// 	e.preventDefault();
	// 	const otp = e.target.OTP.value;
	// 	const validdata = validate(otp);
	// 	if (validdata) {
	// 		const res = await otpForgotPasswordApi({ otp });
	// 		if (res.success) {
	// 			toastNotify('Please enter your new password', 'success');
	// 			navigate(`/newpassword/${otp}`);
	// 		} else {
	// 			toastNotify(res.message, 'error');
	// 		}
	// 	}
	// };

	return (
		<>
			<div className={cx('otpforgotpassword-block')}>
				<div className={cx('otpforgotpassword')}>
					<div className={cx('otpforgotpassword-heading')}>Forgot Password</div>
					<div className={cx('otpforgotpassword-form')}>
						<form
							onSubmit={()=>{}}
							className={cx('otpforgotpassword-form-adjust')}>
							<Input name='OTP' type={''}></Input>

							<div className={cx('otpforgotpassword-form-button')}>
								{/* <ButtonHipHop name='Go !'></ButtonHipHop> */}
								<p className={cx('otpforgotpassword-form-already')}>
									<span>Verify passcode has been sent to your email</span>
									<Link to='/https://mail.google.com/mail/u/0/'>
										Check now !
									</Link>
								</p>
								<p className={cx('adjust-1')}>
									<Link to='/'>Back to Town</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};