import "@testing-library/jest-dom";

const svgPrototype = SVGElement.prototype as SVGElement & {
	getBBox?: () => { x: number; y: number; width: number; height: number };
};

if (!svgPrototype.getBBox) {
	svgPrototype.getBBox = () => ({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
}

Object.defineProperty(globalThis, "ResizeObserver", {
	writable: true,
	configurable: true,
	value: class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	},
});