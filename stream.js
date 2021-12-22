const fs = require("fs");
const http = require("http");
const { promisify } = require('util');
const multiparty = require('multiparty');
/*
readStream = fs.createReadStream("./assets/lorum-ipsum.md", "utf-8");

console.log("Reading stream ...");

readStream.on("data", data => {
    console.log(`Reading ${data.length - 1} bytes ...`);
});
*/
/*
readStream.once("data", data => {
    console.log(data);
});
*/

// Stream video
const PORT = 3000;
const videoFile = "./assets/powder-day.mp4";
const fileInfo = promisify(fs.stat);

const respondWithVideo = async (req, res) => {
    const { size } = await fileInfo(videoFile);
    const range = req.headers.range;
    if (range) {
        console.log("Range called");
        let [start, end] = range.replace(/bytes=/, '').split('-');
        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : size - 1;
        console.log(`Start: ${start}, End: ${end}`);
        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': (end - start) + 1,
            'Content-Type': 'video/mp4'
        });
        fs.createReadStream(videoFile, { start, end })
            .pipe(res)
            .on('error', console.error);
    }else {
    console.log("Range not called");
    res.writeHead(200, {
        'Content-Length': size,
        'Content-Type': 'video/mp4'
    });
    fs.createReadStream(videoFile)
        .pipe(res)
        .on('error', console.error);
    }
};

http.createServer((req, res) => {
    if(req.method === 'POST'){
        let form = new multiparty.Form();
        form.on('part', (part) => {
            part.pipe(fs.createWriteStream(`./assets/${part.filename}`))
                .on('close', () => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(`<h1>File ${part.filename} is uploaded</h1>`);
                });
        });
        form.parse(req);
    }else if(req.url === '/video'){
        respondWithVideo(req, res);
    }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
            <form enctype="multipart/form-data" method="POST" action="/">
                <input type="file" name="upload-file" />
                <button>Upload</button>
            </form>
        `);
    }
}).listen(PORT, () => console.log(`stream -> http://localhost:${PORT}`));