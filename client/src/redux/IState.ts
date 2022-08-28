import { IErrorState } from './error.slice';
import { IAuthState } from './auth.slice';
import { IDiagnosticsState } from './diagnostics.slice';
import { IWeightsState } from './weights.slice';
import { IProfileState } from './profile.slice';

export default interface IState {
	error: IErrorState;
	auth: IAuthState;
	diagnostics: IDiagnosticsState;
	weights: IWeightsState;
	profile: IProfileState;
}
