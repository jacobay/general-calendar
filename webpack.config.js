
const env = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const packageJSON = require('./package.json');
const webpackUMDExternal = require('webpack-umd-external');

let config = {
    entry: ["babel-polyfill", path.join(__dirname, 'src/index.js')],
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
    plugins: [],
    resolve: {
        extensions: ['.js']
    }
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