import React from 'react';
import Button from './Button';
import WeightInput from './WeightInput';
import BirthDateInput from './BirthDateInput';
import HeightInput from './HeightInput';
import GenderInput from './GenderInput';
import { IProfile, Gender } from '~/models';
import styles from './ProfileForm.scss';

interface IProfileFormProps {
	initialValue: IProfile;
	isSaving: boolean;
	onSave(profile: IProfile): void;
}

interface IProfileFormState {
	targetWeightInPounds?: number;
	birthDate?: string;
	heightInInches?: number;
	gender?: Gender;
}

export default class ProfileForm extends React.PureComponent<IProfileFormProps, IProfileFormState> {
	constructor(props: IProfileFormProps) {
		super(props);
		const { initialValue: { targetWeightInPounds, birthDate, heightInInches, gender } } = props;
		this.state = {
			targetWeightInPounds,
			birthDate,
			heightInInches,
			gender
		};
	}

	render() {
		const { isSaving } = this.props;
		const { targetWeightInPounds, birthDate, heightInInches, gender } = this.state;
		return (
			<div className={styles.root}>
				<div>
					<label>
						<span>Target weight</span>
						<WeightInput
							value={targetWeightInPounds}
							onChange={this.handleTargetWeightInPoundsChanged}
							/>
					</label>
				</div>
				<div>
					<label>
						<span>Birth date</span>
						<BirthDateInput
							value={birthDate}
							onChange={this.handleBirthDateChanged}
							/>
					</label>
				</div>
				<div>
					<label>
						<span>Height</span>
						<HeightInput
							value={heightInInches}
							onChange={this.handleHeightInInchesChanged}
							/>
					</label>
				</div>
				<div>
					<label>
						<span>Gender</span>
						<GenderInput
							value={gender}
							onChange={this.handleGenderChanged}
							/>
					</label>
				</div>
				<div className={styles.actions}>
					<Button
						type='primary'
						className={styles.save}
						onClick={this.handleSaveClicked}
						isDisabled={!this.canSave()}
						isProcessing={isSaving}>
						Save
					</Button>
				</div>
			</div>
		);
	}

	canSave = () => {
		const { isSaving } = this.props;
		// TODO: rest of the validation
		return !isSaving;
	};

	handleTargetWeightInPoundsChanged = (targetWeightInPounds?: number) => {
		this.setState({ targetWeightInPounds });
	};

	handleBirthDateChanged = (birthDate?: string) => {
		this.setState({ birthDate });
	};

	handleHeightInInchesChanged = (heightInInches?: number) => {
		this.setState({ heightInInches });
	};

	handleGenderChanged = (gender?: Gender) => {
		this.setState({ gender });
	};

	handleSaveClicked = () => {
		const { onSave } = this.props;
		const { targetWeightInPounds, birthDate, heightInInches, gender } = this.state;
		onSave({ targetWeightInPounds, birthDate, heightInInches, gender });
	};
}
