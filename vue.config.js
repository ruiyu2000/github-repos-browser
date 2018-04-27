module.exports = {
  lintOnSave: false,
    // ...other vue-cli plugin options...
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './public/sw.js',
      // ...other Workbox options...
    },
  },
  // devServer: {
  //   open: process.platform === 'darwin',
  //   host: '0.0.0.0',
  //   port: 8080,
  //   https: true,
  //   hotOnly: false,
  //   proxy: null, // string | Object
  //   before: app => {
  //     // app is an express instance
  //   }
  // }
}