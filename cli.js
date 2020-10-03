#!/usr/bin/env node

const lib = require("./lib");

const globArr = (process.env.GLOBS || "").split(",");

lib.fileStats(globArr);
