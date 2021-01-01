const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8360',
      changeOrigin: true,
      pathRewrite: {
        //这个是个正则匹配
        '^/api': '/',
      },
    })
  );
};
