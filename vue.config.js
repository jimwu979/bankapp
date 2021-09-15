require('events').EventEmitter.defaultMaxListeners = 0;
module.exports = {
    outputDir: 'app/public',
    devServer: { 
        proxy: { 
            //------------------------------------------------------------------------<< 帳號 >>
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
            
            //------------------------------------------------------------------------<< 類別 >>
            '/api/createClass': { 
                target: 'http://localhost:3000/api/createClass', 
                pathRewrite: {  '^/api/createClass': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/readClass': { 
                target: 'http://localhost:3000/api/readClass', 
                pathRewrite: {  '^/api/readClass': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/updateClass': { 
                target: 'http://localhost:3000/api/updateClass', 
                pathRewrite: {  '^/api/updateClass': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/deleteClass': { 
                target: 'http://localhost:3000/api/deleteClass', 
                pathRewrite: {  '^/api/deleteClass': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 

            //------------------------------------------------------------------------<< 記帳 >>
            '/api/createRecord': { 
                target: 'http://localhost:3000/api/createRecord', 
                pathRewrite: {  '^/api/createRecord': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/readRecord_aMonth': { 
                target: 'http://localhost:3000/api/readRecord_aMonth', 
                pathRewrite: {  '^/api/readRecord_aMonth': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/readRecord_findOne': { 
                target: 'http://localhost:3000/api/readRecord_findOne', 
                pathRewrite: {  '^/api/readRecord_findOne': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/updateRecord': { 
                target: 'http://localhost:3000/api/updateRecord', 
                pathRewrite: {  '^/api/updateRecord': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/deleteRecord': { 
                target: 'http://localhost:3000/api/deleteRecord', 
                pathRewrite: {  '^/api/deleteRecord': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
        } 
    }
}