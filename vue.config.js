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
            '/api/resetName': { 
                target: 'http://localhost:3000/api/resetName', 
                pathRewrite: {  '^/api/resetName': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/resetEmail': { 
                target: 'http://localhost:3000/api/resetEmail', 
                pathRewrite: {  '^/api/resetEmail': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/resetPassword': { 
                target: 'http://localhost:3000/api/resetPassword', 
                pathRewrite: {  '^/api/resetPassword': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/logout': { 
                target: 'http://localhost:3000/api/logout', 
                pathRewrite: {  '^/api/logout': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/api/getAccount': { 
                target: 'http://localhost:3000/api/getAccount', 
                pathRewrite: {  '^/api/getAccount': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            '/album/upload': { 
                target: 'http://localhost:3000/album/upload', 
                pathRewrite: {  '^/album/upload': '' }, 
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
            '/api/readRecord_aClasswithinAMonth': { 
                target: 'http://localhost:3000/api/readRecord_aClasswithinAMonth', 
                pathRewrite: {  '^/api/readRecord_aClasswithinAMonth': '' }, 
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
            
            //------------------------------------------------------------------------<< 後端資源 >>
            '/photo/': { 
                target: 'http://localhost:3000/photo/', 
                pathRewrite: {  '^/photo/': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
            
            //------------------------------------------------------------------------<< 初始化 store >>
            '/initStore': { 
                target: 'http://localhost:3000/api/initStore', 
                pathRewrite: {  '^/api/initStore': '' }, 
                changeOrigin: true, 
                ws: true 
            }, 
        } 
    }
}