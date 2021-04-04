import React from 'react';
import { Gender } from '~/models';

interface IGenderInputProps {
	value?: Gender;
	onChange(value?: Gender): void;
}

export default class GenderInput extends React.PureComponent<IGenderInputProps> {
	render() {
		const { value } = this.props;
		return (
			<select value={value ?? ''} onChange={this.handleSelectChanged}>
				<option value={''}></option>
				<option value={Gender.Male}>Male</option>
				<option value={Gender.Female}>Female</option>
			</select>
		);
	}

	handleSelectChanged = (event: React.FormEvent<HTMLSelectElement>) => {
		const { currentTarget: { value } } = event;
		const { onChange } = this.props;
		onChange(value === '' ? undefined : (+value as Gender));
	};
}
