import React from 'react';
import WeightInput from './WeightInput';
import Button from './Button';
import { IWeightState } from '~/reducers/weights';
import styles from './EnterWeight.scss';

interface IEnterWeightProps {
	date: string;
	weightState?: IWeightState;
	onSaveWeight(date: string, weightInPounds: number): void;
}

interface IEnterWeightState {
	weightInPounds?: number;
}

export default class EnterWeight extends React.PureComponent<IEnterWeightProps, IEnterWeightState> {
	constructor(props: IEnterWeightProps) {
		super(props);
		const { weightState } = props;
		this.state = {
			weightInPounds: weightState?.weightInPounds
		};
	}

	render() {
		const { date, weightState } = this.props;
		const { weightInPounds } = this.state;
		return (
			<div className={styles.root}>
				<div className={styles.date}>{date}</div>
				<WeightInput
					autoFocus
					value={weightInPounds}
					onChange={this.handleWeightChanged}
					/>
				<Button
					type='primary'
					className={styles.save}
					isDisabled={!this.canSave()}
					isProcessing={weightState?.isSaving}
					onClick={this.handleSaveClicked}>
					Save
				</Button>
			</div>
		);
	}

	canSave = () => {
		const { weightState } = this.props;
		const { weightInPounds } = this.state;
		return !weightState?.isSaving &&
			weightInPounds > 0 &&
			weightInPounds <= 2000 &&
			weightInPounds !== weightState?.weightInPounds;
	};

	handleWeightChanged = (weightInPounds?: number) => {
		this.setState({ weightInPounds });
	};

	handleSaveClicked = () => {
		const { date, onSaveWeight } = this.props;
		const { weightInPounds } = this.state;
		onSaveWeight(date, weightInPounds);
	};
}
