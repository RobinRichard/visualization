var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname, './public/js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = {
   mode: "development", 
   entry: {
      index: [SRC_DIR+'/script.js']
   },
   output: {
     filename: 'bundle.js',
     path: SRC_DIR,
   },
   module: {
    rules: [  
        {
        test: /(\.css|.scss)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
        }
    ]
  }, 
};

module.exports = config;