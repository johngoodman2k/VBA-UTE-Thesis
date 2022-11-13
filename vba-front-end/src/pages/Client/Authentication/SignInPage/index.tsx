// import { Input } from '../../../Components/Input';
import './style.scss';
// import ButtonHipHop from '../../../Components/ButtonHipHop';
// import { Link } from 'react-router-dom';
// import { signinApi } from '../../../Apis/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../Components/Input';
// import Cookies from 'js-cookie';
// import validate from './validate';
// import toastNotify from '../../../Components/Toast';
import classNames from "classnames/bind";
import styles from "./signIn.module.scss";

const cx = classNames.bind(styles);
export const SignIn = () => {
	const navigate = useNavigate();
	// const signin = async e => {
	// 	e.preventDefault();
	// 	const username = e.target.Username.value;
	// 	const password = e.target.Password.value;
	// 	const isvaliddata = validate(username, password);
	// 	if (isvaliddata) {
	// 		const res = await signinApi({ username, password });
	// 		if (res.success) {
	// 			Cookies.set('jwt', res.token);
	// 			toastNotify('Welcome to HipHop Viet', 'success');
	// 			setSuccess(success ? false : true);
	// 			navigate('/');
	// 		} else {
	// 			toastNotify(res.message, 'error');
	// 		}
	// 	}
	// };

	return (
		<>
			<div className={cx('signin-block')}>
				<div className={cx('signin')}>
					<div className={cx('signin-heading')}>Sign in</div>
					<div className={cx('signin-form')}>
						<form
							autoComplete='off'
							// onSubmit={signin}
							className={cx('signin-form-adjust')}>
							<Input type='text' name='Username'></Input>

							<Input type='password' name='Password'></Input>

							<div className={cx('signin-form-button')}>
								{/* <Link to='/main'> */}
								{/* <ButtonHipHop name='Go !'></ButtonHipHop> */}
								{/* </Link> */}

								<p className={cx('signin-form-already')}>
									<span>Didn't have an account ?</span>
									<Link to='/signup'>Sign up now</Link>
								</p>
								<p className={cx('adjust')}>
									<Link to='/forgotpassword'>Forgot your Password</Link>
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