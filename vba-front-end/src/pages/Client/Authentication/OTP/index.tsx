import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from "./otp.module.scss";
import { Input } from '../Components/Input';
const cx = classNames.bind(styles);

export const OTP = () => {
	const navigate = useNavigate();
	// const otp = async e => {
	// 	e.preventDefault();
	// 	const otp = e.target.OTP.value;
	// 	const isvaliddata = validate(otp);
	// 	if (isvaliddata) {
	// 		const res = await checkotpsignupApi({ otp });
	// 		if (res.success) {
	// 			toastNotify('Success', 'success');
	// 			navigate('/signin');
	// 		} else {
	// 			toastNotify(res.err.message, 'error');
	// 		}
	// 	}
	// };
	return (
		<>
			<div className={cx('otp-block')}>
				<div className={cx('otp')}>
					<div className={cx('otp-heading')}>Sign in</div>
					<div className={cx('otp-form')}>
						<form onSubmit={()=>{}} className={cx('otp-form-adjust')}>
							<Input name='OTP' type={''}></Input>

							<div className={cx('otp-form-button')}>
								{/* <ButtonHipHop name='Go !'></ButtonHipHop> */}
								<p className={cx('otp-form-already')}>
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