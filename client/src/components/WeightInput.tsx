import React from 'react';
import styles from './WeightInput.scss';

interface IWeightInputProps {
	value?: number;
	autoFocus?: boolean;
	onChange(value?: number): void;
}

interface IWeightInputState {
	text: string;
}

export default class WeightInput extends React.PureComponent<IWeightInputProps, IWeightInputState> {
	constructor(props: IWeightInputProps) {
		super(props);
		const { value } = props;
		this.state = {
			text: (value === undefined || value === null) ? '' : value.toString()
		};
	}

	render() {
		const { autoFocus } = this.props;
		const { text } = this.state;
		return (
			<input
				{...{autoFocus}}
				className={styles.root}
				type='text'
				placeholder='lbs...'
				value={text}
				onChange={this.handleInputChanged}
				/>
		);
	}

	handleInputChanged = (event: React.FormEvent<HTMLInputElement>) => {
		const { onChange } = this.props;
		const { currentTarget: { value } } = event;
		this.setState({ text: value });
		const weightInPounds = Number.parseFloat(value);
		onChange(Number.isNaN(weightInPounds) ? undefined : weightInPounds);
	};
}
