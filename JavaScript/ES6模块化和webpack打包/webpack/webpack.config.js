const path = require('path') //导入 node.js 中专门操作路径的模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 导入生成预览页面的插件，得到一个构造函数
const vueLoaderPlugin = require('vue-loader/lib/plugin') // vue
// 创建插件的实例化
const HtmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html', // 指定要用的模板文件
    filename: 'index.html' // 指定生成的文件名称，该文件存在于内存中，在目录中不显示
})

module.exports = {
    // 编译模式
    mode: 'development', // development production
    entry: path.join(__dirname, './src/main.js'), // 打包入口文件
    output: {
        path: path.join(__dirname, './dist'), // 输出文件的存放路径 __dirname 当前所处的根目录
        filename: 'bundle.js' // 输出文件的名称
    },
    plugins: [  // plugins 数组是 webpack 打包期间会用到的一些插件
        HtmlPlugin,
        new vueLoaderPlugin() // vue
    ],
    module: {
        rules: [
            { test: /\.css|less|scss$/, use: ['style-loader', 'css-loader', 'less-loader', 'sass-loader', 'postcss-loader'] },
            { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=16941' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, loader: 'vue-loader'}
        ]
    }
}