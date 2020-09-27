const controller = require('./controllers/items');

module.exports = {
  postItem: controller.postItem,
  getItems: controller.getItems,
  getItem: controller.getItem,
  putItem: controller.putItem,
  deleteItem: controller.deleteItem,
};
