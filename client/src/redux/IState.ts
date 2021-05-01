import { IErrorState } from './error';
import { IAuthState } from './auth';
import { IDiagnosticsState } from './diagnostics';
import { IWeightsState } from './weights';
import { IProfileState } from './profile';

export default interface IState {
	error: IErrorState;
	auth: IAuthState;
	diagnostics: IDiagnosticsState;
	weights: IWeightsState;
	profile: IProfileState;
}
