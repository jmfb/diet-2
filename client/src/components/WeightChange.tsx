import React from 'react';
import Pill from './Pill';
import weightService from '~/services/weightService';

interface IWeightChangeProps {
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
	const isGoalWeightLoss = !targetWeightInPounds || targetWeightInPounds < startingWeight;
	const isSuccess = changeInWeight < 0 && isGoalWeightLoss;
	const isWeightGain = changeInWeight >= 0;
	return (
		<Pill type={isSuccess ? 'success' : 'danger'} className={className}>
			{isWeightGain &&
				'+'
			}
			{changeInWeight} lbs
		</Pill>
	);
}
