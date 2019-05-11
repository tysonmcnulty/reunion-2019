const server = require("./app/src/server");
const { static } = require("express");
const path = require("path");

server.use(static(path.join(__dirname, "ui-web", "build")));

server.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "ui-web", "build", "index.html"));
});

const port = process.env["PORT"] || 2004;

server.listen(port, () => {
  console.log(`🐝 Server is listening on port ${port}`);
});
