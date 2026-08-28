/**
 * Futbol Atlası: Kariyer Efsanesi - Local Wi-Fi HTTP Server
 * Serves game files and outputs local network IP address for mobile testing.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;

// MIME type map for static assets
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

// Find local network IP address (non-internal IPv4)
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (let interfaceName in interfaces) {
        for (let iface of interfaces[interfaceName]) {
            // Skip loopback and non-IPv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

const server = http.createServer((req, res) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);

    // Normalize URL path
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // Security check: ensure path is within the workspace
    if (!filePath.startsWith(__dirname)) {
        res.statusCode = 403;
        res.end('Access Denied');
        return;
    }

    // Get file extension and set Content-Type header
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`[404] File not found: ${req.url}`);
                res.statusCode = 404;
                res.end('File Not Found');
            } else {
                console.error(`[500] Server error:`, err);
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

const localIp = getLocalIpAddress();

server.listen(PORT, '0.0.0.0', () => {
    console.log('\n==================================================');
    console.log('⚽ FUTBOL ATLASI: KARİYER EFSANESİ YEREL SUNUCUSU');
    console.log('==================================================');
    console.log(`🚀 Sunucu başarıyla başlatıldı!`);
    console.log(`💻 Bilgisayarda Oynamak İçin:  http://localhost:${PORT}`);
    console.log('--------------------------------------------------');
    console.log(`📱 Telefondan Oynamak İçin (Aynı Wi-Fi):`);
    console.log(`🔗 URL: http://${localIp}:${PORT}`);
    console.log('==================================================\n');
});
