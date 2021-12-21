const fs = require("fs");

readStream = fs.createReadStream("./assets/lorum-ipsum.md", "utf-8");

console.log("Reading stream ...");

readStream.on("data", data => {
    console.log(`Reading ${data.length - 1} bytes ...`);
});

/*
readStream.once("data", data => {
    console.log(data);
});
*/