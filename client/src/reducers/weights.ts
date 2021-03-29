import {
	SaveWeightRequest,
	SaveWeightSuccess,
	SaveWeightFailure
} from '~/actions/SaveWeight';
import {
	LoadAllWeightsRequest,
	LoadAllWeightsSuccess,
	LoadAllWeightsFailure
} from '~/actions/LoadAllWeights';
import { SignOutSuccess } from '~/actions/SignOut';

export interface IWeightState {
	isSaving: boolean;
	weightInPounds: number;
}

interface IWeightStateByDate {
	[date: string]: IWeightState;
}

export interface IWeightsState {
	isLoading: boolean;
	isLoaded: boolean;
	weightStateByDate: IWeightStateByDate;
}

const initialState: IWeightsState = {
	isLoading: false,
	isLoaded: false,
	weightStateByDate: {}
};

type HandledActions =
	SaveWeightRequest |
	SaveWeightSuccess |
	SaveWeightFailure |
	LoadAllWeightsRequest |
	LoadAllWeightsSuccess |
	LoadAllWeightsFailure |
	SignOutSuccess;

export default function weights(state = initialState, action: HandledActions): IWeightsState {
	switch (action.type) {
		case 'SAVE_WEIGHT_REQUEST': {
			const { payload: { date, weightInPounds } } = action;
			return {
				...state,
				weightStateByDate: {
					...state.weightStateByDate,
					[date]: {
						isSaving: true,
						weightInPounds
					}
				}
			};
		}
		case 'SAVE_WEIGHT_SUCCESS': {
			const { payload: { date } } = action;
			return {
				...state,
				weightStateByDate: {
					...state.weightStateByDate,
					[date]: {
						...state.weightStateByDate[date],
						isSaving: false
					}
				}
			};
		}
		case 'SAVE_WEIGHT_FAILURE': {
			const { payload: { date } } = action;
			return {
				...state,
				weightStateByDate: {
					...state.weightStateByDate,
					[date]: undefined
				}
			};
		}
		case 'LOAD_ALL_WEIGHTS_REQUEST':
			return {
				...state,
				isLoading: true
			};
		case 'LOAD_ALL_WEIGHTS_SUCCESS': {
			const { payload: { weights } } = action;
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				weightStateByDate: weights.reduce(
					(byDate, weight) => {
						byDate[weight.date] = {
							isSaving: false,
							weightInPounds: weight.weightInPounds
						};
						return byDate;
					},
					{} as IWeightStateByDate)
			};
		}
		case 'LOAD_ALL_WEIGHTS_FAILURE':
			return {
				...state,
				isLoading: false
			};
		case 'SIGN_OUT_SUCCESS':
			return initialState;
		default:
			return state;
	}
}
