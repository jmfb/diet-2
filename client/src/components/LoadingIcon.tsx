import React from 'react';
import cx from 'classnames';
import styles from './LoadingIcon.scss';

export default class LoadingIcon extends React.PureComponent {
	render() {
		return (
			<svg
				aria-label='loading'
				className={cx('c-icon', styles.loading)}
				preserveAspectRatio="xMinYMin meet"
				version="1.1"
				viewBox="0 0 24 24">
				<circle className="pos1" cx="3" cy="12" r="3" />
				<circle className="pos2" cx="12" cy="12" r="3" />
				<circle className="pos3" cx="21" cy="12" r="3" />
			</svg>
		);
	}
}
