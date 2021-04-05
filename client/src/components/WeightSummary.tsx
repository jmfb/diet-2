import React from 'react';
import WeightGraph from './WeightGraph';
import styles from './WeightSummary.scss';

interface IWeightSummaryProps {
	title: string;
	startDate: string;
}

export default class WeightSummary extends React.PureComponent<IWeightSummaryProps> {
	render() {
		const { title, startDate } = this.props;
		return (
			<div className={styles.root}>
				<h2>{title}</h2>
				<WeightGraph {...{startDate}} />
			</div>
		);
	}
}
