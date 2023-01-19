const http = require("http");
const HOST = "localhost";
const PORT = 3003;
const getUsers = require("./modules/users");

const requestListener = function (req, res) {
  const url = new URL(req.url, "http://127.0.0.1");
  const name = url.searchParams.get("hello");
  const searchParams = url.searchParams;

  if (url.searchParams.has("users")) {
    res.statusMessage = "ok";
    res.setHeader("Content-Type", "application/json");
    res.write(getUsers());
    res.end();
    return;
  }
  if (name) {
    res.statusCode = 200;
    res.statusMessage = "ok";
    res.setHeader("Content-Type", "text/html; charset=utf8");
    const name = url.searchParams.get("hello");
    res.write(`Hello, ${name}`);
    res.end();
    return;
  }
  if (name === "" || name === " ") {
    res.statusCode = 400;
    res.statusMessage = " Bad Request";
    res.setHeader("Content-Type", "text/html; charset=utf8");
    const name = url.searchParams.get("hello");
    res.write(`Enter a name`);
    res.end();
    return;
  }
  if (![...searchParams].length) {
    res.statusCode = 200;
    res, (statusMessage = "ok");
    res.setHeader("Content-Type", "text/html; charset=utf8");
    res.write("Hello, world!");
    res.end();
  }
  res.statusCode = 500;
  res.statusMessage = "Internal Server Error";
  res.end();
};
const server = http.createServer(requestListener);

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});