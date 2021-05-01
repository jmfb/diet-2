import React from 'react';
import PageLoading from '~/components/PageLoading';
import EnterWeight from './EnterWeight';
import WeightBadge from './WeightBadge';
import WeightSummary from './WeightSummary';
import dateService from '~/services/dateService';
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

	const targetWeightInPounds = profile?.targetWeightInPounds;
	const heightInInches = profile?.heightInInches;
	const weightState = weightStateByDate[today];
	const oneWeekAgo = dateService.addDays(today, -6);
	const oneMonthAgo = dateService.addDays(today, -30);
	const oneYearAgo = dateService.addDays(today, -365);

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
			<WeightSummary
				{...{
					targetWeightInPounds,
					weightStateByDate
				}}
				title='This Week'
				startDate={oneWeekAgo}
				/>
			<WeightSummary
				{...{
					targetWeightInPounds,
					weightStateByDate
				}}
				title='This Month'
				startDate={oneMonthAgo}
				/>
			<WeightSummary
				{...{
					targetWeightInPounds,
					weightStateByDate
				}}
				title='This Year'
				startDate={oneYearAgo}
				/>
		</>
	);
}
