import React from 'react';
import { connect } from 'react-redux';
import { IState } from '~/reducers/rootReducer';
import weightService from '~/services/weightService';
import styles from './WeightBadge.scss';

interface IWeightBadgeStateProps {
	startingWeight?: number;
	mostRecentWeight?: number;
	targetWeightInPounds?: number;
}

type IWeightBadgeProps =
	IWeightBadgeStateProps;

function mapStateToProps(state: IState): IWeightBadgeStateProps {
	const {
		weights: { weightStateByDate },
		profile: { profile }
	} = state;
	const targetWeightInPounds = profile?.targetWeightInPounds;
	const dates = Object.keys(weightStateByDate).sort();
	const minDate = dates[0];
	const maxDate = dates[dates.length - 1];
	const startingWeight = weightStateByDate[minDate]?.weightInPounds;
	const mostRecentWeight = weightStateByDate[maxDate]?.weightInPounds;
	return {
		startingWeight,
		mostRecentWeight,
		targetWeightInPounds
	};
}

class WeightBadge extends React.PureComponent<IWeightBadgeProps> {
	render() {
		const { startingWeight, mostRecentWeight, targetWeightInPounds } = this.props;
		if (!startingWeight) {
			return null;
		}

		const changeInWeight = weightService.getChange(startingWeight, mostRecentWeight);
		const remainingChange = targetWeightInPounds ?
			weightService.getChange(mostRecentWeight, targetWeightInPounds) :
			undefined;

		return (
			<div className={styles.root}>
				<div className={styles.row}>
					<span className={styles.label}>Weight</span>
					{startingWeight} lbs ➜ {mostRecentWeight} lbs ({changeInWeight >= 0 ? '+' : ''}{changeInWeight} lbs)
				</div>
				{targetWeightInPounds &&
					<div className={styles.row}>
						<span className={styles.label}>Goal</span>
						{targetWeightInPounds} lbs ({remainingChange >= 0 ? '+' : ''}{remainingChange} lbs)
					</div>
				}
			</div>
		);
	}
}

export default connect<
	IWeightBadgeStateProps
>(mapStateToProps)(WeightBadge);
