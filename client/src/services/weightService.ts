import { WeightCategory, weightCategoryExclusiveUpperBound } from '~/models';

class WeightService {
	getChange(startingWeight: number, endingWeight: number) {
		return Math.round((endingWeight - startingWeight) * 10) / 10;
	}

	computeBodyMassIndex(weightInPounds: number, heightInInches: number) {
		const weightInKilograms = weightInPounds * 0.453592;
		const heightInMeters = heightInInches * 0.0254;
		const bodyMassIndex = weightInKilograms / Math.pow(heightInMeters, 2);
		return Math.round(bodyMassIndex * 10) / 10;
	}

	getWeightCategory(bodyMassIndex: number) {
		const weightCategoryString = Object
			.entries(weightCategoryExclusiveUpperBound)
			.filter(([weightCategory, exclusiveUpperBound]) => bodyMassIndex < exclusiveUpperBound)
			.sort(([,a], [,b]) => a - b)
			[0][0];
		return Number.parseInt(weightCategoryString, 10) as WeightCategory;
	}
}

const weightService = new WeightService();
export default weightService;
