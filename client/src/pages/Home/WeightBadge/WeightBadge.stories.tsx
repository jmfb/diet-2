import React from 'react';
import { Story, Meta } from '@storybook/react';
import WeightBadge, { IWeightBadgeProps } from './WeightBadge';
import '~/index.css';

export default {
	title: 'Pages/Home/WeightBadge/WeightBadge',
	component: WeightBadge
} as Meta;

const Template: Story<IWeightBadgeProps> = props =>
	<WeightBadge {...props} />;

export const Weight = Template.bind({});
Weight.args = {
	targetWeightInPounds: undefined,
	heightInInches: undefined,
	weightStateByDate: {
		'2020-01-01': {
			weightInPounds: 250,
			isSaving: false
		},
		'2020-01-02': {
			weightInPounds: 240,
			isSaving: false
		}
	}
};

export const WeightAndBmi = Template.bind({});
WeightAndBmi.args = {
	targetWeightInPounds: undefined,
	heightInInches: 70,
	weightStateByDate: {
		'2020-01-01': {
			weightInPounds: 250,
			isSaving: false
		},
		'2020-01-02': {
			weightInPounds: 240,
			isSaving: false
		}
	}
};

export const WeightAndGoal = Template.bind({});
WeightAndGoal.args = {
	targetWeightInPounds: 200,
	heightInInches: undefined,
	weightStateByDate: {
		'2020-01-01': {
			weightInPounds: 250,
			isSaving: false
		},
		'2020-01-02': {
			weightInPounds: 240,
			isSaving: false
		}
	}
};

export const Everything = Template.bind({});
Everything.args = {
	targetWeightInPounds: 200,
	heightInInches: 70,
	weightStateByDate: {
		'2020-01-01': {
			weightInPounds: 250,
			isSaving: false
		},
		'2020-01-02': {
			weightInPounds: 240,
			isSaving: false
		}
	}
};
