const db = require('../models/db');

const bodyParser = async (request) => {
  return new Promise((resolve, reject) => {
    let totalChunked = "";
    request
      .on("error", (err) => {
        console.error(err);
        reject();
      })
      .on("data", (chunk) => {
        totalChunked += chunk;
      })
      .on("end", () => {
        request.body = JSON.parse(totalChunked);
        resolve();
      });
  });
};

module.exports = {
  postHandler: async function postHandler(request, response) {
    try {
      await bodyParser(request);

      const itemIds = db.data.map((item) => item.id);
      const orderNums = db.data.map((item) => item.order);
      const newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
      const newOrderNum =
        orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

      let newItem = {
        id: newId,
        title: request.body.title,
        order: newOrderNum,
        completed: false,
        createdOn: new Date(),
      };

      db.data.push(newItem);
      response.writeHead(201, { "Content-Type": "application/json" });
      response.write(JSON.stringify(db.data));
      response.end();
    } catch (err) {
      response.writeHead(400, { "Content-type": "text/plain" });
      response.write("Invalid body data was provided", err.message);
      response.end();
    }
  },
  getPosts: (getPosts = async (request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(db.data));
    response.end();
  }),
  putPosts: (putPosts = async (request, response) => {
    try {
      let url = request.url;

      let idQuery = url.split("?")[1];
      let idKey = idQuery.split("=")[0];
      let idValue = idQuery.split("=")[1];

      if (idKey === "id") {
        await bodyParser(request);

        db.data[idValue - 1] = request.body;
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(db.data));
        response.end();
      } else {
        response.writeHead(400, { "Content-type": "text/plain" });
        response.write("Invalid Query");
        response.end();
      }
    } catch (err) {
      response.writeHead(400, { "Content-type": "text/plain" });
      response.write("Invalid body data was provided", err.message);
      response.end();
    }
  }),
  deletePost: (deletePost = async (request, response) => {
    let url = request.url;

    let idQuery = url.split("?")[1];
    let idKey = idQuery.split("=")[0];
    let idValue = idQuery.split("=")[1];

    if (idKey === "id") {
      db.data.splice(idValue - 1, 1);
      response.writeHead(200, { "Content-type": "text/plain" });
      response.write("Delete Success");
      response.end();
    } else {
      response.writeHead(400, { "Content-type": "text/plain" });
      response.write("Invalid Query");
      response.end();
    }
  }),
};
