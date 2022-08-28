import React from 'react';
import { Story, Meta } from '@storybook/react';
import Change, { IChangeProps } from './Change';
import '~/index.css';

export default {
	title: 'Pages/Home/WeightBadge/Change',
	component: Change
} as Meta;

const Template: Story<IChangeProps> = props => <Change {...props} />;

export const Negative = Template.bind({});
Negative.args = {
	changeInPounds: -1
};

export const Zero = Template.bind({});
Zero.args = {
	changeInPounds: 0
};

export const Positive = Template.bind({});
Positive.args = {
	changeInPounds: 1
};
