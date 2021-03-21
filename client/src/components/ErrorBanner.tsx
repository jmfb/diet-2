import * as React from 'react';
import styles from './ErrorBanner.scss';

interface IErrorBannerProps {
	message: string | undefined;
}

export default class ErrorBanner extends React.PureComponent<IErrorBannerProps> {
	render() {
		const { message } = this.props;
		if (message === undefined) {
			return null;
		}
		return (
			<div className={styles.root}>
				{message}
			</div>
		);
	}
}
