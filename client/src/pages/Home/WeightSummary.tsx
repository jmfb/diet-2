import React from 'react';
import WeightGraph from './WeightGraph';
import WeightChange from './WeightChange';
import { IWeightStateByDate } from '~/redux/weights';
import styles from './WeightSummary.css';

export interface IWeightSummaryProps {
	title: string;
	startDate: string;
	targetWeightInPounds?: number;
	weightStateByDate: IWeightStateByDate;
}

export default function WeightSummary(props: IWeightSummaryProps) {
	const { title, startDate, targetWeightInPounds, weightStateByDate } = props;
	const weightsInPounds = Object
		.keys(weightStateByDate)
		.filter(date => date >= startDate)
		.sort()
		.map(date => weightStateByDate[date].weightInPounds);

	return (
		<div className={styles.root}>
			<h2 className={styles.h2}>
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
