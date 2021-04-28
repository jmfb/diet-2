import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '~/pages/Profile';
import { IProfile } from '~/models';
import IState from '~/redux/IState';
import { getProfile, setProfile } from '~/redux/profile';

export default function profileContainer() {
	const dispatch = useDispatch();
	const { profile, isLoading, isSaving } = useSelector((state: IState) => state.profile);
	useEffect(() => {
		if (!profile && !isLoading) {
			dispatch(getProfile());
		}
	}, []);

	const handleSaved = (profile: IProfile) => {
		dispatch(setProfile(profile));
	};

	return (
		<Profile
			{...{profile, isSaving}}
			onSave={handleSaved}
			/>
	);
}
