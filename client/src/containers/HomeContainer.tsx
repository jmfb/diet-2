import React from 'react';
import { connect } from 'react-redux';
import Home from '~/pages/Home';
import { IProfile } from '~/models';
import { IWeightsState } from '~/reducers/weights';
import { IState } from '~/reducers/rootReducer';
import { saveWeight } from '~/actions/SaveWeight';
import { loadAllWeights } from '~/actions/LoadAllWeights';
import { getProfile } from '~/actions/GetProfile';

interface IHomeContainerStateProps {
	weights: IWeightsState;
	loadProfile: boolean;
	profile?: IProfile;
}

interface IHomeContainerDispatchProps {
	saveWeight(date: string, weightInPounds: number): void;
	loadAllWeights(): void;
	getProfile(): void;
}

type IHomeContainerProps =
	IHomeContainerStateProps &
	IHomeContainerDispatchProps;

function mapStateToProps(state: IState): IHomeContainerStateProps {
	const { weights, profile: { isLoading, profile } } = state;
	const loadProfile = !profile && !isLoading;
	return {
		weights,
		loadProfile,
		profile
	};
}

const mapDispatchToProps: IHomeContainerDispatchProps = {
	saveWeight,
	loadAllWeights,
	getProfile
};

class HomeContainer extends React.PureComponent<IHomeContainerProps> {
	componentDidMount() {
		const { weights: { isLoading, isLoaded }, loadAllWeights, loadProfile } = this.props;
		if (!isLoading && !isLoaded) {
			loadAllWeights();
		}
		if (loadProfile) {
			getProfile();
		}
	}

	render() {
		const { weights, saveWeight, profile } = this.props;
		return (
			<Home
				{...{weights, profile}}
				onSaveWeight={saveWeight}
				/>
		);
	}
}

export default connect<
	IHomeContainerStateProps,
	IHomeContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(HomeContainer);
