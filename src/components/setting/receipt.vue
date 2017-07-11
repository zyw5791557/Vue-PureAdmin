<template>
	<section>
		<el-col>
			<h1>收款设置</h1>
		</el-col>
		<el-form :model="receiptSetting" :rules="rules_receiptSetting" ref="receiptSetting" label-width="100px" id="receiptSetting">
            <el-form-item label="收款人：" prop="payee">
                <el-input type="text" v-model="receiptSetting.payee" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="收款银行：" prop="receipt_bank">
                <el-input type="text" v-model="receiptSetting.receipt_bank" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开户行地址：" prop="bank_address">
                <el-input type="text" v-model="receiptSetting.bank_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="收款账号：" prop="receipt_account">
                <el-input type="text" v-model="receiptSetting.receipt_account" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm_new('receiptSetting')">提交</el-button>
                <el-button @click="resetForm('receiptSetting')">重置</el-button>
            </el-form-item>
        </el-form>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				// 收款设置
                receiptSetting: {
                	payee: '',
                	receipt_bank: '',
                	bank_address: '',
                	receipt_account: ''
                },
                rules_receiptSetting: {
                	payee: [
                		{ required: true, message: '请输入收款人', trigger: 'blur' }
                	],
                	receipt_bank: [
                		{ required: true, message: '请输入收款银行', trigger: 'blur' }
                	],
                	bank_address: [
                		{ required: true, message: '请输入开户行地址', trigger: 'blur' }
                	],
                	receipt_account: [
                		{ required: true, message: '请输入收款账号', trigger: 'blur' }
                	]
                }
			}
		},
		methods: {
            // 新建推广链接提交事件
            submitForm_new(formName) {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         let newDitchParams = {
                //             channel_name: this.receiptSetting.link_name,
                //             app_id: this.receiptSetting.place_id,
                //             type: this.receiptSetting.type,
                //             user_type: this.receiptSetting.fodder_id,
                //             soft_name: this.receiptSetting.game_id,
                //             description: this.receiptSetting.description
                //         }
                //         this.$http.jsonp( this.newDitchApi, {
                //             params: newDitchParams
                //         }).then( response => {
                //             console.log(response);
                //             let res = response.body;
                //             if (res.status == -1) {
                //                 this.receiptSettingDialog = false;
                //                 this.$message({
                //                     message: '账号未登录,即将返回登录界面！',
                //                     type: 'warning'
                //                 });
                //                 setTimeout(() => {
                //                     this.$router.push('/login');
                //                 },2000)
                //             } else if (res.status == 0) {
                //                 this.receiptSettingDialog = false;
                //                 this.$message({
                //                     message: '提交成功！',
                //                     type: 'success'
                //                 });
                //             } else if (res.status == -2) {
                //                 this.$message.error('提交渠道名已被申请');
                //             } else if (res.status == -3) {
                //                 this.$message.error('提交数据不完整');
                //             } else if (res.status == -4) {
                //                 this.$message.error('还有未审核的渠道');
                //             } else if (res.status == -5) {
                //                 this.$message.error('未知错误');
                //             }
                //         }, error => {
                //             this.$message.error('服务器请求失败');
                //         })
                //     } else {
                //         this.$message.error('新建渠道失败');
                //         return false;
                //     }
                // });
            },
            // 重置事件(公用)
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
		},
		mounted() {
			$('#receiptSetting .el-form-item__label').css('width', '110px');
			$('#receiptSetting .el-form-item__content').css('marginLeft', '110px');
		}
	}
</script>
<style scoped lang="scss">
	
</style>