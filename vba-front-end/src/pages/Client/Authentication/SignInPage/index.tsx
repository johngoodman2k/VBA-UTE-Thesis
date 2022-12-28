// import { Input } from '../../../Components/Input';
// import ButtonHipHop from '../../../Components/ButtonHipHop';
// import { Link } from 'react-router-dom';
// import { signinApi } from '../../../Apis/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../Components/Input';
// import Cookies from 'js-cookie';
// import validate from './validate';
// import toastNotify from '../../../Components/Toast';
import classNames from 'classnames/bind';
import styles from './signIn.module.scss';
import ButtonTournament from '../Components/ButtonTournament';
import { vbaContext } from '../../../../Services/services';
import validate from './validate';
import toastNotify from '../../../../utils/toast';
import { Result, User } from '../../../../Services/models';
import Cookies from 'js-cookie';
import { setRef } from '@mui/material';
const authenticateServices = vbaContext.getAuthenticateServices();

const cx = classNames.bind(styles);
// type SignInProps = {
// 	setSuccessLogin: React.Dispatch<React.SetStateAction<boolean>>;
// 	successLogin: boolean;
// }
export const SignIn = () => {
	const navigate = useNavigate();
	const signin = async (e: any) => {
		e.preventDefault();
		const username = e.target.Username.value;
		const password = e.target.Password.value;
		const isvaliddata = validate(username, password);

		if (isvaliddata) {
			const res = authenticateServices
				.signInApi({ username: username, password: password })
				.then(async (r: any) => {
					if (r.success) {
						Cookies.set('jwt', r.token);
						
						const cookies = Cookies.get('jwt');
						console.log(cookies)
						if(cookies){
							const user = await vbaContext.getAuthenticateServices().userInfo(cookies)
							Cookies.set('name', user.name?? "");
							Cookies.set('role', user.role?.toString()?? "");

						}
						

						toastNotify('Welcome to VBA', 'success');
						// setSuccess(success ? false : true);
						navigate('/home');
					}
				})
				.catch((e: any) => {
					toastNotify('Username or Password is invalid.', 'error');
					throw new Error(e);
				});
		}
	};

	return (
		<>
			<div className={cx('signin-block')}>
				<div className={cx('signin')}>
					<div className={cx('signin-heading')}>Sign in</div>
					<div className={cx('signin-form')}>
						<form autoComplete='off' onSubmit={signin} className={cx('signin-form-adjust')}>
							<Input type='text' name='Username'></Input>

							<Input type='password' name='Password'></Input>

							<div className={cx('signin-form-button')}>
								{/* <Link to='/main'>
									
								</Link> */}
								<ButtonTournament name='Go !' type='submit'></ButtonTournament>
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
