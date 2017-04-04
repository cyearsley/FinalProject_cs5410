module.exports = function (size) {
	let width = 3000;
	let height = 1000;
	let worldArr = [];

	for (let ii = 0; ii < 1000; ii += 1) {
		worldArr.push([]);
		for (let jj = 0; jj < 3000; jj += 1) {
			if (ii < 250) {
				worldArr[ii].push({
					blockType: 'empty',
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 0
				});
			}
			else if (ii < 251) {
				worldArr[ii].push({
					blockType: 'grass',
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 10
				});
			}
			else if (ii < 275) {
				worldArr[ii].push({
					blockType: 'dirt',
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 10
				});
			}
			else {
				worldArr[ii].push({
					blockType: 'stone',
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 20
				});
			}
		}
	}
	return worldArr;
}