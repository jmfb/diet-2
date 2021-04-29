import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';
import IState from '~/redux/IState';
import styles from './NewerVersionPrompt.css';

export default function NewerVersionPrompt() {
	const [isRefreshing, setIsRefreshing] = useState(false);

	const { bundleVersion, serverBundleVersion } = useSelector((state: IState) => state.heartbeat);
	if (bundleVersion === serverBundleVersion) {
		return null;
	}

	const handleRefreshClicked = () => {
		setIsRefreshing(true);
		window.location.reload(true);
	};

	return (
		<div className={styles.root}>
			<div>
				<div>There is a new version of the tool available.</div>
				<div className={styles.versions}>
					<div>Client Version: {bundleVersion}</div>
					<div>Server Version: {serverBundleVersion}</div>
				</div>
			</div>
			<Button
				isDisabled={isRefreshing}
				isProcessing={isRefreshing}
				className={styles.refresh}
				onClick={handleRefreshClicked}>
				Refresh
			</Button>
		</div>
	);
}
