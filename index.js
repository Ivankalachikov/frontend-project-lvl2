import fs from 'fs';
import path from 'path';
import generateDiffsTree from './src/generateDiffsTree.js';
import parse from './src/parsers.js';
import formatOutput from './src/formatters/index.js';
import normalizePath from './src/utils.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = normalizePath(filepath1);
  const path2 = normalizePath(filepath2);
  const type1 = path.extname(path1);
  const type2 = path.extname(path2);

  const file1Data = fs.readFileSync(path1, 'utf-8');
  const file2Data = fs.readFileSync(path2, 'utf-8');

  const parsedData1 = parse(type1, file1Data);
  const parsedData2 = parse(type2, file2Data);

  const diffs = generateDiffsTree(parsedData1, parsedData2);
  const formattedString = formatOutput(diffs, format);
  return (formattedString);
};

export default gendiff;
