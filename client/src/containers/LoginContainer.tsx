import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Login from '~/pages/Login';
import { IState } from '~/reducers/rootReducer';
import { getAuthenticationUrl } from '~/actions/GetAuthenticationUrl';
import { logOut } from '~/actions/LogOut';

interface ILoginContainerStateProps {
	isSigningIn: boolean;
	url?: string;
}

interface ILoginContainerDispatchProps {
	getAuthenticationUrl(): void;
	logOut(): void;
}

type ILoginContainerProps =
	ILoginContainerStateProps &
	ILoginContainerDispatchProps;

function mapStateToProps(state: IState): ILoginContainerStateProps {
	const { auth: { isSigningIn, url } } = state;
	return { isSigningIn, url };
}

const mapDispatchToProps: ILoginContainerDispatchProps = {
	getAuthenticationUrl,
	logOut
};

class LoginContainer extends React.PureComponent<ILoginContainerProps> {
	componentDidMount() {
		const { logOut } = this.props;
		logOut();
	}

	render() {
		const { isSigningIn, url, getAuthenticationUrl } = this.props;
		if (url !== undefined) {
			return (
				<Redirect to={url} />
			);
		}
		return (
			<Login
				{...{isSigningIn, url}}
				onClickSignIn={getAuthenticationUrl}
				/>
		);
	}
}

export default connect<
	ILoginContainerStateProps,
	ILoginContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(LoginContainer);
