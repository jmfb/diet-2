import React from 'react';
import Weight from './Weight';
import BodyMassIndex from './BodyMassIndex';
import Goal from './Goal';
import { IWeightStateByDate } from '~/models';
import * as weightService from '~/services/weightService';
import styles from './WeightBadge.css';

export interface IWeightBadgeProps {
	targetWeightInPounds?: number;
	heightInInches?: number;
	weightStateByDate: IWeightStateByDate;
}

export default function WeightBadge(props: IWeightBadgeProps) {
	const { targetWeightInPounds, heightInInches, weightStateByDate } = props;
	const startingWeight = weightService.getStartingWeight(weightStateByDate);
	const mostRecentWeight = weightService.getMostRecentWeight(weightStateByDate);
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
