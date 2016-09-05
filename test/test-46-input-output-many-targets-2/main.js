#!/usr/bin/env node

'use strict';

const assert = require('assert');
const utils = require('../utils.js');

assert(!module.parent);
assert(__dirname === process.cwd());

const target = process.argv[2] || 'latest';
const input = './test-x-index.js';
let { arch } = process; // TODO extract arch from `target` once it contains
arch = { ia32: 'x86' }[arch] || arch;

const newcomers = [
  `test-output-${target}-linux-${arch}`,
  `test-output-${target}-osx-${arch}`,
  `test-output-${target}-win-${arch}.exe`
];

const before = utils.filesBefore(newcomers);

utils.pkg.sync([
  '--target', `${target}-linux,${target}-osx,${target}-win`,
  '--output', 'test-output', input
]);

utils.filesAfter(before, newcomers);