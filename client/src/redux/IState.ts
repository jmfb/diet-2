import { IErrorState } from './error';
import { IAuthState } from './auth';
import { IHeartbeatState } from './heartbeat';
import { IWeightsState } from './weights';
import { IProfileState } from './profile';

export default interface IState {
	error: IErrorState;
	auth: IAuthState;
	heartbeat: IHeartbeatState;
	weights: IWeightsState;
	profile: IProfileState;
}
