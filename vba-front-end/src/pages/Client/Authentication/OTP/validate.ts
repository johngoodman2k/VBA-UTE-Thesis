import validator from 'validator';
import toastNotify from '../../../../utils/toast';

const validate = (otp: string) => {
	const isOTP = validator.isEmpty(otp);
	if (isOTP) {
		toastNotify('Please enter OTP', 'error');
		return false;
	}

	return {
		otp
	};
};

export default validate;
