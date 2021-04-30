import React from 'react';
import { Story, Meta } from '@storybook/react';
import WeightSummary, { IWeightSummaryProps } from './WeightSummary';
import '~/index.css';

export default {
	title: 'Pages/Home/WeightSummary',
	component: WeightSummary
} as Meta;

const Template: Story<IWeightSummaryProps> = props =>
	<WeightSummary {...props} />;

export const FilterAndSort = Template.bind({});
FilterAndSort.args = {
	title: 'Example Summary',
	startDate: '2020-01-01',
	targetWeightInPounds: 200,
	weightStateByDate: {
		'2019-12-31': {
			weightInPounds: 1000,
			isSaving: false
		},
		'2020-01-02': {
			weightInPounds: 240,
			isSaving: false
		},
		'2020-01-01': {
			weightInPounds: 250,
			isSaving: false
		}
	}
};
