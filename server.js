const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const requestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parse the URL to get query parameters
  const limit = parsedUrl.query.limit || 10; // Default limit is 10
  const page = parsedUrl.query.page || 1; // Default page is 1

  if (req.method === "GET" && parsedUrl.pathname === "/v1/api/users") {
    fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      let users = JSON.parse(data);

      // Filter by name if present in query params
      if (parsedUrl.query.name) {
        users = users.filter(
          (user) =>
            user.name.toLowerCase() === parsedUrl.query.name.toLowerCase()
        );
      }

      // Implement pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      users = users.slice(startIndex, endIndex);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

const server = http.createServer(requestHandler);
server.listen(3000, () => {
  console.log("Server running on <http://localhost:3000/>");
});
