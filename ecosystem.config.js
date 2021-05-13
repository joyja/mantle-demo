module.exports = {
  apps: [
    {
      name: 'mantle-demo',
      script: 'npm',
      args: 'start',
      env_production: {
        NODE_ENV: 'production',
        NUXT_HOST: '0.0.0.0'
      }
    }
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'mantle-demo.lxd',
      ref: 'origin/master',
      repo: 'git@gitlab.com:joyja/mantle-demo.git',
      path: '/home/ubuntu/mantle-demo',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    },
  }
}