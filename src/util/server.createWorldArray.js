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
					backType: 'empty',
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 0
				});
			}
			else if (ii < 251) {
				let randomVal = Math.floor(Math.random() * (6 - 1)) + 1;
				let blockType = 'grass';
				let backType = 'dirt';
				if (randomVal <= 2) {
					blockType = 'empty';
					backType = blockType;
				}
				worldArr[ii].push({
					blockType: blockType,
					backType: blockType,
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 10
				});
			}
			else if (ii < 275) {
				let randomVal = Math.floor(Math.random() * (6 - 1)) + 1;
				let blockType = 'dirt';
				if (randomVal <= 2 && worldArr[ii-1][jj].blockType === 'empty') {
					blockType = 'empty';
				}
				worldArr[ii].push({
					blockType: blockType,
					backType: blockType,
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 10
				});
			}
			else {
				let blockType = 'stone';
				let backType = 'stone';
				let randomVal = Math.floor(Math.random() * (6 - 1)) + 1;
				if (randomVal <= 1) {
					blockType = 'coal';
				}
				else if (randomVal <= 3) {
					blockType = 'dirt';
					backType = blockType
				}
				worldArr[ii].push({
					blockType: blockType,
					backType: backType,
					blockIndex_y: ii,
					blockIndex_x: jj,
					hp: 20
				});
			}
		}
	}
	return worldArr;
}