import React from 'react';
import validator from 'validator';

export const validate = (
	id: any,
	name: any,
	description: any,
	startDate: any,
	endDate: any
) => {
	const isID = validator.isEmpty(id);
	if (isID) {
		console.log('Please enter your ID', 'error');
		return false;
	}
	const isName = validator.isEmpty(name);
	if (isName) {
		console.log('Please enter your tournament name', 'error');
		return false;
	}
	const isDescription = validator.isEmpty(description);
	if (isDescription) {
		console.log('You have not entered any description', 'warning');
		return false;
	}
	const isStartDate = validator.isEmpty(startDate);
	if (isStartDate) {
		console.log('Please choose your start date', 'error');
		return false;
	}
	const isEndDate = validator.isEmpty(startDate);
	if (isEndDate) {
		console.log('Please choose your end date', 'error');
		return false;
	}

	// const confirmPassword = validator.equals(passwordconfirm, password);
	// if (!confirmPassword) {
	//   toastNotify('Please enter right password', 'error');
	//   return false;
	// }
	return {
		id,
		name,
		description,
		startDate,
		endDate
	};
};
