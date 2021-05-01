import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '~/pages/Profile';
import { IProfile } from '~/models';
import { IState, profileDuck } from '~/redux';

export default function ProfileContainer() {
	const dispatch = useDispatch();
	const { profile, isLoading, isSaving } = useSelector((state: IState) => state.profile);

	useEffect(() => {
		if (!profile && !isLoading) {
			dispatch(profileDuck.actions.getProfile());
		}
	}, []);

	const handleSaved = (profile: IProfile) => {
		dispatch(profileDuck.actions.setProfile(profile));
	};

	return (
		<Profile
			{...{profile, isSaving}}
			onSave={handleSaved}
			/>
	);
}
