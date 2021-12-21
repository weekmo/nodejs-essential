const fs = require("fs");

fs.readdir("./assets", (err, filesAsync) => {
    if (err) {
        console.log(`Error: ${err.message}`);
    }
    console.log(filesAsync);
    console.log("Async finished reading the folder!");
});

fs.readFile("./assets/Readme.md", "utf-8", (err, text) => {
    if (err) {
        console.log(`Error: ${err.message}`);
    }
    console.log(text);
});

fs.readFile("./assets/alex.jpg", (err, img) => {
    if (err) {
        console.log(`Error: ${err.message}`);
    }
    console.log(img);
});

console.log("Sync started reading files");
// It will block the thread
const files = fs.readdirSync("./assets");
console.log(files);
console.log("Sync finished reading files");

// Writing to a file
const md = `
    # Thsi is Readme file

## it is written by a code

It is kind of hello world io

`;

fs.writeFile("./Readme.md", md.trim(), err => {
    if (err) {
        console.log(`Error: ${err}`);
        process.exit();
    }
});