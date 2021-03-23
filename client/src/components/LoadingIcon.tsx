import React from 'react';
import './LoadingIcon.scss';

export default class LoadingIcon extends React.PureComponent {
	render() {
		const circles = [
			{ cx: 42.601, cy: 11.462 },
			{ cx: 49.063, cy: 27.063 },
			{ cx: 42.601, cy: 42.663 },
			{ cx: 27, cy: 49.125 },
			{ cx: 11.399, cy: 42.663 },
			{ cx: 4.938, cy: 27.063 },
			{ cx: 11.399, cy: 11.462 },
			{ cx: 27, cy: 5 }
		];
		return (
			<svg viewBox='0 0 58 58' xmlns='http://www.w3.org/2000/svg' className='c-icon'>
				<g fill='none' fillRule='evenodd'>
					<g transform='translate(2 1)' stroke='currentColor' strokeWidth='1.5'>
						{circles.map((circle, index) =>
							this.renderCircle(circle.cx, circle.cy, index)
						)}
					</g>
				</g>
			</svg>
		);
	}

	renderCircle = (cx: number, cy: number, index: number) => {
		const zeroes = [0, 0, 0, 0, 0, 0, 0, 0];
		return (
			<circle key={index} cx={cx} cy={cy} r='5' fillOpacity='0' fill='currentColor'>
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
	};
}
