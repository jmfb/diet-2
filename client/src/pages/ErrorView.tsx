import React from 'react';
import { Link } from 'react-router-dom';
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
				<h1>Error {action}</h1>
				<div className={styles.row}>
					<div className={styles.reason}>
						This error may be due to your session being out of date.<br />
						Try logging out and logging back in.
					</div>
					<Link to='/login'>Login</Link>
					<Button
						type='primary'
						display='Dismiss'
						className={styles.action}
						onClick={onClickDismiss}
						/>
				</div>
				<div className={styles.message}>
					{context}
				</div>
				<div className={styles.message}>
					{message}
				</div>
			</main>
		);
	}
}
