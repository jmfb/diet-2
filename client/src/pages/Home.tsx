import React from 'react';
import EnterWeight from '~/components/EnterWeight';
import PageLoading from '~/components/PageLoading';
import { IWeightsState } from '~/reducers/weights';

interface IHomeProps {
	weights: IWeightsState;
	onSaveWeight(date: string, weightInPounds: number): void;
}

export default class Home extends React.PureComponent<IHomeProps> {
	render() {
		const { weights: { weightStateByDate, isLoading, isLoaded }, onSaveWeight } = this.props;
		const date = new Date().toISOString().substr(0, 10);
		const weightState = weightStateByDate[date];
		return (
			<>
				{isLoading &&
					<PageLoading message='Loading weights from the server...' />
				}
				{isLoaded &&
					<>
						<EnterWeight
							{...{date, weightState, onSaveWeight}}
							/>
						<div>TODO: The rest of home</div>
					</>
				}
			</>
		);
	}
}
