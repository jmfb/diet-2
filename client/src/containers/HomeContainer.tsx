import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from '~/pages/Home';
import IState from '~/redux/IState';
import { saveWeight, loadAllWeights } from '~/redux/weights';
import { getProfile } from '~/redux/profile';

export default function HomeContainer() {
	const dispatch = useDispatch();
	const weights = useSelector((state: IState) => state.weights);
	const isLoadingProfile = useSelector((state: IState) => state.profile.isLoading);
	const profile = useSelector((state: IState) => state.profile.profile);
	const { isLoading, isLoaded } = weights;
	useEffect(() => {
		if (!isLoading && !isLoaded) {
			dispatch(loadAllWeights());
		}
		if (!profile && !isLoadingProfile) {
			dispatch(getProfile());
		}
	}, []);

	const handleWeightSaved = (date: string, weightInPounds: number) => {
		dispatch(saveWeight({ date, weightInPounds }));
	};

	const today = useSelector((state: IState) => state.heartbeat.today);
	return (
		<Home
			{...{weights, profile, today}}
			onSaveWeight={handleWeightSaved}
			/>
	);
}
