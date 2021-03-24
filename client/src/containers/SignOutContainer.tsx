import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from '~/actions/LogOut';

interface ISignOutContainerDispatchProps {
	logOut(): void;
}

type ISignOutContainerProps =
	ISignOutContainerDispatchProps;

const mapDispatchToProps: ISignOutContainerDispatchProps = {
	logOut
};

class SignOutContainer extends React.PureComponent<ISignOutContainerProps> {
	componentDidMount() {
		const { logOut } = this.props;
		logOut();
	}

	render() {
		return (
			<Redirect to='/login' />
		);
	}
}

export default connect<
	void,
	ISignOutContainerDispatchProps
>(null, mapDispatchToProps)(SignOutContainer);
