import { IErrorState } from './error.duck';
import { IAuthState } from './auth.duck';
import { IDiagnosticsState } from './diagnostics.duck';
import { IWeightsState } from './weights.duck';
import { IProfileState } from './profile.duck';

export default interface IState {
	error: IErrorState;
	auth: IAuthState;
	diagnostics: IDiagnosticsState;
	weights: IWeightsState;
	profile: IProfileState;
}
