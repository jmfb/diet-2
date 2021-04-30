import React from 'react';
import cx from 'classnames';
import styles from './SignInButton.css';

export interface ISignInButtonProps {
	isDisabled: boolean;
	type: 'dark' | 'light';
	className?: string;
	onClick(): void;
}

export default function SignInButton(props: ISignInButtonProps) {
	const { isDisabled, type, className, onClick } = props;

	const handleClicked = () => {
		if (!isDisabled) {
			onClick();
		}
	};

	return (
		<div
			className={cx(
				styles.root,
				styles[type],
				{ [styles.disabled]: isDisabled },
				className)}
			onClick={handleClicked}>
		</div>
	);
}
