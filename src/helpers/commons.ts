export function binarySearch<T>(
	list: T[],
	value: number,
	getValueToCompare: (element: T) => number,
): T | undefined {
	let start = 0;
	let end = list.length - 1;
	while (start <= end) {
		const middlePos = Math.floor((start + end) / 2);
		const middleElement = list[middlePos];
		if (getValueToCompare(middleElement) < value) {
			start = middlePos + 1;
		} else if (getValueToCompare(middleElement) > value) {
			end = middlePos - 1;
		} else {
			return list[middlePos];
		}
	}
}
