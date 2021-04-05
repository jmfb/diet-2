import React from 'react';
import { connect } from 'react-redux';
import dateService from '~/services/dateService';
import { IState } from '~/reducers/rootReducer';
import styles from './WeightGraph.scss';

interface IWeightGraphOwnProps {
	startDate: string;
}

interface IWeightInPoundsByDate {
	[date: string]: number;
}

interface IWeightGraphStateProps {
	targetWeightInPounds?: number;
	xAxisLabels: string[];
	weightInPoundsByDate: IWeightInPoundsByDate;
}

type IWeightGraphProps =
	IWeightGraphOwnProps &
	IWeightGraphStateProps;

function mapStateToProps(state: IState, ownProps: IWeightGraphOwnProps): IWeightGraphStateProps {
	const {
		profile: { profile },
		heartbeat: { today },
		weights: { weightStateByDate }
	} = state;
	const { startDate } = ownProps;
	const targetWeightInPounds = profile?.targetWeightInPounds;
	const xAxisLabels = [] as string[];
	const weightInPoundsByDate = {} as IWeightInPoundsByDate;
	for (let date = startDate; date <= today; date = dateService.addDays(date, 1)) {
		xAxisLabels.push(date);
		const weightState = weightStateByDate[date];
		if (weightState) {
			weightInPoundsByDate[date] = weightState.weightInPounds;
		}
	}
	return {
		targetWeightInPounds,
		xAxisLabels,
		weightInPoundsByDate
	};
}

class WeightGraph extends React.PureComponent<IWeightGraphProps> {
	private svgRef = React.createRef<SVGSVGElement>();

	render() {
		return (
			<>
				<svg ref={this.svgRef} className={styles.svg} />
			</>
		);
	}
}

export default connect<
	IWeightGraphStateProps
>(mapStateToProps)(WeightGraph);
