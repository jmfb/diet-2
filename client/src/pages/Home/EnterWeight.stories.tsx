import React from 'react';
import { Story, Meta } from '@storybook/react';
import EnterWeight, { IEnterWeightProps } from './EnterWeight';
import '~/index.css';

export default {
	title: 'Pages/Home/EnterWeight',
	component: EnterWeight
} as Meta;

const Template: Story<IEnterWeightProps> = props => <EnterWeight {...props} />;

export const Default = Template.bind({});
Default.args = {
	date: '2020-01-01',
	weightState: undefined
};

export const Saving = Template.bind({});
Saving.args = {
	date: '2020-01-01',
	weightState: {
		isSaving: true
	}
};

export const WithValue = Template.bind({});
WithValue.args = {
	date: '2020-01-01',
	weightState: {
		isSaving: false,
		weightInPounds: 200
	}
};
