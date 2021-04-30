import React from 'react';

export interface IChangeProps {
	changeInPounds: number;
}

export default function Change(props: IChangeProps) {
	const { changeInPounds } = props;
	const sign = changeInPounds > 0 ? '+' : '';
	return (
		<>
			({sign}{changeInPounds} lbs)
		</>
	);
}
