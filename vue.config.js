const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    devServer: {
        hot: true,
        host: 'localhost',
        port: 8080,
        open: true,
        proxy: {
            '/v': {
                target: "http://localhost:8088",
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        plugins: [
            new BundleAnalyzerPlugin()
        ]
    }
}
