import React from 'react';
import { connect } from 'react-redux';
import WeightGraph from './WeightGraph';
import WeightChange from './WeightChange';
import { IState } from '~/reducers/rootReducer';
import styles from './WeightSummary.scss';

interface IWeightSummaryOwnProps {
	title: string;
	startDate: string;
}

interface IWeightSummaryStateProps {
	targetWeightInPounds?: number;
	weightsInPounds: number[];
}

type IWeightSummaryProps =
	IWeightSummaryOwnProps &
	IWeightSummaryStateProps;

function mapStateToProps(state: IState, ownProps: IWeightSummaryOwnProps): IWeightSummaryStateProps {
	const {
		profile: { profile },
		weights: { weightStateByDate }
	} = state;
	const { startDate } = ownProps;
	const targetWeightInPounds = profile?.targetWeightInPounds;
	const weightsInPounds = Object.keys(weightStateByDate)
		.filter(date => date >= startDate)
		.map(date => weightStateByDate[date].weightInPounds);
	return {
		targetWeightInPounds,
		weightsInPounds
	};
}

class WeightSummary extends React.PureComponent<IWeightSummaryProps> {
	render() {
		const { title, startDate, targetWeightInPounds, weightsInPounds } = this.props;
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
}

export default connect<
	IWeightSummaryStateProps
>(mapStateToProps)(WeightSummary);
