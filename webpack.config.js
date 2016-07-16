const webpack = require('webpack');
const ascii = require('./ascii');
const license = require('./license');

module.exports = {
    entry: './src/index.js',

    output: {
        path: './dist/',
        filename: 'vorge.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },

    devtool: 'inline-source-map',

    plugins: [
        new webpack.BannerPlugin(ascii),
        new webpack.BannerPlugin(license.header),
        new webpack.BannerPlugin(license.body),
        new webpack.BannerPlugin(license.footer),
        new webpack.BannerPlugin('', { raw: true }),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ].reverse()
}
