const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`[SERVER] Request received: ${req.method} ${req.url}`);

    res.setHeader("Content-Type", "text/plain");

    if (req.url === "/") {
        res.statusCode = 200;
        res.end("Welcome to Smart Utility Toolkit");
    } else if (req.url === "/about") {
        res.statusCode = 200;
        res.end("About: Node.js built-in HTTP server");
    } else if (req.url === "/contact") {
        res.statusCode = 200;
        res.end("Contact: smart-toolkit@example.com");
    } else {
        res.statusCode = 404;
        res.end("404 - Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = server;
