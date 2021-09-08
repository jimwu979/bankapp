module.exports = {
    outputDir: 'app/public',
    devServer: { 
        proxy: { 
            '/api/signUp': { 
                target: 'http://localhost:3000/api/signUp', 
                pathRewrite: {  '^/api/signUp': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/login': { 
                target: 'http://localhost:3000/api/login', 
                pathRewrite: {  '^/api/login': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/alreadyLogin': { 
                target: 'http://localhost:3000/api/alreadyLogin', 
                pathRewrite: {  '^/api/alreadyLogin': '' }, 
                changeOrigin: true, 
                ws: true 
            },
            '/api/logout': { 
                target: 'http://localhost:3000/api/logout', 
                pathRewrite: {  '^/api/logout': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
        } 
    }
}