import React from 'react';
import styles from './HeightInput.scss';

interface IHeightInputProps {
	value?: number;
	onChange(value?: number): void;
}

interface IHeightInputState {
	feet: number;
	inches: number;
}

export default class HeightInput extends React.PureComponent<IHeightInputProps, IHeightInputState> {
	constructor(props: IHeightInputProps) {
		super(props);
		const { value } = props;
		const feet = value ? Math.floor(value / 12) : 0;
		const inches = value ? value % 12 : 0;
		this.state = {
			feet,
			inches
		};
	}

	render() {
		const { feet, inches } = this.state;
		const feetOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const inchesOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		return (
			<span>
				<select onChange={this.handleFeetChanged} value={feet}>
					{feetOptions.map(feetOption =>
						<option
							key={feetOption}
							value={feetOption}>
							{feetOption}
						</option>
					)}
				</select>
				<span className={styles.footLabel}>foot</span>
				<select onChange={this.handleInchesChanged} value={inches}>
					{inchesOptions.map(inchesOption =>
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

	handleFeetChanged = (event: React.FormEvent<HTMLSelectElement>) => {
		const { currentTarget: { value } } = event;
		const feet = +value;
		const { inches } = this.state;
		this.setState({ feet });
		this.fireChangeEvent(feet, inches);
	};

	handleInchesChanged = (event: React.FormEvent<HTMLSelectElement>) => {
		const { currentTarget: { value } } = event;
		const inches = +value;
		const { feet } = this.state;
		this.setState({ inches });
		this.fireChangeEvent(feet, inches);
	};

	fireChangeEvent = (feet: number, inches: number) => {
		const { onChange } = this.props;
		const heightInInches = feet * 12 + inches;
		onChange(heightInInches === 0 ? undefined : heightInInches);
	};
}
