import validator from 'validator';
import toastNotify from '../../../utils/toast';



export const validate = (firstName:string,lastName:string,dateOfBirth:string,shirtNumber:string,country:string,weight:string,height:string,experience:string,position:string,image?:File) => {
	const firstname = validator.isEmpty(firstName);
	if (firstname) {
		toastNotify('Vui lòng nhập họ', 'error');
		return false;
	}
	const lastname = validator.isEmpty(lastName);
	if (lastname) {
		toastNotify('Vui lòng nhập tên', 'error');
		return false;
	}
	const dateofbirth = validator.isEmpty(dateOfBirth);
	if (dateofbirth) {
		toastNotify('Vui lòng chọn ngày sinh của cầu thủ', 'error');
		return false;
	}
	const shirtnumber = validator.isEmpty(shirtNumber);
	if (shirtnumber) {
		toastNotify('Vui lòng điền số áo cho cầu thủ', 'error');
		return false;
	}

	const isCountry = validator.isEmpty(country);
	if (isCountry) {
		toastNotify('Vui lòng chọn quốc tịch cho cầu thủ', 'error');
		return false;
	}

	const isWeight = validator.isEmpty(weight);
	if (isWeight) {
		toastNotify('Vui lòng điền số cân nậng của cầu thủ', 'error');
		return false;
	}
	const isHeight = validator.isEmpty(height);
	if (isHeight) {
		toastNotify('Vui lòng điền số chiều cao của cầu thủ', 'error');
		return false;
	}
	const isExperience = validator.isEmpty(experience);
	if (isExperience) {
		toastNotify('Vui lòng điền số kinh nghiệm của cầu thủ', 'error');
		return false;
	}

	const isPosition = validator.isEmpty(position);
	if (isPosition) {
		toastNotify('Vui lòng chọn vị trí cho cầu thủ', 'error');
		return false;
	}

	if (!image) {
        toastNotify("Vui lòng chọn hình cầu thủ", "error");
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
		experience,
		position,
		image
	};
};

export default validate;
