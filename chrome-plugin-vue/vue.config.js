const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// 拼接路径
// eslint-disable-next-line no-unused-vars
const resolve = dir => require('path').join(__dirname, dir)

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "background", "options"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

const plugins =
  process.env.NODE_ENV === "production"
    ? [
        {
          from: path.resolve("src/manifest.production.json"),
          to: `${path.resolve("dist")}/manifest.json`
        }
      ]
    : [
        {
          from: path.resolve("src/manifest.development.json"),
          to: `${path.resolve("dist")}/manifest.json`
        }
      ];

module.exports = {
  pages: pagesObj,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', 'css', 'scss', 'less']
    },
    entry: {
      'content': './src/content/index.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins: [CopyWebpackPlugin(plugins)]
  },
  css: {
    extract: {
      filename: 'css/[name].css'
      // chunkFilename: 'css/[name].css'
    }
  },
  chainWebpack: config => {
    // 查看打包组件大小情况
    if (process.env.npm_config_report) {
      // 在运行命令中添加 --report参数运行， 如：npm run build --report
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }config.module
      .rule('images')
      .use('url-loader')
      .tap(() => {
        return {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: `img/[name].[ext]`
            }
          }
        }
      });
    // node
    config.node
      .set('__dirname', true)
      .set('__filename', true)
  }
};
