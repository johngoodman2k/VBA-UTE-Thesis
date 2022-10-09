import React from 'react';
import classNames from "classnames/bind";
import styles from "./signUp.module.scss";

import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../Components/Input';
// import { signupApi } from '../../../Apis/auth.api';
// import validate from './validate';
// import toastNotify from '../../../Components/Toast';
const cx = classNames.bind(styles);
export const SignUp = () => {
	const navigate = useNavigate();
	// const signup = async e => {
	// 	e.preventDefault();
	// 	const username = e.target.Username.value;
	// 	const password = e.target.Password.value;
	// 	const passwordconfirm = e.target.PasswordConfirm.value;
	// 	const email = e.target.Email.value;
	// 	const validdata = validate(username, password, email, passwordconfirm);
	// 	if (validdata) {
	// 		const res = await signupApi({
	// 			username,
	// 			password,
	// 			email,
	// 			passwordconfirm
	// 		});

	// 		if (res.success) {
	// 			toastNotify('Please check OTP passcode in your email', 'warn');
	// 			navigate('/otp');
	// 		} else {
	// 			toastNotify(res.err.message, 'error');
	// 		}
	// 	}
	// };
	return (
		<>
			<div className={cx('signup-block')}>
				<div className={cx('signup')}>
					<div className={cx('signup-heading')}>Sign up</div>
					<div className={cx('signup-form')}>
						<form onSubmit={()=>{}} className={cx('signup-form-adjust')}>
							<Input type='text' name='Username'></Input>
							<Input type='password' name='Password'></Input>
							<Input type='password' name='PasswordConfirm'></Input>
							<Input type='email' name='Email'></Input>
							<div className='signup-form-button'>
								{/* <ButtonHipHop name='Submit'></ButtonHipHop> */}

								<p className={cx('signup-form-already')}>
									<span>Already have an account ?</span>
									<Link to='/signin'>Login</Link>
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