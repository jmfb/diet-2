import React from 'react';
import { connect } from 'react-redux';
import { IState } from '~/reducers/rootReducer';
import * as d3 from 'd3';
import styles from './WeightGraph.scss';

interface IWeightGraphOwnProps {
	startDate: string;
}

interface IWeightGraphStateProps {
	targetWeightInPounds?: number;
	weightsInPounds: number[];
}

type IWeightGraphProps =
	IWeightGraphOwnProps &
	IWeightGraphStateProps;

function mapStateToProps(state: IState, ownProps: IWeightGraphOwnProps): IWeightGraphStateProps {
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

class WeightGraph extends React.PureComponent<IWeightGraphProps> {
	private svgRef = React.createRef<SVGSVGElement>();

	componentDidMount() {
		this.createGraph();
		window.addEventListener('resize', this.recreateGraph);
	}

	componentDidUpdate(prevProps: IWeightGraphProps) {
		this.recreateGraph();
	}

	componentWillUnmount() {
		window.removeEventListener('event', this.recreateGraph);
	}

	render() {
		const { weightsInPounds, startDate } = this.props;
		if (weightsInPounds.length === 0) {
			return (
				<div className={styles.root}>No weight records since {startDate}</div>
			);
		}
		return (
			<svg ref={this.svgRef} className={styles.root} />
		);
	}

	recreateGraph = () => {
		this.destroyGraph();
		this.createGraph();
	};

	destroyGraph = () => {
		const rootNode = this.svgRef.current;
		while (rootNode && rootNode.firstChild) {
			rootNode.removeChild(rootNode.firstChild);
		}
	};

	createGraph = () => {
		const { weightsInPounds, targetWeightInPounds } = this.props;
		if (weightsInPounds.length === 0) {
			return;
		}

		const rootNode = this.svgRef.current;
		const width = rootNode.clientWidth;
		const height = rootNode.clientHeight;
		const y = d3.scaleLinear().range([height, 0]);
		const x = d3.scaleLinear().range([0, width]);
		const areaData = d3.area<number>()
			.x((weight, index) => x(index))
			.y0(height)
			.y1(weight => y(weight));
		const lineData = d3.line<number>()
			.x((weight, index) => x(index))
			.y(weight => y(weight));
		const svg = d3.select(rootNode)
			.append('g')
			.attr('transform', 'translate(0,0)');

		const minWeight = Math.min(...weightsInPounds);
		const maxWeight = Math.max(...weightsInPounds);

		const lowerBound = targetWeightInPounds ?
			Math.min(minWeight, Math.max(0, targetWeightInPounds - 10)) :
			minWeight;
		const upperBound = targetWeightInPounds ?
			Math.max(maxWeight, targetWeightInPounds + 10) :
			maxWeight;

		y.domain([lowerBound, upperBound]);
		x.domain([0, weightsInPounds.length - 1]);

		if (targetWeightInPounds) {
			const yTarget = y(targetWeightInPounds);
			svg.append('line')
				.attr('x1', x(0))
				.attr('x2', x(weightsInPounds.length - 1))
				.attr('y1', yTarget)
				.attr('y2', yTarget)
				.attr('class', styles.target);
		}

		svg.append('path')
			.datum(weightsInPounds)
			.attr('class', styles.area)
			.attr('d', areaData);

		svg.append('path')
			.datum(weightsInPounds)
			.attr('class', styles.line)
			.attr('d', lineData);
	};
}

export default connect<
	IWeightGraphStateProps
>(mapStateToProps)(WeightGraph);
