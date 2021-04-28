import React from 'react';
import { useSelector } from 'react-redux';
import WeightGraph from './WeightGraph';
import WeightChange from './WeightChange';
import IState from '~/redux/IState';
import styles from './WeightSummary.scss';

interface IWeightSummaryProps {
	title: string;
	startDate: string;
}

export default function WeightSummary(props: IWeightSummaryProps) {
	const { title, startDate } = props;
	const targetWeightInPounds = useSelector((state: IState) => state.profile.profile?.targetWeightInPounds);
	const weightsInPounds = useSelector((state: IState) => Object
		.keys(state.weights.weightStateByDate)
		.filter(date => date >= startDate)
		.map(date => state.weights.weightStateByDate[date].weightInPounds));

	return (
		<div className={styles.root}>
			<h2>
				{title}
				<WeightChange
					{...{
						targetWeightInPounds,
						weightsInPounds
					}}
					className={styles.change}
					/>
			</h2>
			<WeightGraph
				{...{
					startDate,
					targetWeightInPounds,
					weightsInPounds
				}}
				/>
		</div>
	);
}
