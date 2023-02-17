const CracoLessPlugin = require("craco-less");
const path = require("path");
process.env.GENERATE_SOURCEMAP = "false";
const webpack = require("webpack");
// const mkcert = require("mkcert");

module.exports = async function () {
  // const ca = await mkcert.createCA({
  //   organization: "Hello CA",
  //   countryCode: "NP",
  //   state: "Bagmati",
  //   locality: "Kathmandu",
  //   validityDays: 365,
  // });
  // const cert = await mkcert.createCert({
  //   domains: ["127.0.0.1", "localhost", "192.168.31.121"],
  //   validityDays: 365,
  //   caKey: ca.key,
  //   caCert: ca.cert,
  // });
  return {
    devServer: {
      port: 80,
      // https: {
      //   key: cert.key,
      //   cert: cert.cert,
      // },
    },
    webpack: {
      alias: {
        "@img": path.join(__dirname, "src/assets/img"),
        "@utils": path.join(__dirname, "src/utils"),
        "@com": path.join(__dirname, "src/component"),
        "@abi": path.join(__dirname, "src/abi"),
        "@ar": path.join(__dirname, "src/ar"),
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ],
      resolve: {
        fallback: {
          buffer: require.resolve("buffer"),
        },
      },
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };
};
