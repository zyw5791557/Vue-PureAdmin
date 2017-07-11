<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="2" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<!--有APP项目菜单-->
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单/付费业务-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单/账号管理-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen_UM" @close="handleclose_UM" @select="handleselect_UM"
					 unique-opened router v-show="!collapsed" v-if="isUserManage">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-menu-item v-if="!item.apply" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<!--折叠模块-->
						<template v-if="!item.hidden">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light g_clear">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>

	import routes from '../routes';
	import { setLocalStorage, getLocalStorage } from '../api/api';
	import png from '../assets/user.png'

	export default {	
		data() {
			return {
				sysName:'统计系统',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: png,
				// activeIndex: '1',
				isUserManage: 0,
				logoutApi: this.getApi('logouturl'),
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			handleopen_UM() {
				//console.log('handleopen_UM');
			},
			handleclose_UM() {
				//console.log('handleclose_UM');
			},
			handleselect_UM: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					_this.$http.jsonp(_this.logoutApi).then(response => {
						let res = response.body;
						if (res.status == 0) {
							if (sessionStorage.getItem('user')) sessionStorage.removeItem('user');
							if (localStorage.getItem('user')) localStorage.removeItem('user');
							_this.$router.push('/login');
						} else if (res.status == -1) {
							_this.$message('未知错误！');
						}
					}, error => {
						console.log(error);
					});
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			handle_applyApp() {
				
			}
		},
		mounted() {
			var user = localStorage.getItem('user') ? getLocalStorage('user') : JSON.parse(sessionStorage.getItem('user'));
			if (user) {
				this.sysUserName = user.account || '';
				this.sysUserAvatar = user.avatar ? user.avatar : this.sysUserAvatar;
			}if (this.$route.path == '/userHome') {
	        	this.isUserManage = 0;
	        	this.activeIndex = '1';
			}
			if(this.$route.path == '/') {
				this.$router.push('/userHome');
			}

		},
		updated() {

		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}
	.g_clear:after {
		clear: both;
		content: ".";
		display: block;
		line-height: 0;
		font-size: 0;
		visibility: hidden;
		overflow: hidden;
	}
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $header-theme;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px;
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
				float: left;
			}
			.topNav {
				float: left;
				background-color: $color-primary;
				a {
					display: block;
					width: 100%;
					height: 100%;
				}
				.el-menu-item, .el-submenu__title {
				    color: #fff;
				    background: $header-theme;
				}
				.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
					background-color: $header-theme;
				}
				.el-menu-item.is-active, .el-menu-item {
					border: none;
					a {
						text-decoration: none;
					}
				}
				.el-menu-item.is-active:hover {
					color: #333;
					background-color: #fff;
				}
				.el-menu-item:hover {
					color: #333;
				}
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				.el-menu{
					height: 100%;
					z-index: 2;
					background-color: #eee;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					.breadcrumb-inner {
					    padding: 8px 15px;
					    margin-bottom: 20px;
					    list-style: none;
					    background-color: #f5f5f5;
					    border-radius: 4px;
					    span {
					    	height: 22px;
					    	line-height: 22px;
					    }
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>