import React from 'react';
import dateService from '~/services/dateService';

interface IBirthDateInputProps {
	value?: string;
	onChange(value?: string): void;
}

interface IBirthDateInputState {
	text: string;
}

export default class BirthDateInput extends React.PureComponent<IBirthDateInputProps, IBirthDateInputState> {
	constructor(props: IBirthDateInputProps) {
		super(props);
		const { value } = props;
		this.state = {
			text: (value === undefined || value === null) ? '' : value
		};
	}

	render() {
		const { text } = this.state;
		return (
			<input
				type='date'
				value={text}
				pattern='\d{4}-\d{2}-\d{2}'
				onChange={this.handleInputChanged}
				/>
		);
	}

	handleInputChanged = (event: React.FormEvent<HTMLInputElement>) => {
		const { onChange } = this.props;
		const { currentTarget: { value } } = event;
		this.setState({ text: value });
		const parsedValue = dateService.parse(value);
		onChange(parsedValue);
	};
}