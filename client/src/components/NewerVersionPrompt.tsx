import * as React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import { IState } from '~/reducers/rootReducer';
import styles from './NewerVersionPrompt.scss';

interface INewerVersionPromptStateProps {
	bundleVersion: string;
	serverBundleVersion: string;
}

type INewerVersionPromptProps =
	INewerVersionPromptStateProps;

function mapStateToProps(state: IState): INewerVersionPromptStateProps {
	const { heartbeat: { bundleVersion, serverBundleVersion } } = state;
	return {
		bundleVersion,
		serverBundleVersion
	};
}

interface INewerVersionPromptState {
	isRefreshing: boolean;
}

class NewerVersionPrompt extends React.PureComponent<INewerVersionPromptProps, INewerVersionPromptState> {
	constructor(props: INewerVersionPromptProps) {
		super(props);
		this.state = {
			isRefreshing: false
		};
	}

	render() {
		const { bundleVersion, serverBundleVersion } = this.props;
		if (bundleVersion === serverBundleVersion) {
			return null;
		}
		const { isRefreshing } = this.state;
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
					type='primary'
					isDisabled={isRefreshing}
					isProcessing={isRefreshing}
					className={styles.refresh}
					onClick={this.handleRefreshClicked}>
					Refresh
				</Button>
			</div>
		);
	}

	handleRefreshClicked = () => {
		this.setState({ isRefreshing: true });
		window.location.reload(true);
	};
}

export default connect<
	INewerVersionPromptStateProps
>(mapStateToProps)(NewerVersionPrompt);
