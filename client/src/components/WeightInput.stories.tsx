import React from 'react';
import { Story, Meta } from '@storybook/react';
import WeightInput, { IWeightInputProps } from './WeightInput';
import '~/index.css';

export default {
	title: 'Components/WeightInput',
	component: WeightInput
} as Meta;

const Template: Story<IWeightInputProps> = props => <WeightInput {...props} />;

export const Blank = Template.bind({});

export const BlankWithFocus = Template.bind({});
BlankWithFocus.args = {
	autoFocus: true
};

export const WithValue = Template.bind({});
WithValue.args = {
	value: 200.2
};

export const WithValueWithFocus = Template.bind({});
WithValueWithFocus.args = {
	value: 200.2,
	autoFocus: true
};
