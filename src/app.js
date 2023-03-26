const http = require("http");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  const name = url.searchParams.get("hello");

  if (name) {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.header = "Content-Type: text/plain";
    const name = url.searchParams.get("hello");
    res.write(`Hello, ${name}`);
    res.end();
    return;
  }

  if (name === "" || name === " ") {
    res.statusCode = 400;
    res.statusMessage = "bad request";
    res.header = "Content-Type: text/plain";
    res.write("Enter a name");
    res.end();
    return;
  }

  if (url.searchParams.has("users")) {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.header = "Content-Type: application/json";
    res.write(getUsers());
    res.end();
    return;
  }

  if (![...url.searchParams].length) {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.header = "Content-Type: text/plain";
    res.write("Hello World\n");
    res.end();
    return;
  }

  res.statusCode = 500;
  res.statusMessage = "Internal Server Error";
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
