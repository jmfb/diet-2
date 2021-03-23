import IAction from './IAction';

export type ReportError = IAction<'REPORT_ERROR', { action: string; context: string; message: string; }>;

export function reportError(action: string, context: string, message: string): ReportError {
	return { type: 'REPORT_ERROR', payload: { action, context, message } };
}
