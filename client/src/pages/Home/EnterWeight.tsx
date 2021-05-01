import React, { useState } from 'react';
import WeightInput from '~/components/WeightInput';
import Button from '~/components/Button';
import { IWeightState } from '~/redux/weights';
import { IWeightModel } from '~/models';
import styles from './EnterWeight.css';

export interface IEnterWeightProps {
	date: string;
	weightState?: IWeightState;
	onSaveWeight(weight: IWeightModel): void;
}

export default function EnterWeight(props: IEnterWeightProps) {
	const { date, weightState, onSaveWeight } = props;
	const [weightInPounds, setWeightInPounds] = useState(weightState?.weightInPounds);

	const canSave =
		!weightState?.isSaving &&
		weightInPounds > 0 &&
		weightInPounds <= 2000 &&
		weightInPounds !== weightState?.weightInPounds;

	const handleSaveClicked = () => {
		onSaveWeight({ date, weightInPounds });
	};

	return (
		<div className={styles.root}>
			<div className={styles.date}>{date}</div>
			<WeightInput
				{...{date}}
				autoFocus
				value={weightInPounds}
				onChange={setWeightInPounds}
				/>
			<Button
				className={styles.save}
				isDisabled={!canSave}
				isProcessing={weightState?.isSaving}
				onClick={handleSaveClicked}>
				Save
			</Button>
		</div>
	);
}
