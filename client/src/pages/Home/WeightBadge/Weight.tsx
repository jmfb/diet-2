import React from 'react';
import Row from './Row';
import Change from './Change';
import { weightService } from '~/services';

export interface IWeightProps {
	startingWeight: number;
	mostRecentWeight: number;
}

export default function Weight(props: IWeightProps) {
	const { startingWeight, mostRecentWeight } = props;
	const changeInPounds = weightService.getChange(startingWeight, mostRecentWeight);
	return (
		<Row label='Weight'>
			{startingWeight} lbs ➜ {mostRecentWeight} lbs <Change {...{changeInPounds}} />
		</Row>
	);
}
