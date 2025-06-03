const os = require("os");
const http = require("http");
const PORT = 3000;
const productService = require("./services/product-service");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url == "/create-product") {
    res.writeHead(200, { "Content-type": "application/JSON" });
    res.end(
      JSON.stringify({
        name: "Apple",
        color: "Red",
      })
    );
  }

  if (req.method === "GET" && req.url == "/get-product") {
    res.writeHead(200, { "Content-type": "application/JSON" });
    res.end(JSON.stringify(productService.getProducts()));
  }
});

server.listen(PORT, () => {
  console.log("server is started");
});
