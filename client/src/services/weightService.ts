import { WeightCategory, weightCategories } from '~/models';
import { IWeightStateByDate } from '~/models';

export function round(value: number, places?: number) {
	if (places === undefined) {
		return value;
	}
	const pow10 = Math.pow(10, places);
	return Math.round(value * pow10) / pow10;
}

export function getChange(startingWeight: number, endingWeight: number) {
	return round(endingWeight - startingWeight, 1);
}

export function toKilograms(pounds: number, places = 1) {
	return round(pounds * 0.453592, places);
}

export function toMeters(inches: number, places = 1) {
	return round(inches * 0.0254, places);
}

export function computeBodyMassIndex(weightInPounds: number, heightInInches: number) {
	const weightInKilograms = toKilograms(weightInPounds, undefined);
	const heightInMeters = toMeters(heightInInches, undefined);
	const bodyMassIndex = weightInKilograms / Math.pow(heightInMeters, 2);
	return round(bodyMassIndex, 1);
}

export function getWeightCategory(bodyMassIndex: number) {
	const weightCategoryString = Object
		.entries(weightCategories)
		.filter(([, metadata]) => bodyMassIndex < metadata.upperBoundBodyMassIndex)
		.sort(([,a], [,b]) => a.upperBoundBodyMassIndex - b.upperBoundBodyMassIndex)
		[0][0];
	return Number.parseInt(weightCategoryString, 10) as WeightCategory;
}

export function getStartingWeight(weightStateByDate: IWeightStateByDate) {
	const dates = Object.keys(weightStateByDate).sort();
	const minDate = dates[0];
	return weightStateByDate[minDate]?.weightInPounds;
}

export function getMostRecentWeight(weightStateByDate: IWeightStateByDate) {
	const dates = Object.keys(weightStateByDate).sort();
	const maxDate = dates[dates.length - 1];
	return weightStateByDate[maxDate]?.weightInPounds;
}

export function getWeightsOnOrAfter(weightStateByDate: IWeightStateByDate, startDate: string) {
	return Object
		.keys(weightStateByDate)
		.filter(date => date >= startDate)
		.sort()
		.map(date => weightStateByDate[date].weightInPounds);
}
