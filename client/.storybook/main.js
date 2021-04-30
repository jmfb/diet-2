const postcss = require('postcss');

module.exports = {
	stories: [
		'../src/**/*.stories.tsx'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		{
			name: '@storybook/addon-postcss',
			options: {
				cssLoaderOptions: {
					modules: {
						localIdentName: '[name]_[local]_[hash:base64:3]'
					}
				},
				postcssLoaderOptions: {
					implementation: postcss
				}
			}
		}
	]
};
