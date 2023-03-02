const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target:
        'http://ec2-13-209-84-68.ap-northeast-2.compute.amazonaws.com:8080/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
