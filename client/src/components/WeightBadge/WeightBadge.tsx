import React from 'react';
import { useSelector } from 'react-redux';
import IState from '~/redux/IState';
import Weight from './Weight';
import BodyMassIndex from './BodyMassIndex';
import Goal from './Goal';
import styles from './WeightBadge.css';

export default function WeightBadge() {
	const profile = useSelector((state: IState) => state.profile.profile);
	const weightStateByDate = useSelector((state: IState) => state.weights.weightStateByDate);

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

	return (
		<div className={styles.root}>
			<Weight {...{startingWeight, mostRecentWeight}} />
			{heightInInches &&
				<BodyMassIndex {...{heightInInches, mostRecentWeight}} />
			}
			{targetWeightInPounds &&
				<Goal {...{mostRecentWeight, targetWeightInPounds}} />
			}
		</div>
	);
}
