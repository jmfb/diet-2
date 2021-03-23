import React, { ErrorInfo } from 'react';
import { connect } from 'react-redux';
import ErrorView from '~/pages/ErrorView';
import { IState } from '~/reducers/rootReducer';
import { dismissError } from '~/actions/DismissError';
import { reportError } from '~/actions/ReportError';

interface IErrorBoundaryOwnProps {
	children?: JSX.Element;
}

interface IErrorBoundaryStateProps {
	showError: boolean;
	action?: string;
	context?: string;
	message?: string;
}

interface IErrorBoundaryDispatchProps {
	dismissError(): void;
	reportError(action: string, context: string, message: string): void;
}

type IErrorBoundaryProps =
	IErrorBoundaryOwnProps &
	IErrorBoundaryStateProps &
	IErrorBoundaryDispatchProps;

function mapStateToProps(state: IState): IErrorBoundaryStateProps {
	const { error: { showError, action, context, message} } = state;
	return {
		showError,
		action,
		context,
		message
	};
}

const mapDispatchToProps: IErrorBoundaryDispatchProps = {
	dismissError,
	reportError
};

class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps> {
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		const { reportError } = this.props;
		reportError('componentDidCatch', errorInfo.componentStack, error.message);
	}

	render() {
		const { showError, action, context, message, children, dismissError } = this.props;
		if (showError) {
			return (
				<ErrorView
					{...{action, context, message}}
					onClickDismiss={dismissError}
					/>
			);
		}
		return children;
	}
}

export default connect<
	IErrorBoundaryStateProps,
	IErrorBoundaryDispatchProps
>(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
