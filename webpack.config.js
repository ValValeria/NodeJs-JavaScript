const mypath = require("path");
const node_externals = require('webpack-node-externals')

module.exports = {
        entry:{
            client:mypath.resolve('react/index.jsx'),
        },
        output:{
            path:mypath.resolve("build"),
            filename:"[name].js"
        },
        module: {
            rules: [
             {
                test:/\.jsx$/,
                enforce: 'pre',
                use:[
                  {loader:"babel-loader",    
                  options: {
                      "presets": ["@babel/preset-env","@babel/preset-react"],
                      "plugins": [
                        ["@babel/transform-runtime"]
                       ]
                  }},
                  {loader:"source-map-loader"}
                ],
            },

            {
                test:/\.scss/,
                use:['style-loader',"css-loader","sass-loader"]
            },
            {
              test: /\.css$/,
              use: [
               'style-loader',
               'css-loader',
              ],
             },
             {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                'file-loader',
               ],
             },
            ],
        },
        resolve: {
            extensions: ['.js','.jsx']
        },
        target:"node"
    };