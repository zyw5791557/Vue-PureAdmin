module.exports = {
	proxyList: {
		'/port':{
	        target: 'http://advcount.13737.com/home/port',
	        changeOrigin:true,
	        pathRewrite: {
	        	'^/port': ''
	        }
	    }
	}
}