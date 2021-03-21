import * as React from 'react';
import Button from '~/components/Button';
import styles from './ErrorView.scss';

interface IErrorViewProps {
	status: number;
	statusText: string;
	error: string;
	onClickLogout(): void;
}

export default class ErrorView extends React.PureComponent<IErrorViewProps> {
	render() {
		const { status, statusText, onClickLogout } = this.props;
		return (
			<main className={styles.root}>
				<h1>{status} - {statusText}</h1>
				<div className={styles.row}>
					<div className={styles.reason}>
						This error may be due to your session being out of date.<br />
						Try logging out and logging back in.
					</div>
					<Button type='primary' display='Logout' className={styles.action} onClick={onClickLogout} />
				</div>
				{this.renderError()}
			</main>
		);
	}

	renderError = () => {
		const { status } = this.props;
		switch (status) {
			case 500:
				return this.renderInternalServerError();
			case 401:
				return this.renderUnauthorized();
			default:
				return this.renderUnknownError();
		}
	};

	renderInternalServerError = () => {
		const { error } = this.props;
		try {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			const { Message, ExceptionMessage, ExceptionType, StackTrace } = JSON.parse(error);
			return (
				<div className={styles.container}>
					<div className={styles.message}>{Message}</div>
					<div className={styles.exceptionType}>{ExceptionType}</div>
					<div className={styles.exceptionMessage}>{ExceptionMessage}</div>
					<div className={styles.stackTrace}>{StackTrace}</div>
				</div>
			);
		} catch (exception) {
			return (
				<div className={styles.container}>
					<div className={styles.exceptionMessage}>{error}</div>
				</div>
			);
		}
	};

	renderUnauthorized = () => {
		const { error } = this.props;
		try {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			const { Message } = JSON.parse(error);
			return (
				<div className={styles.container}>
					<div className={styles.message}>Unauthorized</div>
					<div className={styles.exceptionMessage}>{Message || error}</div>
				</div>
			);
		} catch (exception) {
			return (
				<div className={styles.container}>
					<div className={styles.message}>Unauthorized</div>
					<div className={styles.exceptionMessage}>{error}</div>
				</div>
			);
		}
	};

	renderUnknownError = () => {
		const { error } = this.props;
		return (
			<div className={styles.container}>
				<div className={styles.message}>Unknown Error</div>
				<div className={styles.exceptionMessage}>{error}</div>
			</div>
		);
	};
}
