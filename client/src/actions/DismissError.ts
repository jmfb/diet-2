import IAction from './IAction';

export type DismissError = IAction<'DISMISS_ERROR', {}>;

export function dismissError(): DismissError {
	return { type: 'DISMISS_ERROR', payload: {} };
}
