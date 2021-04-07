class DateService {
	getToday() {
		const date = new Date(Date.now());
		date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		return this.convertDateToString(date);
	}

	convertTimeToString(time: number) {
		return this.convertDateToString(new Date(time));
	}

	convertDateToString(date: Date) {
		return date.toISOString().substr(0, 10);
	}

	parse(value: string) {
		const time = Date.parse(value);
		return Number.isNaN(time) ?
			undefined :
			this.convertTimeToString(time);
	}

	addDays(value: string, count: number) {
		const date = new Date(value);
		date.setDate(date.getDate() + count);
		return this.convertDateToString(date);
	}
}

const dateService = new DateService();
export default dateService;
