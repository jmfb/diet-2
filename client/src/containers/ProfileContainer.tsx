import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '~/pages';
import { IState, profileSlice, weightsSlice } from '~/redux';
import { weightService } from '~/services';

export default function ProfileContainer() {
	const dispatch = useDispatch();
	const { loadAllWeights } = bindActionCreators(
		weightsSlice.actions,
		dispatch
	);
	const { getProfile, setProfile } = bindActionCreators(
		profileSlice.actions,
		dispatch
	);
	const profile = useSelector((state: IState) => state.profile.profile);
	const isSaving = useSelector((state: IState) => state.profile.isSaving);
	const weightStateByDate = useSelector(
		(state: IState) => state.weights.weightStateByDate
	);
	const weightInPounds = weightService.getMostRecentWeight(weightStateByDate);

	useEffect(() => {
		loadAllWeights();
		getProfile();
	}, []);

	return (
		<Profile
			{...{
				profile,
				isSaving,
				weightInPounds
			}}
			onSave={setProfile}
		/>
	);
}
