
const env = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const packageJSON = require('./package.json');
const webpackUMDExternal = require('webpack-umd-external');
let config = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'general-calendar.js',
        library: 'GeneralCalendar',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(
            `${packageJSON.name}.js
Version: ${packageJSON.version}
Address: (${packageJSON.repository.url})
Author: ${packageJSON.author}
Licensed under the ${packageJSON.license} license`),
    ],
    resolve: {
        extensions: ['.js']
    },
};

if(env === 'production') {
    config.externals = webpackUMDExternal({
        'moment': 'moment'
    });
}else if(env === 'development') {
    config.output.filename = 'general-calendar.all.js';
    config.devtool = 'source-map';
}

module.exports = config;