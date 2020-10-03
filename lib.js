const fs = require("fs").promises;
const path = require("path");
const glob = require("globby");

module.exports = {
  fileStats
};

async function fileStats(globArr = []) {
  const fileMap = new Map();
  for (const file of await getFiles(globArr)) {
    const ext = path.extname(file);
    const values = fileMap.get(ext) || [];
    values.push({ file, size: await getFileSize(file) });
    fileMap.set(ext, values);
  }

  console.log("EXT     | FILES | SIZE");
  console.log("--------|------:|----:");
  for (const [ext = "", arr = []] of sortMapByKey(fileMap)) {
    const sum = Math.round(arrSum(arr, "size") / 1024);
    console.log(`${ext}\t| ${arr.length} | ${sum.toLocaleString()} KB`);
  }
}

async function getFiles(globPaths = []) {
  return glob(
    [
      "**",
      "!node_modules",
      // Exclude current file from stats.
      `!${__filename}`,
    ].concat(globPaths)
  );
}

async function getFileSize(file = "") {
  const { size } = await fs.stat(file);
  return size;
}

function sortMapByKey(map) {
  const $map = [...map.entries()];
  return $map.sort(([ext1], [ext2]) => ext1.localeCompare(ext2));
}

function arrSum(arr = [], key = "size") {
  return arr.reduce((acc = 0, item = {}) => acc + item[key], 0);
}
