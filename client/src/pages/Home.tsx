import React from 'react';
import EnterWeight from '~/components/EnterWeight';
import PageLoading from '~/components/PageLoading';
import WeightSummary from '~/components/WeightSummary';
import dateService from '~/services/dateService';
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
		const oneWeekAgo = dateService.addDays(today, -6);
		const oneMonthAgo = dateService.addDays(today, -30);
		const oneYearAgo = dateService.addDays(today, -365);
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
						<WeightSummary
							title='This Week'
							startDate={oneWeekAgo}
							/>
						<WeightSummary
							title='This Month'
							startDate={oneMonthAgo}
							/>
						<WeightSummary
							title='This Year'
							startDate={oneYearAgo}
							/>
					</>
				}
			</>
		);
	}
}
