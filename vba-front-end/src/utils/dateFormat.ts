import { format } from 'date-fns';
export const dateFormat = (date?: Date | string) => {
	if (!date) return;
	// console.log(date)
	return format(new Date(date), 'dd MMMM yyyy');
};

export const shortDateFormat = (date?: Date | string) => {
	if (!date) return;
	// console.log(date)
	return format(new Date(date), 'dd/MM/yyyy');
};

export const timeFormat = (date?: Date | string) => {
	if (!date) return "";
	return format(new Date(date), ' HH:mm:ss');
};

export const convertToDateTime = (date: Date | string | undefined): string | undefined => {
	let rs: Date = date as any
	if (!date || date === "") return;
	if (typeof date === 'string') {
		rs = new Date(rs)
	}
	const time = rs.toLocaleTimeString().slice(0, 5)
	let date1 = rs.getDate() >= 10 ? rs.getDate() : "0" + rs.getDate()
	const month = rs.getMonth() + 1
	const month1 = month >= 10 ? month : "0" + month

	const datelc = rs.getFullYear() + "-" + month1 + "-" + date1
	return datelc + "T" + time

}

export const calculateAge = (dateOfBirth?: Date | string) => {
	if (!dateOfBirth) return 0;
	let date = dateOfBirth as Date
	if (typeof dateOfBirth === "string") date = new Date(dateOfBirth);
	let now = new Date()
	let rs = now.getFullYear() - date.getFullYear()
	return rs
} 