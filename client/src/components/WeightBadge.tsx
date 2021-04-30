import React from 'react';
import { useSelector } from 'react-redux';
import IState from '~/redux/IState';
import weightService from '~/services/weightService';
import { weightCategories } from '~/models';
import styles from './WeightBadge.css';

export default function WeightBadge() {
	const { weightStateByDate, profile } = useSelector((state: IState) => ({
		weightStateByDate: state.weights.weightStateByDate,
		profile: state.profile.profile
	}));
	const targetWeightInPounds = profile?.targetWeightInPounds;
	const heightInInches = profile?.heightInInches;
	const dates = Object.keys(weightStateByDate).sort();
	const minDate = dates[0];
	const maxDate = dates[dates.length - 1];
	const startingWeight = weightStateByDate[minDate]?.weightInPounds;
	const mostRecentWeight = weightStateByDate[maxDate]?.weightInPounds;
	if (!startingWeight) {
		return null;
	}

	const changeInWeight = weightService.getChange(startingWeight, mostRecentWeight);
	const remainingChange = targetWeightInPounds ?
		weightService.getChange(mostRecentWeight, targetWeightInPounds) :
		undefined;
	const bodyMassIndex = heightInInches ?
		weightService.computeBodyMassIndex(mostRecentWeight, heightInInches) :
		undefined;
	const weightCategory = weightService.getWeightCategory(bodyMassIndex);
	const weightCategoryName = weightCategories[weightCategory].name;

	return (
		<div className={styles.root}>
			<div className={styles.row}>
				<span className={styles.label}>Weight</span>
				{startingWeight} lbs ➜ {mostRecentWeight} lbs ({changeInWeight >= 0 ? '+' : ''}{changeInWeight} lbs)
			</div>
			{heightInInches &&
				<div className={styles.row}>
					<span className={styles.label}>BMI</span>
					{bodyMassIndex} kg/m² ({weightCategoryName})
				</div>
			}
			{targetWeightInPounds &&
				<div className={styles.row}>
					<span className={styles.label}>Goal</span>
					{targetWeightInPounds} lbs ({remainingChange >= 0 ? '+' : ''}{remainingChange} lbs)
				</div>
			}
		</div>
	);
}
