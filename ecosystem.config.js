module.exports = {
  apps : [{
    name: 'node-ultimate-starter',
    script: './src/App.js',
    // instances: "max",
    // exec_mode: "cluster",
    // increment_var : 'PORT',
    autorestart: true,
    max_memory_restart: '1G',
    ignore_watch: ["node_modules", "./logs"],
    env: {
      watch: true,
      PORT: 6001,
      NODE_ENV: 'development'
    },
    env_debug: {
        node_args : ["--inspect-brk"],
        PORT: 6002,
        NODE_ENV: 'development'
    },
    env_production: {
      watch: false,
      PORT: 80,
      NODE_ENV: 'production'
    }
  }],
};
