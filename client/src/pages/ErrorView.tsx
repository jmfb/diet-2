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
					<h1>Error</h1>
					<h2>{action}</h2>
					<div className={styles.row}>
						<div className={styles.reason}>
							This error may be due to your session being out of date.<br />
							You can dismiss this error or try signing in again.
						</div>
						<Button
							type='primary'
							display='Dismiss'
							className={styles.action}
							onClick={onClickDismiss}
							/>
						<a href='/sign-in' className={styles.signIn}>Sign In</a>
					</div>
					<div className={styles.message}>
						{message}
					</div>
					<div className={styles.context}>
						{context}
					</div>
				</section>
			</main>
		);
	}
}
