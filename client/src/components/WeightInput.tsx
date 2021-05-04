import React, { useEffect, useState } from 'react';
import styles from './WeightInput.css';

export interface IWeightInputProps {
	value?: number;
	autoFocus?: boolean;
	date?: string;
	onChange(value?: number): void;
}

export default function WeightInput(props: IWeightInputProps) {
	const { value, autoFocus, date, onChange } = props;
	const initialValue = value?.toString() ?? '';
	const [text, setText] = useState(initialValue);

	useEffect(() => {
		if (text !== initialValue) {
			setText(initialValue);
		}
	}, [date]);

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
