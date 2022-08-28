import React from 'react';
import { Story, Meta } from '@storybook/react';
import BodyMassIndex, { IBodyMassIndexProps } from './BodyMassIndex';
import '~/index.css';

export default {
	title: 'Pages/Home/WeightBadge/BodyMassIndex',
	component: BodyMassIndex
} as Meta;

const Template: Story<IBodyMassIndexProps> = props => (
	<BodyMassIndex {...props} />
);

export const SevereThinness = Template.bind({});
SevereThinness.args = {
	heightInInches: 70,
	mostRecentWeight: 100
};

export const ModerateThinness = Template.bind({});
ModerateThinness.args = {
	heightInInches: 70,
	mostRecentWeight: 115
};

export const MildThinness = Template.bind({});
MildThinness.args = {
	heightInInches: 70,
	mostRecentWeight: 120
};

export const Normal = Template.bind({});
Normal.args = {
	heightInInches: 70,
	mostRecentWeight: 130
};

export const Overweight = Template.bind({});
Overweight.args = {
	heightInInches: 70,
	mostRecentWeight: 180
};

export const ObeseClass1 = Template.bind({});
ObeseClass1.args = {
	heightInInches: 70,
	mostRecentWeight: 220
};

export const ObeseClass2 = Template.bind({});
ObeseClass2.args = {
	heightInInches: 70,
	mostRecentWeight: 250
};

export const ObeseClass3 = Template.bind({});
ObeseClass3.args = {
	heightInInches: 70,
	mostRecentWeight: 300
};
