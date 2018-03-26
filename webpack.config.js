const webpack = require('webpack')
//responsável por extrair todos os arquivos css e aplicar estilos
const ExtractTextPlugin = require('extract-text-webpack-plugin')

//cada loader é responsável por um tipo de arquivo e gera seus arquivos estáticos
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },
    devServer: {
        port: 8080,
        contentBase: './public', 
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            //apelido para pasta node_modules => modules
            modules: __dirname + '/node_modules',
            jquery: 'modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',
            bootstrap: 'modules/admin-lte/bootstrap/js/bootstrap.js'
        }
    },
    plugins: [
        //disponibilizar o jquery, template baseado no bootstrap e jquery
        //$ aponta para jquery que é o alias criado acima
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery', 
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin('app.css')
    ],
    module: {
        loaders: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            //para fazer transpiler para versão antiga do javascript
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            //bootstrap, fontawsome utiliza algumas das extensões abaixo
            test: /\.woff|.woff2|.ttf|.eot|.svg|.png|.jpg*.*$/,
            loader: 'file'
        }]
    }
}