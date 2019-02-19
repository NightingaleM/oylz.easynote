
module.exports = {
  devServer: {
    port: 8001,
    proxy: {
      '/oy/api': {
        target: 'http://127.0.0.1:2222',  // target host
        // ws: true,  // proxy websockets 
        // changeOrigin: true,  // needed for virtual hosted sites
        // pathRewrite: {
        //     '^/apis': ''  // rewrite path
        // }
      },
    }
  }
};
