const express = require("express");

const {
  httpPostWishes,
  httpGetWishes,
  httpUpdatetWishes,
} = require("./wishes.controller");

const wishesRoute = express.Router();
wishesRoute.route("/").get(httpGetWishes).post(httpPostWishes);

wishesRoute.route("/:id").patch(httpUpdatetWishes);

module.exports = wishesRoute;
