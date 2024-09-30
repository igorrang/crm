module.exports={
    apps:[
        {
            name: "server",
             script: "/src/server.js",
             instances: "1",
             exec_mode: "cluster",
             env: {
                NODE_ENV: "development",
                PORT:5050
             },
             env_production: {
                BASE_URL:"http://localhost", 
                NODE_ENV: "production",
                PORT: 5050
             } 
        }
    ]
}