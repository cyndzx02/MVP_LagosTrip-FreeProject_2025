const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    client: {
      webSocketURL: 'wss://localhost:8080/ws', // WebSocket sécurisé
    }
  }
}
