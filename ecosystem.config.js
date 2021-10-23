module.exports = {
  apps: [
    {
      name: 'mantle-demo',
      script: './scripts/start.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}