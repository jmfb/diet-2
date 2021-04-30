import React from 'react';
import { Story, Meta } from '@storybook/react';
import LoadingIcon from './LoadingIcon';

export default {
	title: 'Components/LoadingIcon',
	component: LoadingIcon
} as Meta;

const Template: Story = () =>
	<LoadingIcon />;

export const Default = Template.bind({});
