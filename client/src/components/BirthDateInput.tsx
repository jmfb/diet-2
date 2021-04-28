import React, { useState } from 'react';
import dateService from '~/services/dateService';

interface IBirthDateInputProps {
	value?: string;
	onChange(value?: string): void;
}

export default function BirthDateInput(props: IBirthDateInputProps) {
	const { value, onChange } = props;
	const [text, setText] = useState((value === undefined || value === null) ? '' : value);

	const handleInputChanged = (event: React.FormEvent<HTMLInputElement>) => {
		const { currentTarget: { value } } = event;
		setText(value);
		const parsedValue = dateService.parse(value);
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
