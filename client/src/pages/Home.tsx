import React from 'react';
import PageLoading from '~/components/PageLoading';
import EnterWeight from '~/components/EnterWeight';
import WeightBadge from '~/components/WeightBadge';
import WeightSummary from '~/components/WeightSummary';
import dateService from '~/services/dateService';
import { IWeightsState } from '~/redux/weights';
import { IProfile, IWeightModel } from '~/models';

interface IHomeProps {
	weights: IWeightsState;
	profile?: IProfile;
	today: string;
	onSaveWeight(weight: IWeightModel): void;
}

export default function Home(props: IHomeProps) {
	const { weights: { weightStateByDate, isLoading, isLoaded }, today, onSaveWeight } = props;
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
					<WeightBadge />
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
