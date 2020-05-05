const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(createProxyMiddleware("/api", {
    target: "https://filmfanatics-api.herokuapp.com",
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
  }));
};