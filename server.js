const express = require('express');
const app = express();
const routes = require('./routes');

app.get('/items', (request, response) => {
  return routes.getItems(request, response);
});
app.get('/item?:id', (request, response) => {
  return routes.getItem(request, response);
});
app.post('/item', (request, response) => {
  return routes.postItem(request, response);
});
app.put('/item?:id', (request, response) => {
  return routes.putItem(request, response);
});
app.delete('/item?:id', (request, response) => {
  return routes.deleteItem(request, response);
})

app.listen(9000, () => {
  console.log(`Server running on Port 9000`);
});