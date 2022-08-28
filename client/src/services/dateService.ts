export function getToday() {
	const date = new Date(Date.now());
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return convertDateToString(date);
}

export function convertTimeToString(time: number) {
	return convertDateToString(new Date(time));
}

export function convertDateToString(date: Date) {
	return date.toISOString().substr(0, 10);
}

export function parse(value: string) {
	const time = Date.parse(value);
	return Number.isNaN(time) ? undefined : convertTimeToString(time);
}

export function addDays(value: string, count: number) {
	const date = new Date(value);
	date.setDate(date.getDate() + count);
	return convertDateToString(date);
}

export function yearsOld(value: string) {
	const now = new Date(Date.now());
	const birthDate = new Date(Date.parse(value));
	const yearsSinceBirthdate = now.getFullYear() - birthDate.getUTCFullYear();
	const isBeforeBirthdayMonthThisYear =
		now.getMonth() < birthDate.getUTCMonth();
	const isBeforeBirthdayDayThisMonth =
		now.getMonth() === birthDate.getUTCMonth() &&
		now.getDate() < birthDate.getUTCDate();
	if (isBeforeBirthdayMonthThisYear || isBeforeBirthdayDayThisMonth) {
		return yearsSinceBirthdate - 1;
	}
	return yearsSinceBirthdate;
}
