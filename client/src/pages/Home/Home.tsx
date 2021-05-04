import React from 'react';
import { PageLoading } from '~/components';
import EnterWeight from './EnterWeight';
import WeightBadge from './WeightBadge';
import WeightSummary from './WeightSummary';
import { dateService } from '~/services';
import { weightsDuck } from '~/redux';
import { IProfile, IWeightModel } from '~/models';

export interface IHomeProps {
	weights: weightsDuck.IWeightsState;
	profile?: IProfile;
	today: string;
	onSaveWeight(weight: IWeightModel): void;
}

export default function Home(props: IHomeProps) {
	const { weights: { weightStateByDate, isLoading, isLoaded }, today, onSaveWeight, profile } = props;

	if (isLoading || !profile) {
		return <PageLoading message='Loading weights from the server...' />;
	}

	if (!isLoaded) {
		return null;
	}

	const targetWeightInPounds = profile.targetWeightInPounds;
	const heightInInches = profile.heightInInches;
	const weightState = weightStateByDate[today];
	const graphs = {
		['This Week']: 6,
		['This Month']: 30,
		['This Year']: 365
	};

	return (
		<>
			<EnterWeight
				{...{
					weightState,
					onSaveWeight
				}}
				date={today}
				/>
			<WeightBadge
				{...{
					targetWeightInPounds,
					heightInInches,
					weightStateByDate
				}}
				/>
			{Object.entries(graphs).map(([title, daysAgo]) =>
				<WeightSummary
					key={daysAgo}
					{...{
						targetWeightInPounds,
						weightStateByDate,
						title
					}}
					startDate={dateService.addDays(today, -daysAgo)}
					/>
			)}
		</>
	);
}
