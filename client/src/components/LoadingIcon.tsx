import React from 'react';
import SvgCircle from './SvgCircle';
import './LoadingIcon.scss';

export default function LoadingIcon() {
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
		<svg viewBox='0 0 58 58' xmlns='http://www.w3.org/2000/svg' className='loading-icon'>
			<g fill='none' fillRule='evenodd'>
				<g transform='translate(2 1)' stroke='currentColor' strokeWidth='1.5'>
					{circles.map(({ cx, cy }, index) =>
						<SvgCircle
							key={index}
							{...{cx, cy, index}}
							/>
					)}
				</g>
			</g>
		</svg>
	);
}
