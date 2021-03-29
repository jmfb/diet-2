import {
	SaveWeightRequest,
	SaveWeightSuccess,
	SaveWeightFailure
} from '~/actions/SaveWeight';

export interface IWeightState {
	isSaving: boolean;
	weightInPounds: number;
}

interface IWeightStateByDate {
	[date: string]: IWeightState;
}

export interface IWeightsState {
	weightStateByDate: IWeightStateByDate;
}

const initialState: IWeightsState = {
	weightStateByDate: {}
};

type HandledActions =
	SaveWeightRequest |
	SaveWeightSuccess |
	SaveWeightFailure;

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
		default:
			return state;
	}
}
