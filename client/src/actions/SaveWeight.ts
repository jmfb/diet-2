import IAction from './IAction';
import WeightsApi from '~/api/WeightsApi';
import { IState } from '~/reducers/rootReducer';

export type SaveWeightRequest = IAction<'SAVE_WEIGHT_REQUEST', { date: string; weightInPounds: number; }>;
export type SaveWeightSuccess = IAction<'SAVE_WEIGHT_SUCCESS', { date: string; }>;
export type SaveWeightFailure = IAction<'SAVE_WEIGHT_FAILURE', { date: string; weightInPounds: number; message: string; }>;

export function saveWeight(date: string, weightInPounds: number) {
	return async (dispatch: Function, getState: () => IState) => {
		dispatch(saveWeightRequest(date, weightInPounds));
		try {
			const { auth: { accessToken } } = getState();
			await WeightsApi.saveWeight(accessToken, date, weightInPounds);
			dispatch(saveWeightSuccess(date));
		} catch (error) {
			dispatch(saveWeightFailure(date, weightInPounds, error.message));
		}
	};
}

function saveWeightRequest(date: string, weightInPounds: number): SaveWeightRequest {
	return { type: 'SAVE_WEIGHT_REQUEST', payload: { date, weightInPounds } };
}

function saveWeightSuccess(date: string): SaveWeightSuccess {
	return { type: 'SAVE_WEIGHT_SUCCESS', payload: { date } };
}

function saveWeightFailure(date: string, weightInPounds: number, message: string): SaveWeightFailure {
	return { type: 'SAVE_WEIGHT_FAILURE', payload: { date, weightInPounds, message } };
}
