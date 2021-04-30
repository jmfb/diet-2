import React from 'react';
import Card from '~/components/Card';
import PageLoading from '~/components/PageLoading';
import ProfileForm from './ProfileForm';
import { IProfile } from '~/models';
import styles from './Profile.css';

export interface IProfileProps {
	profile?: IProfile;
	isSaving: boolean;
	onSave(profile: IProfile): void;
}

export default function Profile(props: IProfileProps) {
	const { profile, onSave, isSaving } = props;
	if (profile === undefined) {
		return (
			<PageLoading message='Loading profile...' />
		);
	}
	return (
		<Card className={styles.root}>
			<h1>Profile</h1>
			<ProfileForm
				{...{onSave, isSaving}}
				initialValue={profile}
				/>
		</Card>
	);
}
