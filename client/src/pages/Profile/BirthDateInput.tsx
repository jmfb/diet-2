import React, { useState } from 'react';
import { dateService } from '~/services';

export interface IBirthDateInputProps {
	value?: string;
	onChange(value?: string): void;
}

export default function BirthDateInput(props: IBirthDateInputProps) {
	const { value, onChange } = props;
	const [text, setText] = useState(value ?? '');

	const handleInputChanged = (event: React.FormEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value: birthDate }
		} = event;
		setText(birthDate);
		const parsedValue = dateService.parse(birthDate);
		onChange(parsedValue);
	};

	return (
		<input
			type='date'
			value={text}
			pattern='\d{4}-\d{2}-\d{2}'
			onChange={handleInputChanged}
		/>
	);
}
