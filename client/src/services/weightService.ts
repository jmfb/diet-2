class WeightService {
	getChange(startingWeight: number, endingWeight: number) {
		return Math.round((endingWeight - startingWeight) * 10) / 10;
	}
}

const weightService = new WeightService();
export default weightService;
