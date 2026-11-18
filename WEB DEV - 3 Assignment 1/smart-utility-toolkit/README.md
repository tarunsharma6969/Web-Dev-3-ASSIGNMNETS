# Smart Utility Toolkit - Lab Assignment 1

A Node.js CLI and built-in-module demonstration. No external npm packages are required.

## Files
- `calculator.js` - CLI calculator using `process.argv`.
- `app.js` - custom module import/export demonstration.
- `server.js` - HTTP server with `/`, `/about`, `/contact`, and 404 routes.
- `fileManager.js` - create, read, update, delete, and missing-file handling using `fs`.
- `dice.js` - random dice rolls using `crypto.randomInt()`.
- `executionOrder.js` - simple synchronous/asynchronous execution-order demo.
- `modules/isEven.js` and `modules/logger.js` - reusable custom modules.

## Run
```text
node calculator.js add 10 5
node calculator.js subtract 10 5
node calculator.js multiply 10 5
node calculator.js divide 10 5
node app.js
node fileManager.js
node dice.js 5
node executionOrder.js
node server.js
```

For the server, open `http://localhost:3000/`, `/about`, `/contact`, and an invalid route such as `/test`.
