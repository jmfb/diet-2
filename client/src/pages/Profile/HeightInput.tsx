import React, { useState } from 'react';
import styles from './HeightInput.css';

export interface IHeightInputProps {
	value?: number;
	onChange(value?: number): void;
}

export default function HeightInput(props: IHeightInputProps) {
	const { value, onChange } = props;
	const [feet, setFeet] = useState(value ? Math.floor(value / 12) : 0);
	const [inches, setInches] = useState(value ? value % 12 : 0);

	const handleChanged = (newFeet: number, newInches: number) => {
		setFeet(newFeet);
		setInches(newInches);
		const heightInInches = newFeet * 12 + newInches;
		onChange(heightInInches === 0 ? undefined : heightInInches);
	};

	const handleFeetChanged = (event: React.FormEvent<HTMLSelectElement>) => {
		const { currentTarget: { value: newFeet } } = event;
		handleChanged(+newFeet, inches);
	};

	const handleInchesChanged = (event: React.FormEvent<HTMLSelectElement>) => {
		const { currentTarget: { value: newInches } } = event;
		handleChanged(feet, +newInches);
	};

	return (
		<span>
			<select onChange={handleFeetChanged} value={feet}>
				{Array.from({ length: 10 }, (unused, feetOption) =>
					<option
						key={feetOption}
						value={feetOption}>
						{feetOption}
					</option>
				)}
			</select>
			<span className={styles.feetLabel}>feet</span>
			<select onChange={handleInchesChanged} value={inches}>
				{Array.from({ length: 12 }, (unused, inchesOption) =>
					<option
						key={inchesOption}
						value={inchesOption}>
						{inchesOption}
					</option>
				)}
			</select>
			<span className={styles.inchesLabel}>inches</span>
		</span>
	);
}
