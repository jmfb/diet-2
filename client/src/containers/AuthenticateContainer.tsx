import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PageLoading from '~/components/PageLoading';
import { IState } from '~/reducers/rootReducer';
import { authenticate } from '~/actions/Authenticate';
import queryString from 'query-string';

interface IAuthenticateContainerStateProps {
	email?: string;
}

interface IAuthenticateContainerDispatchProps {
	authenticate(code: string): void;
}

type IAuthenticateContainerProps =
	IAuthenticateContainerStateProps &
	IAuthenticateContainerDispatchProps;

function mapStateToProps(state: IState): IAuthenticateContainerStateProps {
	const { auth: { email } } = state;
	return { email };
}

const mapDispatchToProps: IAuthenticateContainerDispatchProps = {
	authenticate
};

class AuthenticateContainer extends React.PureComponent<IAuthenticateContainerProps> {
	componentDidMount() {
		const { authenticate } = this.props;
		const { code } = queryString.parse(location.search) as { code: string; };
		authenticate(code);
	}

	render() {
		const { email } = this.props;
		if (email !== undefined) {
			return (
				<Redirect to='/' />
			);
		}
		return (
			<main>
				<section>
					<PageLoading message='Authenticating...' />
				</section>
			</main>
		);
	}
}

export default connect<
	IAuthenticateContainerStateProps,
	IAuthenticateContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
