import validator from 'validator';
import toastNotify from '../../../utils/toast';

export const validate = (name: string) => {
	const seasonName = validator.isEmpty(name);
	if (seasonName) {
		toastNotify('Please enter your season name', 'error');
		return false;
	}
	
	return {
		name
	};
};

export default validate;
