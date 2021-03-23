import React from 'react';
import LoadingIcon from './LoadingIcon';
import styles from './ChunkLoading.scss';

export default class ChunkLoading extends React.PureComponent {
	render() {
		return (
			<div className={styles.loading}>
				<LoadingIcon />
			</div>
		);
	}
}
