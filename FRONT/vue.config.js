const { defineConfig } = require("@vue/cli-service");
// const { indexOf } = require('core-js/core/array');
// module.exports = defineConfig({

module.exports = {
  transpileDependencies: true,
  devServer: {
    client: {
      logging: "info",
      overlay: true,
      reconnect: true,
      webSocketURL: { hostname: "localhost", port: 8080 },

      // webSocketURL: 'auto'
      // webSocketURL: 'wss://localhost:8080/ws', // WebSocket sécurisé
    },
    liveReload: true,
    hot: true,
    watchFiles: ["src/**/*"],
  },
};
