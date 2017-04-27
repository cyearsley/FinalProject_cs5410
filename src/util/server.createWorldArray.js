module.exports = function (size) {
	let width = 3000;
	let height = 1000;
	let worldArr = [];

	let trees = {
		tree1: [
						['e','l','e'],
						['l','l','l'],
						['l','l','l'],
						['e','w','e'],
						['e','w','e'],
						['e','w','e'],
		],

		tree2: [
						['e','e','e','l','e','e','e'],
						['e','e','l','l','l','e','e'],
						['e','e','l','w','l','e','e'],
						['e','e','e','w','e','e','e'],
						['e','l','e','w','e','e','e'],
						['l','w','w','w','e','l','e'],
						['e','l','e','w','l','w','l'],
						['e','e','e','w','w','w','e'],
						['e','e','e','w','e','e','e']
		],

		tree3: [
						['e','l','e'],
						['l','w','l'],
						['e','w','e']
		],

		tree4: [
						['e', 'l', 'e'],
						['l', 'w', 'l'],
						['l', 'w', 'l'],
						['e', 'w', 'e'],
						['e', 'w', 'e'],
						['e', 'w', 'e'],
						['e', 'w', 'e'],
						['e', 'w', 'e'],
						['e', 'w', 'e']
		]
	}

	let map = {
		 e: 'empty',
		 l: 'leaves',
		 w: 'wood'
	}

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
				let ifTree = Math.floor(Math.random() * (10 - 1)) + 1;

				if (randomVal <= 1) {
					blockType = 'empty';
					backType = blockType;
				}
				else {
					if (ifTree >= 9) {
						let treeIndex = (+Math.floor(Math.random() * (4 - 1)) + 1);
						let treeType = trees['tree' + treeIndex];
						if (ii - treeType.length > 0 && jj + treeType.length < 3000) {
							let startII = ii - treeType.length;
							let startJJ = jj - treeType[0].length;

							for (yy = 0; yy < treeType.length; yy += 1) {
								for (xx = 0; xx < treeType[0].length; xx += 1) {
									if (typeof worldArr[startII+yy] !== 'undefined' && typeof worldArr[startII+yy][startJJ+xx] !== 'undefined') {
										worldArr[startII+yy][startJJ+xx].blockType = map[treeType[yy][xx]];
									}
								}
								if (yy === treeType.length - 1) {
									worldArr[startII+treeType.length][startJJ+Math.floor(treeType[0].length/2)].blockType = 'grass';
								}
							}
						}
					}
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