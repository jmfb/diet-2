import React from 'react';
import { Story, Meta } from '@storybook/react';
import GenderInput, { IGenderInputProps } from './GenderInput';
import { Gender } from '~/models';
import '~/index.css';

export default {
	title: 'Pages/Profile/GenderInput',
	component: GenderInput
} as Meta;

const Template: Story<IGenderInputProps> = props =>
	<GenderInput {...props} />;

export const Default = Template.bind({});

export const WithValue = Template.bind({});
WithValue.args = {
	value: Gender.Male
};
