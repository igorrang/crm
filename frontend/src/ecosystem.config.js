module.exports = {
    apps : [{
      name: "next-app",
      script: "npm",
      args: "start",
      instances: 1,
      autorestart: true,
      watch:false,
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
     
    }
  ],
  };