module.exports = {
  apps : [{
    name: 'ultimate-starter',
    script: './src/app.js',
    instances: "max",
    exec_mode: "cluster",
    increment_var : 'PORT',
    autorestart: true,
    max_memory_restart: '1G',
    ignore_watch: ["node_modules", "./src/logs"],
    env: {
      watch: true,
      PORT: process.env.PORT || 8081,
      NODE_ENV: process.env.NODE_ENV || 'development'
    },
    env_debug: {
        node_args : ["--inspect-brk"],
        PORT: process.env.PORT || 7000,
        NODE_ENV: process.env.NODE_ENV || 'development'
    },
    env_production: {
      watch: false,
      PORT: process.env.PORT || 80,
      NODE_ENV: process.env.NODE_ENV || 'production'
    }
  }],
};
