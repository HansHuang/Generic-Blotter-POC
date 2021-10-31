const fs = require('fs'),
    path = require('path'),
    { promisify } = require('util'),
    { getMime } = require('./mime')


function serveStatic({ prefix, dirPath }) {
    return (res, req) => {
        // this is necessary
        res.onAborted(() => console.log(`res aborted`));

        let filePath = req.getUrl()
        if (prefix) {
            prefix = '/' + prefix.replace(/^\//, '').replace(/\/$/, '')
            filePath = filePath.replace(RegExp(`^${prefix}`), '')
        }
        const fullPath = path.join(dirPath, filePath);

        fs.stat(fullPath, (err, stats) => {
            if (stats && stats.isFile()) {
                return sendFile(res, fullPath)
            }

            if (stats && stats.isDirectory()) {
                return sendFile(res, path.join(fullPath, 'index.html'))
            }

            return sendNotFound(res)
        })
    }
}

function sendFile(res, filePath) {
    fs.stat(filePath, (err, stats) => {
        if (!stats || !stats.isFile()) {
            return sendNotFound(res)
        }

        fs.readFile(filePath, function (err, data) {
            if (err) {
                res.writeStatus('500 Internal server error');
                res.end(`Error getting the file: ${err}.`);
                return;
            }

            res.writeHeader('Content-type', getMime(filePath) || 'text/plain');
            res.end(data);
        });
    })
}

function sendNotFound(res) {
    res.writeStatus('404 Not Found');
    res.end(`404`);
}

module.exports = { serveStatic }