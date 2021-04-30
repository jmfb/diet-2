import { WeightCategory, weightCategories } from '~/models';

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
			.entries(weightCategories)
			.filter(([, metadata]) => bodyMassIndex < metadata.upperBoundBodyMassIndex)
			.sort(([,a], [,b]) => a.upperBoundBodyMassIndex - b.upperBoundBodyMassIndex)
			[0][0];
		return Number.parseInt(weightCategoryString, 10) as WeightCategory;
	}
}

const weightService = new WeightService();
export default weightService;
