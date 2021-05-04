import React from 'react';
import Row from './Row';
import { weightService } from '~/services';
import { weightCategories } from '~/models';

export interface IBodyMassIndexProps {
	heightInInches: number;
	mostRecentWeight: number;
}

export default function BodyMassIndex(props: IBodyMassIndexProps) {
	const { heightInInches, mostRecentWeight } = props;
	const bodyMassIndex = weightService.computeBodyMassIndex(mostRecentWeight, heightInInches);
	const weightCategory = weightService.getWeightCategory(bodyMassIndex);
	const weightCategoryName = weightCategories[weightCategory].name;
	return (
		<Row label='BMI'>
			{bodyMassIndex} kg/m² ({weightCategoryName})
		</Row>
	);
}
