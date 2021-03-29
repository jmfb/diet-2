import React from 'react';
import EnterWeight from '~/components/EnterWeight';
import { IWeightsState } from '~/reducers/weights';

interface IHomeProps {
	weights: IWeightsState;
	onSaveWeight(date: string, weightInPounds: number): void;
}

export default class Home extends React.PureComponent<IHomeProps> {
	render() {
		const { weights, onSaveWeight } = this.props;
		const date = new Date().toISOString().substr(0, 10);
		const weightState = weights.weightStateByDate[date];
		return (
			<>
				<EnterWeight
					{...{date, weightState, onSaveWeight}}
					/>
				<div>TODO: The rest of home</div>
			</>
		);
	}
}
