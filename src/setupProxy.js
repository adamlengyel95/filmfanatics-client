const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(createProxyMiddleware("/api", {
    target: "http://filmfanatics-api.rabit.hu",
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
  }));
};