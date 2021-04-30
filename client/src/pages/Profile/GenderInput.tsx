import React from 'react';
import { Gender } from '~/models';

interface IGenderInputProps {
	value?: Gender;
	onChange(value?: Gender): void;
}

export default function GenderInput(props: IGenderInputProps) {
	const { value, onChange } = props;

	const handleSelectChanged = (event: React.FormEvent<HTMLSelectElement>) => {
		const { currentTarget: { value } } = event;
		onChange(value === '' ? undefined : (+value as Gender));
	};

	return (
		<select value={value ?? ''} onChange={handleSelectChanged}>
			<option value={''}></option>
			<option value={Gender.Male}>Male</option>
			<option value={Gender.Female}>Female</option>
		</select>
	);
}
