const fs = require("fs");
const http = require("http");

const videoFile = "./assets/powder-day.mp4";
const PORT = 3000;
http.createServer((req, res) => {

    fs.readFile(videoFile, (err, data) => {
        if (err) {
            console.log(`Error: ${err}`);
        }
        res.writeHeader(200, { "Content-Type": "video/mp4" });
        res.end(data);
    });
}).listen(PORT, () => console.log(`buffer --> http://localhost:${PORT}`));