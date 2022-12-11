import validator from 'validator';
import toastNotify from '../../../../utils/toast';

const validate = (username: string, password: string, email: string, passwordconfirm: string) => {
	const isID = validator.isEmpty(username);
	if (isID) {
		toastNotify('Please enter your ID', 'error');
		return false;
	}
	const isPassword = validator.isEmpty(password);
	if (isPassword) {
		toastNotify('Please enter your password', 'error');
		return false;
	}
	const isStrongPassword = validator.isStrongPassword(password);
	if (!isStrongPassword) {
		toastNotify('Your password too weak', 'error');
		return false;
	}
	const Email = validator.isEmpty(email);
	if (Email) {
		toastNotify('Please enter your email', 'error');
		return false;
	}
	const isEmail = validator.isEmail(email);
	if (!isEmail) {
		toastNotify('Email is not valid', 'error');
		return false;
	}

	const confirmPassword = validator.equals(passwordconfirm, password);
	if (!confirmPassword) {
		toastNotify('Please enter right password', 'error');
		return false;
	}
	return {
		username,
		password,
		email,
		passwordconfirm
	};
};

export default validate;
