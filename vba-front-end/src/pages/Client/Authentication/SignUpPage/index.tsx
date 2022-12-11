import React from 'react';
import classNames from 'classnames/bind';
import styles from './signUp.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../Components/Input';
import ButtonTournament from '../Components/ButtonTournament';
import validate from './validate';
import { vbaContext } from '../../../../Services/services';
import toastNotify from '../../../../utils/toast';

// import { signupApi } from '../../../Apis/auth.api';
// import validate from './validate';
// import toastNotify from '../../../Components/Toast';
const authenticateServices = vbaContext.getAuthenticateServices();
const cx = classNames.bind(styles);
export const SignUp = () => {
	const navigate = useNavigate();
	const signup = async (e: any) => {
		e.preventDefault();
		const username = e.target.Username.value;
		const password = e.target.Password.value;
		const passwordconfirm = e.target.PasswordConfirm.value;
		const email = e.target.Email.value;
		const validdata = validate(username, password, email, passwordconfirm);
		console.log(validdata);
		if (validdata) {
			try {
				const res = await authenticateServices?.signUpApi({
					username: username,
					password: password,
					email: email
				});
				console.log('30', res);
				if (res.success) {
					toastNotify('Please check OTP passcode in your email', 'success');
					// navigate('/otp');
				} else {
					toastNotify(res.err, 'error');
				}
			} catch (e: any) {
				alert('help');
				throw new Error('Method not implemented.');
			}
		}
	};
	return (
		<>
			<div className={cx('signup-block')}>
				<div className={cx('signup')}>
					<div className={cx('signup-heading')}>Sign up</div>
					<div className={cx('signup-form')}>
						<form onSubmit={signup} className={cx('signup-form-adjust')}>
							<Input type='text' name='Username'></Input>
							<Input type='password' name='Password'></Input>
							<Input type='password' name='PasswordConfirm'></Input>
							<Input type='email' name='Email'></Input>
							<div className={cx('signup-form-button')}>
								<ButtonTournament type='submit' name='Sign up'></ButtonTournament>

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
