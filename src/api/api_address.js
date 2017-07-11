export default{
	install(Vue,options)
	{
		Vue.prototype.getApi = function (api) {
			const api_port = {
				// 验证码
				captchaurl: 'http://advcount.13737.com/captcha/login.html',
				// 模板接口api
				// 登录
				loginurl: "http://advcount.13737.com/home/pub/checklogin",
				// 退出登录
				logouturl: "http://advcount.13737.com/home/pub/logout",

				// 概览数据报表信息获取
				hometableinfo: "http://advcount.13737.com/home/port/hometableinfo",
				// 概览首页数据曲线信息获取
				homechart: "http://advcount.13737.com/home/port/homechart",
				// 推广列表信息获取
				advurl_list: "http://advcount.13737.com/home/port/get_advurl_list",
				// 新建推广链接申请
				channel_apply: "http://advcount.13737.com/home/port/channel_apply",
				// 推广的游戏列表
				get_game_list: "http://advcount.13737.com/home/port/get_game_list",
				// 注册明细
				get_player_list: 'http://advcount.13737.com/home/port/get_player_list',
				// 充值明细
				get_recharge_list: 'http://advcount.13737.com/home/port/get_recharge_list',
				// 渠道明细-主页
				get_channel_list: 'http://advcount.13737.com/home/port/get_channel_list',
				// 渠道明细-详情
				get_channel_detail: 'http://advcount.13737.com/home/port/get_channel_detail'
			}
			return api_port[api];
		}
	}
}