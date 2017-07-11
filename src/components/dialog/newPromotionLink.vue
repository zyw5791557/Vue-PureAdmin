<template>
	<section>
		<el-form :model="newPromotionLink" :rules="rules_newPromotionLink" ref="newPromotionLink" label-width="100px" id="newPromotionLink">
            <el-form-item label="链接名称：" prop="link_name">
                <el-input type="text" v-model="newPromotionLink.link_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="推广的游戏：" prop="gameid">
                <template>
                    <el-select v-model="newPromotionLink.gameid" placeholder="请选择">
                        <el-option
                        v-for="item in options_game"
                        :key="item.gameid"
                        :label="item.gamename"
                        :value="item.gameid">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>
            <el-form-item label="描述：" prop="description">
                <el-input type="textarea" v-model="newPromotionLink.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm_new('newPromotionLink')">提交</el-button>
                <el-button @click="resetForm('newPromotionLink')">重置</el-button>
            </el-form-item>
        </el-form>
	</section>
</template>
<script>
    // import axios from 'axios'; 
	export default {
		data() {
			return {
				// 新建渠道数据
                newPromotionLink: {
					link_name: '',
                    gameid: '',
					description: ''
                },
                rules_newPromotionLink: {
                	link_name: [
                		{ required: true, message: '请输入链接名称', trigger: 'blur' }
                	],
                	description: [
                		{ required: true, message: '请输入描述', trigger: 'blur' }
                	]
                },
                // 下拉 options_game
                options_game: [{
                    gameid: 1,
                    gamename: '不良人',
                },{
                    gameid: 2,
                    gamename: '斗破沙城',
                },{
                    gameid: 3,
                    gamename: '九阴绝学',
                }],
                newPromotionLinkApi: this.getApi('channel_apply'),
                gameListApi: this.getApi('get_game_list')
			}
		},
        props: ['log'],
		methods: {
            // 加载推广的游戏下拉
            loadGame_list() {
                this.$http.jsonp(this.gameListApi).then(response => {
                    var res = response.body;
                    this.options_game = res;
                }, error => {
                    this.$message.error('获取推广的游戏列表失败');
                })
            },
            // 新建推广链接提交事件
            submitForm_new(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newPromotionLinkParams = {
                            link_name: this.newPromotionLink.link_name,
                            description: this.newPromotionLink.description,
                            gameid: this.newPromotionLink.gameid
                        }
                        this.$http.jsonp( this.newPromotionLinkApi, {
                            params: newPromotionLinkParams
                        }).then( response => {
                            let res = response.body;
                            if (res.status == -1) {
                                this.$emit('update:log', false);
                                this.$message({
                                    message: '账号未登录,即将返回登录界面！',
                                    type: 'warning'
                                });
                                setTimeout(() => {
                                    this.$router.push('/login');
                                },2000)
                            } else if (res.status == 0) {
                                this.$emit('update:log', false);
                                this.$emit('updataList', {});
                                this.newPromotionLink = {
                                    link_name: '',
                                    gameid: '',
                                    description: ''
                                }
                                this.$message({
                                    message: '提交成功！',
                                    type: 'success'
                                });
                            } else if (res.status == -2) {
                                this.$message.error('提交渠道名已被申请');
                            } else if (res.status == -3) {
                                this.$message.error('提交数据不完整');
                            } else if (res.status == -4) {
                                this.$message.error('还有未审核的渠道');
                            } else if (res.status == -5) {
                                this.$message.error('未知错误');
                            }
                        }, error => {
                            this.$message.error('服务器请求失败');
                        })
                    } else {
                        this.$message.error('新建推广链接失败');
                        return false;
                    }
                });
            },
            // 重置事件(公用)
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
		},
		mounted() {
            // 加载推广游戏列表
            this.loadGame_list();
            $('#newPromotionLink .el-form-item__label').css('width', '110px');
            $('#newPromotionLink .el-form-item__content').css('marginLeft', '110px');
		}
	}
</script>
<style scoped lang="scss">
	
</style>