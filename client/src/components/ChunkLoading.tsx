import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';
import LoadingIcon from './LoadingIcon';
import ErrorBanner from './ErrorBanner';
import * as styles from './ChunkLoading.scss';

export default class ChunkLoading extends React.PureComponent<LoadingComponentProps> {
	render() {
		const { error, pastDelay } = this.props;
		if (error !== null) {
			return <ErrorBanner message={error.message} />;
		}
		if (pastDelay) {
			return (
				<div className={styles.loading}>
					<LoadingIcon />
				</div>
			);
		}
		return null;
	}
}
