import React, { useRef, useEffect } from 'react';
import Pill from './Pill';
import * as d3 from 'd3';
import styles from './WeightGraph.css';

interface IWeightGraphProps {
	startDate: string;
	targetWeightInPounds?: number;
	weightsInPounds: number[];
}

export default function WeightGraph(props: IWeightGraphProps) {
	const { startDate, weightsInPounds, targetWeightInPounds } = props;
	const svgRef = useRef<SVGSVGElement>();

	const createGraph = () => {
		if (weightsInPounds.length === 0) {
			return;
		}

		const rootNode = svgRef.current;
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

	const destroyGraph = () => {
		const rootNode = svgRef.current;
		while (rootNode && rootNode.firstChild) {
			rootNode.removeChild(rootNode.firstChild);
		}
	};

	const recreateGraph = () => {
		destroyGraph();
		createGraph();
	};

	useEffect(() => {
		createGraph();
		window.addEventListener('resize', recreateGraph);
		return () => {
			window.removeEventListener('resize', recreateGraph);
			destroyGraph();
		};
	}, [weightsInPounds, targetWeightInPounds]);

	if (weightsInPounds.length === 0) {
		return (
			<div className={styles.none}>No weight records since {startDate}</div>
		);
	}

	const minWeight = Math.min(...weightsInPounds);
	const maxWeight = Math.max(...weightsInPounds);

	return (
		<div className={styles.wrapper}>
			<svg ref={svgRef} className={styles.root} />
			<Pill type='info' className={styles.max}>Max {maxWeight} lbs</Pill>
			<Pill type='info' className={styles.min}>Min {minWeight} lbs</Pill>
		</div>
	);
}
