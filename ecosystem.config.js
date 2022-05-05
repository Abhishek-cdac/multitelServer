module.exports = {
    apps : [
        {
          name: "multitel",
          script: "./server.js",
          watch: true,
          env: {
            "NODE_ENV": "development",
          }
        }
    ]
  }