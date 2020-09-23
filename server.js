const http = require("http");
const posts = require("./routes/posts");

const server = http.createServer((request, response) => {
  let url = request.url;
  let method = request.method;
  console.log(method, url);
  switch (method) {
    case "POST":
      if (url === "/post") {
        posts.postHandler(request, response);
      }
      break;

    case "GET":
      if (url === "/post") {
        posts.getPosts(request, response);
      }
      break;

    default:
      response.writeHead(400, { "Content-type": "text/plain" });
      response.write("Invalid URL");
      response.end();
  }
});
server.listen(9000, () => {
  console.log(`Server running on Port 9000`);
});
