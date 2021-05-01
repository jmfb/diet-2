import React from 'react';
import { useSelector } from 'react-redux';
import NewerVersionPrompt from './NewerVersionPrompt';
import { IState } from '~/redux';

export default function Container() {
	const bundleVersion = useSelector((state: IState) => state.diagnostics.bundleVersion);
	const serverBundleVersion = useSelector((state: IState) => state.diagnostics.serverBundleVersion);

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
