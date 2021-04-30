import React from 'react';
import Weight from './Weight';
import BodyMassIndex from './BodyMassIndex';
import Goal from './Goal';
import { IWeightStateByDate } from '~/redux/weights';
import styles from './WeightBadge.css';

export interface IWeightBadgeProps {
	targetWeightInPounds?: number;
	heightInInches?: number;
	weightStateByDate: IWeightStateByDate;
}

export default function WeightBadge(props: IWeightBadgeProps) {
	const { targetWeightInPounds, heightInInches, weightStateByDate } = props;
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
