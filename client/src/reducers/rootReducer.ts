import { combineReducers } from 'redux';
import error, { IErrorState } from './error';
import auth, { IAuthState } from './auth';
import heartbeat, { IHeartbeatState } from './heartbeat';
import weights, { IWeightsState } from './weights';

export interface IState {
	error: IErrorState;
	auth: IAuthState;
	heartbeat: IHeartbeatState;
	weights: IWeightsState;
}

export default combineReducers<IState>({
	error,
	auth,
	heartbeat,
	weights
});
