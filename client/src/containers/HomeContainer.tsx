import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Home } from '~/pages';
import { IState, weightsSlice, profileSlice } from '~/redux';

export default function HomeContainer() {
	const dispatch = useDispatch();
	const { loadAllWeights, saveWeight } = bindActionCreators(
		weightsSlice.actions,
		dispatch
	);
	const { getProfile } = bindActionCreators(profileSlice.actions, dispatch);
	const weights = useSelector((state: IState) => state.weights);
	const profile = useSelector((state: IState) => state.profile.profile);
	const today = useSelector((state: IState) => state.diagnostics.today);

	useEffect(() => {
		loadAllWeights();
		getProfile();
	}, []);

	return (
		<Home
			{...{
				weights,
				profile,
				today
			}}
			onSaveWeight={saveWeight}
		/>
	);
}
