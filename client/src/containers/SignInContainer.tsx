import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import SignIn from '~/pages/SignIn';
import IState from '~/redux/IState';
import { getAuthenticationUrl } from '~/redux/auth';
import { signOut } from '~/redux/signOut';

interface ISignInContainerStateProps {
	isSigningIn: boolean;
	url?: string;
}

interface ISignInContainerDispatchProps {
	getAuthenticationUrl(): void;
	signOut(): void;
}

type ISignInContainerProps =
	ISignInContainerStateProps &
	ISignInContainerDispatchProps;

function mapStateToProps(state: IState): ISignInContainerStateProps {
	const { auth: { isSigningIn, url } } = state;
	return { isSigningIn, url };
}

const mapDispatchToProps: ISignInContainerDispatchProps = {
	getAuthenticationUrl,
	signOut
};

class SignInContainer extends React.PureComponent<ISignInContainerProps> {
	componentDidMount() {
		const { signOut } = this.props;
		signOut();
	}

	render() {
		const { isSigningIn, url, getAuthenticationUrl } = this.props;
		if (url !== undefined) {
			return (
				<Redirect to={url} />
			);
		}
		return (
			<SignIn
				{...{isSigningIn, url}}
				onClickSignIn={getAuthenticationUrl}
				/>
		);
	}
}

export default connect<
	ISignInContainerStateProps,
	ISignInContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(SignInContainer);
