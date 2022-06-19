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
    },
    chainWebpack: (config) => {
        // prod
        config.when(process.env.NODE_ENV === 'production', (config) => {
            config.entry('app').clear().add('./src/main.js')
            // CDN - externals
            config.set('externals', {
                'vue': 'Vue',
                'axios':'axios',
                'vue-router': 'VueRouter',
                'vue-clipboard2':'VueClipboard'
            })
            // 首页用isProd来控制html模版，是否加载cdn资源。
            config.plugin('html').tap((args) => {
                args[0].isProd = true
                return args
            })
        })
            // dev
            config.when(process.env.NODE_ENV === 'development', (config) => {
                config.entry('app').clear().add('./src/main.js')
                // 首页自定义isProd
                config.plugin('html').tap((args) => {
                    args[0].isProd = false
                    return args
                })
            })

    }
}
