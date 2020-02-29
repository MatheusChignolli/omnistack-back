const { Router } = require("express");
// const request = require("request");
const DevControler = require("./controllers/DevController");
const SearchControler = require("./controllers/SearchController");

const routes = Router();

routes.get("/devs", DevControler.index);
routes.post("/devs", DevControler.store);

routes.get("/search", SearchControler.index);

module.exports = routes;