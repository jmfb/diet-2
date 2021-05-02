import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from '~/pages/Home';
import { IWeightModel } from '~/models';
import { IState, weightsDuck, profileDuck } from '~/redux';

export default function HomeContainer() {
	const dispatch = useDispatch();
	const weights = useSelector((state: IState) => state.weights);
	const profile = useSelector((state: IState) => state.profile.profile);
	const today = useSelector((state: IState) => state.diagnostics.today);

	useEffect(() => {
		dispatch(weightsDuck.actions.loadAllWeights());
		dispatch(profileDuck.actions.getProfile());
	}, []);

	const handleWeightSaved = (weight: IWeightModel) => {
		dispatch(weightsDuck.actions.saveWeight(weight));
	};

	return (
		<Home
			{...{weights, profile, today}}
			onSaveWeight={handleWeightSaved}
			/>
	);
}
