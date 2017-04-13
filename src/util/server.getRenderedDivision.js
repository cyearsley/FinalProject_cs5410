module.exports = function (x, y, blockWH, world) {
	// assuming the window port is 700px high and 1400px wide
	// x and y are NOT the actualX/Ys
	let windowWidth = 1400;
	let windowHeight = 700;

	let xFromCenter = Math.floor(windowWidth/blockWH);
	let startingXIndex = x - xFromCenter;
	let endingXIndex = x + xFromCenter;

	let yFromCenter = Math.floor(windowHeight/blockWH);
	let startingYIndex = y - yFromCenter;
	let endingYIndex = y + yFromCenter;

	let subdivision = [];
	for (let ii = 0; ii <= endingYIndex - startingYIndex; ii += 1) {
		subdivision.push([]);
		for (let jj = 0; jj <= endingXIndex - startingXIndex; jj += 1) {
			subdivision[ii].push(world[startingYIndex + ii][startingXIndex + jj]);
		}
	}

	// return {
	// 	startingXIndex: startingX,
	// 	endingXIndex: endingX,
	// 	startingYIndex: startingY,
	// 	endingYIndex: endingY
	// }

	subdivision.startingXIndex = startingXIndex;
	subdivision.startingYIndex = startingYIndex;
	subdivision.endingXIndex = endingXIndex;
	subdivision.endingYIndex = endingYIndex;
	return {
		subdivision: subdivision,
		startingXIndex: startingXIndex,
		startingYIndex: startingYIndex,
		endingXIndex: endingXIndex,
		endingYIndex: endingYIndex
	}
};