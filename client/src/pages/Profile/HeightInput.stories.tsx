import React from 'react';
import { Story, Meta } from '@storybook/react';
import HeightInput, { IHeightInputProps } from './HeightInput';
import '~/index.css';

export default {
	title: 'Pages/Profile/HeightInput',
	component: HeightInput
} as Meta;

const Template: Story<IHeightInputProps> = props =>
	<HeightInput {...props} />;

export const Default = Template.bind({});

export const WithValue = Template.bind({});
WithValue.args = {
	value: 80
};
