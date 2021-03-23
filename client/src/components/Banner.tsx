import React from 'react';
import styles from './Banner.scss';
import cx from 'classnames';

type BannerType = 'error' | 'message';

interface IBannerProps {
	type: BannerType;
	display: string;
}

export default class Banner extends React.PureComponent<IBannerProps> {
	render() {
		const { type, display } = this.props;
		return(
			<div className={cx(styles.root, styles[type])}>{display}</div>
		);
	}
}
