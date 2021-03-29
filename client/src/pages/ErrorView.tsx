import React from 'react';
import Button from '~/components/Button';
import styles from './ErrorView.scss';

interface IErrorViewProps {
	action?: string;
	context?: string;
	message?: string;
	onClickDismiss(): void;
}

export default class ErrorView extends React.PureComponent<IErrorViewProps> {
	render() {
		const { action, context, message, onClickDismiss } = this.props;
		return (
			<main className={styles.root}>
				<section>
					<h1>Error - {action}</h1>
					<div className={styles.row}>
						<div className={styles.reason}>
							This error may be due to your session being out of date.<br />
							You can dismiss this error or try signing in again.
						</div>
						<Button
							type='primary'
							className={styles.action}
							onClick={onClickDismiss}>
							Dismiss
						</Button>
						<a href='/sign-in' className={styles.signIn}>Sign In</a>
					</div>
					<div className={styles.message}>
						{message}
					</div>
					{context &&
						<div className={styles.context}>
							{context}
						</div>
					}
				</section>
			</main>
		);
	}
}
