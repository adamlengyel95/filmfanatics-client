const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(createProxyMiddleware("/*", { target: "https://filmfanatics-api.herokuapp.com/" }));
};