import React, { useState } from 'react';
import styles from './WeightInput.css';

export interface IWeightInputProps {
	value?: number;
	autoFocus?: boolean;
	onChange(value?: number): void;
}

export default function WeightInput(props: IWeightInputProps) {
	const { value, autoFocus, onChange } = props;
	const [text, setText] = useState((value === undefined || value === null) ? '' : value.toString());

	const handleInputChanged = (event: React.FormEvent<HTMLInputElement>) => {
		const { currentTarget: { value } } = event;
		setText(value);
		const weightInPounds = Number.parseFloat(value);
		onChange(Number.isNaN(weightInPounds) ? undefined : weightInPounds);
	};

	return (
		<input
			{...{autoFocus}}
			className={styles.root}
			type='text'
			placeholder='lbs...'
			value={text}
			onChange={handleInputChanged}
			/>
	);
}
