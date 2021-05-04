import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '~/pages';
import { IProfile } from '~/models';
import { IState, profileDuck, weightsDuck } from '~/redux';
import { weightService } from '~/services';

export default function ProfileContainer() {
	const dispatch = useDispatch();
	const profile = useSelector((state: IState) => state.profile.profile);
	const isSaving = useSelector((state: IState) => state.profile.isSaving);
	const weightStateByDate = useSelector((state: IState) => state.weights.weightStateByDate);
	const weightInPounds = weightService.getMostRecentWeight(weightStateByDate);

	useEffect(() => {
		dispatch(weightsDuck.actions.loadAllWeights());
		dispatch(profileDuck.actions.getProfile());
	}, []);

	const handleSaved = (profile: IProfile) => {
		dispatch(profileDuck.actions.setProfile(profile));
	};

	return (
		<Profile
			{...{
				profile,
				isSaving,
				weightInPounds
			}}
			onSave={handleSaved}
			/>
	);
}
