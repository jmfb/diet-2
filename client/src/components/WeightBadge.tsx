import React from 'react';
import { connect } from 'react-redux';
import IState from '~/redux/IState';
import weightService from '~/services/weightService';
import { weightCategoryNames } from '~/models';
import styles from './WeightBadge.scss';

interface IWeightBadgeStateProps {
	startingWeight?: number;
	mostRecentWeight?: number;
	targetWeightInPounds?: number;
	heightInInches?: number;
}

type IWeightBadgeProps =
	IWeightBadgeStateProps;

function mapStateToProps(state: IState): IWeightBadgeStateProps {
	const {
		weights: { weightStateByDate },
		profile: { profile }
	} = state;
	const targetWeightInPounds = profile?.targetWeightInPounds;
	const heightInInches = profile?.heightInInches;
	const dates = Object.keys(weightStateByDate).sort();
	const minDate = dates[0];
	const maxDate = dates[dates.length - 1];
	const startingWeight = weightStateByDate[minDate]?.weightInPounds;
	const mostRecentWeight = weightStateByDate[maxDate]?.weightInPounds;
	return {
		startingWeight,
		mostRecentWeight,
		targetWeightInPounds,
		heightInInches
	};
}

class WeightBadge extends React.PureComponent<IWeightBadgeProps> {
	render() {
		const { startingWeight, mostRecentWeight, targetWeightInPounds, heightInInches } = this.props;
		if (!startingWeight) {
			return null;
		}

		const changeInWeight = weightService.getChange(startingWeight, mostRecentWeight);
		const remainingChange = targetWeightInPounds ?
			weightService.getChange(mostRecentWeight, targetWeightInPounds) :
			undefined;
		const bodyMassIndex = heightInInches ?
			weightService.computeBodyMassIndex(mostRecentWeight, heightInInches) :
			undefined;

		return (
			<div className={styles.root}>
				<div className={styles.row}>
					<span className={styles.label}>Weight</span>
					{startingWeight} lbs ➜ {mostRecentWeight} lbs ({changeInWeight >= 0 ? '+' : ''}{changeInWeight} lbs)
				</div>
				{heightInInches &&
					<div className={styles.row}>
						<span className={styles.label}>BMI</span>
						{bodyMassIndex} kg/m² ({weightCategoryNames[weightService.getWeightCategory(bodyMassIndex)]})
					</div>
				}
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
