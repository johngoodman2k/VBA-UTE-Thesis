import validator from 'validator';
import toastNotify from '../../../utils/toast';



export const validate = (firstName:string,lastName:string,dateOfBirth:string,shirtNumber:string,country:string,weight:string,height:string,image?:File) => {
	const firstname = validator.isEmpty(firstName);
	if (firstname) {
		toastNotify('Please enter your first name', 'error');
		return false;
	}
	const lastname = validator.isEmpty(lastName);
	if (lastname) {
		toastNotify('Please enter your last name', 'error');
		return false;
	}
	const dateofbirth = validator.isEmpty(dateOfBirth);
	if (dateofbirth) {
		toastNotify('Please chosse your date of birth', 'error');
		return false;
	}
	const shirtnumber = validator.isEmpty(shirtNumber);
	if (shirtnumber) {
		toastNotify('Please enter your shirt number', 'error');
		return false;
	}

	const isCountry = validator.isEmpty(country);
	if (isCountry) {
		toastNotify('Please enter your country', 'error');
		return false;
	}

	const isWeight = validator.isEmpty(weight);
	if (isWeight) {
		toastNotify('Please enter your weight', 'error');
		return false;
	}
	const isHeight = validator.isEmpty(height);
	if (isHeight) {
		toastNotify('Please enter your height', 'error');
		return false;
	}

	if (!image) {
        toastNotify("Please choose your player image", "error");
        return false;
    }
	
	return {
		firstName,
		lastName,
		dateOfBirth,
		shirtNumber,
		country,
		weight,
		height,
		image
	};
};

export default validate;
