import error, { IErrorState } from './error';
import auth, { IAuthState } from './auth';
import heartbeat, { IHeartbeatState } from './heartbeat';
import weights, { IWeightsState } from './weights';
import profile, { IProfileState } from './profile';

export interface IState {
	error: IErrorState;
	auth: IAuthState;
	heartbeat: IHeartbeatState;
	weights: IWeightsState;
	profile: IProfileState;
}

type IReducer = {
	[K in keyof IState]: (state: IState[K], action: any) => IState[K];
};

export const reducer: IReducer = {
	error,
	auth,
	heartbeat,
	weights,
	profile
};
