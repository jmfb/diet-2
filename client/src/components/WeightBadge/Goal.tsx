import React from 'react';
import Row from './Row';
import Change from './Change';
import weightService from '~/services/weightService';

interface IGoalProps {
	mostRecentWeight: number;
	targetWeightInPounds: number;
}

export default function Goal(props: IGoalProps) {
	const { mostRecentWeight, targetWeightInPounds } = props;
	const changeInPounds = weightService.getChange(mostRecentWeight, targetWeightInPounds);
	return (
		<Row label='Goal'>
			{targetWeightInPounds} lbs <Change {...{changeInPounds}} />
		</Row>
	);
}
