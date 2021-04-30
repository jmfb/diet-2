import React from 'react';
import { useSelector } from 'react-redux';
import NewerVersionPrompt from './NewerVersionPrompt';
import IState from '~/redux/IState';

export default function Container() {
	const bundleVersion = useSelector((state: IState) => state.heartbeat.bundleVersion);
	const serverBundleVersion = useSelector((state: IState) => state.heartbeat.serverBundleVersion);

	const handleRefreshClicked = () => {
		window.location.reload(true);
	};

	return (
		<NewerVersionPrompt
			{...{
				bundleVersion,
				serverBundleVersion
			}}
			onClickRefresh={handleRefreshClicked}
			/>
	);
}