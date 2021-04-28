import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { signOut } from '~/redux/signOut';

interface ISignOutContainerDispatchProps {
	signOut(): void;
}

type ISignOutContainerProps =
	ISignOutContainerDispatchProps;

const mapDispatchToProps: ISignOutContainerDispatchProps = {
	signOut
};

class SignOutContainer extends React.PureComponent<ISignOutContainerProps> {
	componentDidMount() {
		const { signOut } = this.props;
		signOut();
	}

	render() {
		return (
			<Redirect to='/sign-in' />
		);
	}
}

export default connect<
	void,
	ISignOutContainerDispatchProps
>(null, mapDispatchToProps)(SignOutContainer);
