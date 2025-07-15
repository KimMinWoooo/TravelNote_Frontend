const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/member',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      pathRewrite: {
        '^/api/member': '/members',
      },
    })
  );
  app.use(
    '/api/trip',
    createProxyMiddleware({ target: 'http://localhost:8082', changeOrigin: true })
  );
  app.use(
    '/api/payment',
    createProxyMiddleware({ target: 'http://localhost:8084', changeOrigin: true })
  );
  app.use(
    '/api/traveler',
    createProxyMiddleware({ target: 'http://localhost:8083', changeOrigin: true })
  );
  app.use(
    '/api/memory',
    createProxyMiddleware({ target: 'http://localhost:8085', changeOrigin: true })
  );
  app.use(
    '/api/chat',
    createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true })
  );
}; 