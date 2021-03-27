import {
	HeartbeatRequest,
	HeartbeatSuccess,
	HeartbeatFailure
} from '~/actions/Heartbeat';
import { IIndexModel } from '~/models';

export interface IHeartbeatState {
	bundleVersion: string;
	serverBundleVersion: string;
	isHeartbeatInProgress: boolean;
}

const indexModel = JSON.parse(document.getElementById('root').getAttribute('data-initial-state')) as IIndexModel;

const initialState: IHeartbeatState = {
	bundleVersion: indexModel.bundleVersion,
	serverBundleVersion: indexModel.bundleVersion,
	isHeartbeatInProgress: false
};

type HandledActions =
	HeartbeatRequest |
	HeartbeatSuccess |
	HeartbeatFailure;

export default function heartbeat(state = initialState, action: HandledActions): IHeartbeatState {
	switch (action.type) {
		case 'HEARTBEAT_REQUEST':
			return { ...state, isHeartbeatInProgress: true };
		case 'HEARTBEAT_SUCCESS': {
			const { payload: { heartbeat: { bundleVersion: serverBundleVersion } } } = action;
			return {
				...state,
				serverBundleVersion,
				isHeartbeatInProgress: false
			};
		}
		case 'HEARTBEAT_FAILURE':
			return { ...state, isHeartbeatInProgress: false };
		default:
			return state;
	}
}
