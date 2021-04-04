import React from 'react';
import EnterWeight from '~/components/EnterWeight';
import PageLoading from '~/components/PageLoading';
import { IWeightsState } from '~/reducers/weights';
import { IProfile } from '~/models';

interface IHomeProps {
	weights: IWeightsState;
	profile?: IProfile;
	today: string;
	onSaveWeight(date: string, weightInPounds: number): void;
}

export default class Home extends React.PureComponent<IHomeProps> {
	render() {
		const { weights: { weightStateByDate, isLoading, isLoaded }, today, onSaveWeight } = this.props;
		const weightState = weightStateByDate[today];
		return (
			<>
				{isLoading &&
					<PageLoading message='Loading weights from the server...' />
				}
				{isLoaded &&
					<>
						<EnterWeight
							{...{weightState, onSaveWeight}}
							date={today}
							/>
						<div>TODO: The rest of home</div>
					</>
				}
			</>
		);
	}
}
