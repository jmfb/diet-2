import React from 'react';

interface ISvgCircleProps {
	cx: number;
	cy: number;
	index: number;
}

export default function SvgCircle(props: ISvgCircleProps) {
	const { cx, cy, index } = props;
	const zeroes = [0, 0, 0, 0, 0, 0, 0, 0];
	return (
		<circle cx={cx} cy={cy} r='5' fillOpacity='0' fill='currentColor'>
			<animate
				attributeName='fill-opacity'
				begin='0s'
				dur='1.3s'
				values={[...zeroes.slice(0, index), 1, ...zeroes.slice(index + 1)].join(';')}
				calcMode='linear'
				repeatCount='indefinite'
				/>
		</circle>
	);
}
