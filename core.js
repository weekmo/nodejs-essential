const path = require("path");
const {log} = require("util");
const {getHeapCodeStatistics}   = require("v8");

log(path.basename(__filename));
log(getHeapCodeStatistics());
