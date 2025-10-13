const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/member',
    createProxyMiddleware({
      target: 'http://192.168.21.150',
      changeOrigin: true,
      pathRewrite: {
        '^/api/member': '/members',
      },
    })
  );
  app.use(
    '/api/trip',
    createProxyMiddleware({ 
      target: 'http://192.168.21.150', 
      changeOrigin: true,
      pathRewrite: {
        '^/api/trip': '/trips',
      },
    })
  );
  app.use(
    '/api/payment',
    createProxyMiddleware({ target: 'http://192.168.21.150', changeOrigin: true,
      pathRewrite: {
        '^/api/payment': '/payments',
      },
    })
  );
  app.use(
    '/api/traveler',
    createProxyMiddleware({ target: 'http://192.168.21.150', changeOrigin: true,
      pathRewrite: {
        '^/api/traveler': '/travelers',
      },
    })
  );
  // app.use(
  //   '/api/memory',
  //   createProxyMiddleware({ target: 'http://localhost:8085', changeOrigin: true,
  //     pathRewrite: {
  //       '^/api/memory': '/memories',
  //     },
  //   })
  // );
  // app.use(
  //   '/api/chat',
  //   createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true,
  //     pathRewrite: {
  //       '^/api/chat': '/chat',
  //     },
  //   })
  // );
}; 