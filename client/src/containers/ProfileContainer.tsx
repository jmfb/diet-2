import React from 'react';
import { connect } from 'react-redux';
import Profile from '~/pages/Profile';
import { IProfile } from '~/models';
import { IProfileState } from '~/reducers/profile';
import { IState } from '~/reducers/rootReducer';
import { getProfile } from '~/actions/GetProfile';
import { saveProfile } from '~/actions/SaveProfile';

interface IProfileContainerStateProps {
	profile: IProfileState;
}

interface IProfileContainerDispatchProps {
	getProfile(): void;
	saveProfile(profile: IProfile): void;
}

type IProfileContainerProps =
	IProfileContainerStateProps &
	IProfileContainerDispatchProps;

function mapStateToProps(state: IState): IProfileContainerStateProps {
	const { profile } = state;
	return {
		profile
	};
}

const mapDispatchToProps: IProfileContainerDispatchProps = {
	getProfile,
	saveProfile
};

class ProfileContainer extends React.PureComponent<IProfileContainerProps> {
	componentDidMount() {
		const { profile: { isLoading, profile }, getProfile } = this.props;
		const loadProfile = !profile && !isLoading;
		if (loadProfile) {
			getProfile();
		}
	}

	render() {
		const { profile: { profile, isSaving }, saveProfile } = this.props;
		return (
			<Profile
				{...{profile, isSaving}}
				onSave={saveProfile}
				/>
		);
	}
}

export default connect<
	IProfileContainerStateProps,
	IProfileContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(ProfileContainer);
