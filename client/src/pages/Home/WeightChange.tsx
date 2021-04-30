import React from 'react';
import Pill from '~/components/Pill';
import weightService from '~/services/weightService';

export interface IWeightChangeProps {
	targetWeightInPounds?: number;
	weightsInPounds: number[];
	className?: string;
}

export default function WeightChange(props: IWeightChangeProps) {
	const { targetWeightInPounds, weightsInPounds, className } = props;
	if (weightsInPounds.length === 0) {
		return null;
	}

	const startingWeight = weightsInPounds[0];
	const endingWeight = weightsInPounds[weightsInPounds.length - 1];
	const changeInWeight = weightService.getChange(startingWeight, endingWeight);
	const isGoalWeightGain = targetWeightInPounds > startingWeight;
	const isSuccess = isGoalWeightGain ?
		changeInWeight >= 0 :
		changeInWeight <= 0;
	const isWeightGain = changeInWeight > 0;
	const sign = isWeightGain ? '+' : '';
	return (
		<Pill type={isSuccess ? 'success' : 'danger'} {...{className}}>
			{sign}{changeInWeight} lbs
		</Pill>
	);
}
