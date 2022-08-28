import React, { useState } from 'react';
import { Button, WeightInput } from '~/components';
import BirthDateInput from './BirthDateInput';
import HeightInput from './HeightInput';
import GenderInput from './GenderInput';
import { IProfile } from '~/models';
import styles from './ProfileForm.css';

export interface IProfileFormProps {
	initialValue: IProfile;
	isSaving: boolean;
	onSave(profile: IProfile): void;
}

export default function ProfileForm(props: IProfileFormProps) {
	const { initialValue, isSaving, onSave } = props;
	const [targetWeightInPounds, setTargetWeightInPounds] = useState(
		initialValue.targetWeightInPounds
	);
	const [birthDate, setBirthDate] = useState(initialValue.birthDate);
	const [heightInInches, setHeightInInches] = useState(
		initialValue.heightInInches
	);
	const [gender, setGender] = useState(initialValue.gender);

	const isDifferent =
		initialValue.targetWeightInPounds !== targetWeightInPounds ||
		initialValue.birthDate !== birthDate ||
		initialValue.heightInInches !== heightInInches ||
		initialValue.gender !== gender;
	const canSave = !isSaving && isDifferent;

	const handleSaveClicked = () => {
		onSave({ targetWeightInPounds, birthDate, heightInInches, gender });
	};

	return (
		<div className={styles.root}>
			<div>
				<label>
					<span>Target weight</span>
					<WeightInput
						value={targetWeightInPounds}
						onChange={setTargetWeightInPounds}
					/>
				</label>
			</div>
			<div>
				<label>
					<span>Birth date</span>
					<BirthDateInput
						value={birthDate}
						onChange={setBirthDate}
					/>
				</label>
			</div>
			<div>
				<label>
					<span>Height</span>
					<HeightInput
						value={heightInInches}
						onChange={setHeightInInches}
					/>
				</label>
			</div>
			<div>
				<label>
					<span>Gender</span>
					<GenderInput
						value={gender}
						onChange={setGender}
					/>
				</label>
			</div>
			<div className={styles.actions}>
				<Button
					className={styles.save}
					onClick={handleSaveClicked}
					isDisabled={!canSave}
					isProcessing={isSaving}>
					Save
				</Button>
			</div>
		</div>
	);
}
