const http = require('http');
const posts = require('./routes/posts');

const server = http.createServer((request, response) => {
  let url = request.url;
  let method = request.method;
  
  switch (method) {
    case 'POST':
        posts.postHandler(request, response);
      break;

    case 'GET':
        posts.getPosts(request, response);
      break;

    case 'PUT':
      posts.putPosts(request, response);
      break;

    case 'DELETE':
      posts.deletePost(request, response);
      break;

    default:
      response.writeHead(400, { 'Content-type': 'text/plain' });
      response.write('Invalid URL');
      response.end();
  }
});
server.listen(9000, () => {
  console.log(`Server running on Port 9000`);
});
