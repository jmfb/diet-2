import IAction from './IAction';
import { IState } from '~/reducers/rootReducer';
import { IWeightModel } from '~/models';
import WeightsApi from '~/api/WeightsApi';

export type LoadAllWeightsRequest = IAction<'LOAD_ALL_WEIGHTS_REQUEST', {}>;
export type LoadAllWeightsSuccess = IAction<'LOAD_ALL_WEIGHTS_SUCCESS', { weights: IWeightModel[]; }>;
export type LoadAllWeightsFailure = IAction<'LOAD_ALL_WEIGHTS_FAILURE', { message: string; }>;

export function loadAllWeights() {
	return async (dispatch: Function, getState: () => IState) => {
		dispatch(loadAllWeightsRequest());
		try {
			const { auth: { accessToken } } = getState();
			const weights = await WeightsApi.loadAllWeights(accessToken);
			dispatch(loadAllWeightsSuccess(weights));
		} catch (error) {
			dispatch(loadAllWeightsFailure(error.message));
		}
	};
}

function loadAllWeightsRequest(): LoadAllWeightsRequest {
	return { type: 'LOAD_ALL_WEIGHTS_REQUEST', payload: {} };
}

function loadAllWeightsSuccess(weights: IWeightModel[]): LoadAllWeightsSuccess {
	return { type: 'LOAD_ALL_WEIGHTS_SUCCESS', payload: { weights } };
}

function loadAllWeightsFailure(message: string): LoadAllWeightsFailure {
	return { type: 'LOAD_ALL_WEIGHTS_FAILURE', payload: { message } };
}
