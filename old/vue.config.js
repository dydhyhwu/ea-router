const path = require('path')

module.exports = {
    pages: {
        index: {
            entry: 'example/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },

    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve('example'),
                '@lib': path.resolve('src')
            }
        }
    }
}
