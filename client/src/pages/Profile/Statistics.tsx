import React from 'react';
import { IProfile, weightCategories } from '~/models';
import { dateService, weightService } from '~/services';
import styles from './Statistics.css';

export interface IStatisticsProps {
	weightInPounds: number;
	profile: IProfile;
}

export default function Statistics(props: IStatisticsProps) {
	const { weightInPounds, profile: { targetWeightInPounds, heightInInches, birthDate } } = props;
	const weightInKilograms = weightService.toKilograms(weightInPounds);
	const heightInMeters = weightService.toMeters(heightInInches);
	const ageInYears = dateService.yearsOld(birthDate);
	const bodyMassIndex = weightService.computeBodyMassIndex(weightInPounds, heightInInches);
	const weightCategory = weightService.getWeightCategory(bodyMassIndex);
	const { name: weightCategoryName } = weightCategories[weightCategory];
	const targetWeightInKilograms = weightService.toKilograms(targetWeightInPounds);
	const targetBodyMassIndex = weightService.computeBodyMassIndex(targetWeightInPounds, heightInInches);
	const targetWeightCategory = weightService.getWeightCategory(targetBodyMassIndex);
	const { name: targetWeightCategoryName } = weightCategories[targetWeightCategory];

	return (
		<dl className={styles.root}>
			<dt>Weight (lbs)</dt>
			<dd>{weightInPounds}</dd>

			<dt>Weight (kg)</dt>
			<dd>{weightInKilograms}</dd>

			<dt>Height (in)</dt>
			<dd>{heightInInches}</dd>

			<dt>Height (m)</dt>
			<dd>{heightInMeters}</dd>

			<dt>Age (years)</dt>
			<dd>{ageInYears}</dd>

			<dt>Body Mass Index (kg/m²)</dt>
			<dd>{bodyMassIndex}</dd>

			<dt>Weight Category</dt>
			<dd>{weightCategoryName}</dd>

			<dt className={styles.firstTarget}>Target Weight (lbs)</dt>
			<dd className={styles.firstTarget}>{targetWeightInPounds}</dd>

			<dt>Target Weight (kg)</dt>
			<dd>{targetWeightInKilograms}</dd>

			<dt>Target Body Mass Index (kg/m²)</dt>
			<dd>{targetBodyMassIndex}</dd>

			<dt>Target Weight Category</dt>
			<dd>{targetWeightCategoryName}</dd>
		</dl>
	);
}
