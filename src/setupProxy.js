const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(createProxyMiddleware('/getdevice', { target: 'https://mockapi.lumi.systems/' , "changeOrigin" : true }))
    app.use(createProxyMiddleware('/getdevicedata', { target: 'https://mockapi.lumi.systems/' , "changeOrigin" : true }))
    app.use(createProxyMiddleware('/*.json', { "target": 'https://frontend-test-2022-bucket.s3.eu-west-2.amazonaws.com/' , "changeOrigin" : true }))
    app.use(createProxyMiddleware('/*.mp4', { "target": 'https://frontend-test-2022-bucket.s3.eu-west-2.amazonaws.com/' , "changeOrigin" : true }))
}