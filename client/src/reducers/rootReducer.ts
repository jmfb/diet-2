import { combineReducers } from 'redux';
import error, { IErrorState } from './error';
import auth, { IAuthState } from './auth';
import heartbeat, { IHeartbeatState } from './heartbeat';

export interface IState {
	error: IErrorState;
	auth: IAuthState;
	heartbeat: IHeartbeatState;
}

export default combineReducers<IState>({
	error,
	auth,
	heartbeat
});
