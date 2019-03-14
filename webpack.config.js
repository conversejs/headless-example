/*global path, __dirname, module, process */
'use strict'
const minimist = require('minimist');
const path = require('path');
const webpack = require('webpack');

const config = {
    entry: path.resolve(__dirname, 'index.js'),
    externals: [{
        "window": "window"
    }],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'headless-example.js'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    module: {
        rules: [
        {
            test: path.resolve(__dirname, "node_modules/backbone.overview/backbone.orderedlistview"),
            use: 'imports-loader?backbone.nativeview'
        },
        {
            test: path.resolve(__dirname, "node_modules/backbone.overview/backbone.overview"),
            use: 'imports-loader?backbone.nativeview'
        },
        {
            test: path.resolve(__dirname, "node_modules/backbone.vdomview/backbone.vdomview"),
            use: 'imports-loader?backbone.nativeview'
        },
        {
            test: path.resolve(__dirname, "node_modules/awesomplete-avoid-xss/awesomplete"),
            use: "exports-loader?Awesomplete"
        },
        {
            test: path.resolve(__dirname, "node_modules/xss/dist/xss"),
            use: "exports-loader?filterXSS,filterCSS"
        },
        {
            test: /\.(html|svg)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'lodash-template-webpack-loader',
                options: {
                    "escape": /\{\{\{([\s\S]+?)\}\}\}/g,
                    "evaluate": /\{\[([\s\S]+?)\]\}/g,
                    "interpolate": /\{\{([\s\S]+?)\}\}/g,
                    // By default, template places the values from your data in the
                    // local scope via the with statement. However, you can specify
                    // a single variable name with the variable setting. This can
                    // significantly improve the speed at which a template is able
                    // to render.
                    "variable": 'o',
                    "prependFilenameComment": __dirname
                }
            }]
        }],
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            'node_modules',
            path.resolve(__dirname, "src")
        ],
        alias: {
            "IPv6":                     path.resolve(__dirname, "node_modules/urijs/src/IPv6"),
            "SecondLevelDomains":       path.resolve(__dirname, "node_modules/urijs/src/SecondLevelDomains"),
            "punycode":                 path.resolve(__dirname, "node_modules/urijs/src/punycode"),
            "snabbdom":                 path.resolve(__dirname, "node_modules/snabbdom/dist/snabbdom"),
            "snabbdom-attributes":      path.resolve(__dirname, "node_modules/snabbdom/dist/snabbdom-attributes"),
            "snabbdom-class":           path.resolve(__dirname, "node_modules/snabbdom/dist/snabbdom-class"),
            "snabbdom-dataset":         path.resolve(__dirname, "node_modules/snabbdom/dist/snabbdom-dataset"),
            "snabbdom-eventlisteners":  path.resolve(__dirname, "node_modules/snabbdom/dist/snabbdom-eventlisteners"),
            "snabbdom-props":           path.resolve(__dirname, "node_modules/snabbdom/dist/snabbdom-props"),
            "snabbdom-style":           path.resolve(__dirname, "node_modules/snabbdom/dist/snabbdom-style"),
            "tovnode":                  path.resolve(__dirname, "node_modules/snabbdom/dist/tovnode"),
            "xss":                      path.resolve(__dirname, "node_modules/xss/dist/xss")
        }
    }
}

module.exports = config;
