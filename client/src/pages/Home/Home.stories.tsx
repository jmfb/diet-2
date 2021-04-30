import React from 'react';
import { Story, Meta } from '@storybook/react';
import Home, { IHomeProps } from './Home';
import '~/index.css';

export default {
	title: 'Pages/Home/Page',
	component: Home
} as Meta;

const Template: Story<IHomeProps> = props =>
	<Home {...props} />;

export const LoadingProfile = Template.bind({});
LoadingProfile.args = {
	weights: {
		weightStateByDate: {},
		isLoading: false,
		isLoaded: false
	},
	profile: undefined,
	today: '2020-01-01',
};

export const LoadingWeights = Template.bind({});
LoadingWeights.args = {
	weights: {
		weightStateByDate: {},
		isLoading: true,
		isLoaded: false
	},
	profile: {
		targetWeightInPounds: undefined,
		heightInInches: undefined
	},
	today: '2020-01-01',
};

export const ProfileLoadedTooFast = Template.bind({});
ProfileLoadedTooFast.args = {
	weights: {
		weightStateByDate: {},
		isLoading: false,
		isLoaded: false
	},
	profile: {
		targetWeightInPounds: undefined,
		heightInInches: undefined
	},
	today: '2020-01-01',
};

export const NoData = Template.bind({});
NoData.args = {
	weights: {
		weightStateByDate: {},
		isLoading: false,
		isLoaded: true
	},
	profile: {
		targetWeightInPounds: undefined,
		heightInInches: undefined
	},
	today: '2020-01-01',
};

export const SomeData = Template.bind({});
SomeData.args = {
	weights: {
		weightStateByDate: {
			'2020-01-01': {
				weightInPounds: 200,
				isSaving: false
			},
			'2019-12-31': {
				weightInPounds: 210,
				isSaving: false
			},
			'2019-12-30': {
				weightInPounds: 215,
				isSaving: false
			}
		},
		isLoading: false,
		isLoaded: true
	},
	profile: {
		targetWeightInPounds: undefined,
		heightInInches: undefined
	},
	today: '2020-01-01',
};
