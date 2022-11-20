export function setup(value: any) {
	const startDay = value.clone().startOf('month').isoWeekday(1);
	const endDay = value.clone().endOf('month').isoWeekday(7);
	const day = startDay.clone().subtract(1, 'day');
	const calendar = [];

	while (day.isBefore(endDay, 'day') || calendar.length < 6) {
		calendar.push(
			Array(7)
				.fill(0)
				.map(() => day.add(1, 'day').clone())
		);
	}
	return calendar;
}

export function isSelected(value: any, day: any) {
	if (value.isSame(day, 'day') && value.isSame(day, 'month')) {
	}
	return value.isSame(day, 'day');
}

export function beforeStartDayOfMonth(value: any, day: any) {
	const startDayOfMonth = value.clone().startOf('month');
	const endDayOfMonth = value.clone().endOf('month');
	return day.isBefore(startDayOfMonth, 'day') | day.isAfter(endDayOfMonth, 'day');
}

export function isToDay(day: any) {
	return day.isSame(new Date(), 'day');
}

export function isSelectedDayofWeek(value: any, week: any) {
	let isTrue = false;
	week.forEach((element: any) => {
		if (value.isSame(element, 'day')) {
			isTrue = true;
		}
	});
	return isTrue;
}

export function isSelectedStartAndEnd(value: any, day: any) {
	return value.clone().isoWeekday(1).isSame(day, 'day') | value.clone().isoWeekday(7).isSame(day, 'day');
}

export function dayStyle(value: any, day: any) {
	if (beforeStartDayOfMonth(value, day)) return 'beforestartday';
	if (isToDay(day)) return 'today';
}

export function daySelectedStyle(value: any, day: any, typeRadio: String) {
	if (typeRadio === 'theongay') {
		if (isSelected(value, day)) return 'selected';
	}
}

export function dayOfWeekStyle(value: any, day: any, typeRadio: String) {
	if (typeRadio === 'theotuan') {
		if (isSelectedStartAndEnd(value, day)) return 'dayselected';
	}
}

export function weekStyle(value: any, week: any, typeRadio: String) {
	if (typeRadio === 'theotuan') {
		if (isSelectedDayofWeek(value, week)) return 'selected';
	}
}

export function formatMonthAndYear(value: any) {
	return 'Tháng ' + value.format('M').toString() + ', ' + value.format('Y').toString();
}
