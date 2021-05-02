import React from 'react';
import Card from '~/components/Card';
import PageLoading from '~/components/PageLoading';
import ProfileForm from './ProfileForm';
import Statistics from './Statistics';
import { IProfile } from '~/models';
import styles from './Profile.css';

export interface IProfileProps {
	profile?: IProfile;
	weightInPounds?: number;
	isSaving: boolean;
	onSave(profile: IProfile): void;
}

export default function Profile(props: IProfileProps) {
	const { profile, weightInPounds, onSave, isSaving } = props;

	if (profile === undefined) {
		return (
			<PageLoading message='Loading profile...' />
		);
	}

	const canComputeStatistics =
		weightInPounds != null &&
		profile.targetWeightInPounds != null &&
		profile.birthDate != null &&
		profile.heightInInches != null &&
		profile.gender != null;

	return (
		<>
			<Card className={styles.root}>
				<h1>Profile</h1>
				<ProfileForm
					{...{onSave, isSaving}}
					initialValue={profile}
					/>
			</Card>
			{!canComputeStatistics &&
				<div className={styles.finishProfile}>
					Finish filling in your profile to view statistics.
				</div>
			}
			{canComputeStatistics &&
				<div className={styles.root}>
					<h2>Statistics</h2>
					<Statistics
						{...{profile, weightInPounds}}
						/>
				</div>
			}
		</>
	);
}
