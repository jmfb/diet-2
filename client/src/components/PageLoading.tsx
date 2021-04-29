import React from 'react';
import LoadingIcon from './LoadingIcon';
import styles from './PageLoading.css';

interface IPageLoadingProps {
	message?: string;
}

export default function PageLoading(props: IPageLoadingProps) {
	const { message } = props;
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
