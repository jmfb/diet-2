import IAction from './IAction';
import DiagnosticsApi from '~/api/DiagnosticsApi';
import dateService from '~/services/dateService';
import { IHeartbeatModel } from '~/models';
import { IState } from '~/reducers/rootReducer';

export type HeartbeatRequest = IAction<'HEARTBEAT_REQUEST', {}>;
export type HeartbeatSuccess = IAction<'HEARTBEAT_SUCCESS', { heartbeat: IHeartbeatModel; today: string; }>;
export type HeartbeatFailure = IAction<'HEARTBEAT_FAILURE', { message: string; }>;

export function heartbeat() {
	return async (dispatch: Function, getState: () => IState) => {
		dispatch(heartbeatRequest());
		try {
			const { auth: { accessToken } } = getState();
			const model = await DiagnosticsApi.heartbeat(accessToken);
			const today = dateService.getToday();
			dispatch(heartbeatSuccess(model, today));
		} catch (error) {
			dispatch(heartbeatFailure(error.message));
		}
	};
}

function heartbeatRequest(): HeartbeatRequest {
	return { type: 'HEARTBEAT_REQUEST', payload: {} };
}

function heartbeatSuccess(heartbeat: IHeartbeatModel, today: string): HeartbeatSuccess {
	return { type: 'HEARTBEAT_SUCCESS', payload: { heartbeat, today } };
}

function heartbeatFailure(message: string): HeartbeatFailure {
	return { type: 'HEARTBEAT_FAILURE', payload: { message } };
}
