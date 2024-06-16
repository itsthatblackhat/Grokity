const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/weather',
        createProxyMiddleware({
            target: 'https://api.weather.gov',
            changeOrigin: true,
            pathRewrite: {
                '^/weather': '', // This removes '/weather' from the request path
            },
            onProxyReq: (proxyReq, req, res) => {
                proxyReq.setHeader('User-Agent', 'myweatherapp.com, contact@myweatherapp.com');
                proxyReq.setHeader('Accept', 'application/geo+json');
            },
            logLevel: 'debug' // Enable detailed logging
        })
    );

    app.use(
        '/radar',
        createProxyMiddleware({
            target: 'https://radar.weather.gov/ridge/standard',
            changeOrigin: true,
            pathRewrite: {
                '^/radar': '',
            },
            onProxyReq: (proxyReq, req, res) => {
                proxyReq.setHeader('User-Agent', 'myweatherapp.com, contact@myweatherapp.com');
            },
            logLevel: 'debug' // Enable detailed logging
        })
    );
};
