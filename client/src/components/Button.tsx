import React from 'react';
import LoadingIcon from './LoadingIcon';
import cx from 'classnames';
import styles from './Button.scss';

type ButtonType = 'primary' | 'secondary' | 'danger';

interface IButtonProps {
	className?: string;
	type: ButtonType;
	onClick?(): void;
	children?: React.ReactNode;
	isDisabled?: boolean;
	isProcessing?: boolean;
}

export default function Button(props: IButtonProps) {
	const { className, type, onClick, children, isDisabled, isProcessing } = props;
	return (
		<button
			{...{onClick}}
			className={cx(styles.button, styles[type], className)}
			disabled={isDisabled}>
			<div className={cx({ [styles.processing]: isProcessing })}>{children}</div>
			{isProcessing &&
				<LoadingIcon />
			}
		</button>
	);
}
