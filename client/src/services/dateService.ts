class DateService {
	getToday() {
		return this.convertTimeToString(Date.now());
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
