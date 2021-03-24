import React from 'react';
import LoadingIcon from './LoadingIcon';
import styles from './PageLoading.scss';

interface IPageLoadingProps {
	message?: string;
}

export default class PageLoading extends React.PureComponent<IPageLoadingProps> {
	render() {
		const { message } = this.props;
		return (
			<>
				{message &&
					<div className={styles.message}>{message}</div>
				}
				<div className={styles.loading}>
					<LoadingIcon />
				</div>
			</>
		);
	}
}
