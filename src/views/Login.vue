<template>
    <el-tabs type="border-card" class="login-wrapper">
        <el-tab-pane label="用户登录">
          <el-form :model="ruleFormD" :rules="rulesD" ref="ruleFormD" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="account">
              <el-input type="text" v-model="ruleFormD.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="ruleFormD.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="40">
                <el-col :span="16">
                  <el-form-item prop="verifyCode">
                    <el-input type="text" v-model="ruleFormD.verifyCode" auto-complete="off" placeholder="输入验证码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="verifyCodeImg">
                    <img @click="getVerifyImg" class="verifyCodeImg" :src="ruleFormD.captchaurl" alt="">
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">自动登录</el-checkbox>
            <el-form-item style="width:100%;">
              <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmitD" :loading="logining">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!--注册预留-->
        <!-- <el-tab-pane label="账号注册">
            <el-form :model="ruleFormZ" ref="ruleFormZ" label-width="100px" class="demo-ruleForm register-container" :rules="rulesZ" :label-position="labelPosition">
              <h3 class="title">用户注册</h3>
              <el-form-item
                label="账号"
                prop="user_id"
              >
                <el-input type="text" v-model="ruleFormZ.user_id" auto-complete="off" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="user_psw"
              >
                <el-input type="password" v-model="ruleFormZ.user_psw" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码"
                prop="user_rpsw"
              >
                <el-input type="password" v-model="ruleFormZ.user_rpsw" auto-complete="off" placeholder="请再次输入密码"></el-input>
              </el-form-item>
            <el-form-item>
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item prop="user_verifyCode" label="验证码">
                    <el-input type="text" v-model="ruleFormZ.user_verifyCode" auto-complete="off" placeholder="输入验证码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="verifyCodeImg">
                    <img @click="user_getVerifyImg" class="verifyCodeImg" :src="ruleFormZ.captchaurl" alt="">
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleFormZ')">提交</el-button>
                <el-button @click="resetForm('ruleFormZ')">重置</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane> -->
    </el-tabs>
</template>

<script>
  import { setLocalStorage, getLocalStorage } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
        // 注册表单验证器
      // var validateID = (rule, value, callback) => {
      //       if (!value) {
      //         return callback(new Error('账号不能为空'));
      //       }
      //       setTimeout(() => {
      //         if (!/^[_0-9a-zA-Z]{6,20}$/.test(value)) {
      //             callback(new Error('账号只能为6-20位下划线、数字、字母组合'));
      //           } else {
      //             callback();
      //           }
      //       }, 1000);
      // };
      // var validatePsw = (rule, value, callback) => {
      //       if (value === '') {
      //         callback(new Error('请输入密码'));
      //       }
      //       setTimeout(() => {
      //         if (!/^\S{6,20}$/.test(value)) {
      //             callback(new Error('密码只能6-20位字符'));
      //           } else {
      //             callback();
      //           }
      //       }, 1000);
      // };
      // var validateRpsw = (rule, value, callback) => {
      //       if (value === '') {
      //         callback(new Error('请再次输入密码'));
      //       } else if (value !== this.ruleFormZ.user_psw) {
      //         callback(new Error('两次输入密码不一致!'));
      //       } else {
      //         callback();
      //       }
      // };
      return {
        logining: false,
        labelPosition: 'right',
        ruleFormD: {
          account: '',
          checkPass: '',
          verifyCode: '',
          captchaurl: this.getApi('captchaurl')
        },
        rulesD: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            //{ validator: validaePass3 }
          ]
        },
        checked: true,
        // 注册字段
        // ruleFormZ: {
        //     user_id: '',
        //     user_psw: '',
        //     user_rpsw: '',
        //     user_verifyCode: '',
        //     captchaurl: captchaurl
        // },
        // rulesZ: {
        //   user_id: [
        //     { required: true, validator: validateID, trigger: 'blur' },
        //   ],
        //   user_psw: [
        //     { required: true, validator: validatePsw, trigger: 'blur' },
        //   ],
        //   user_rpsw: [
        //     { required: true, validator: validateRpsw, trigger: 'blur' },
        //   ],
        //   user_verifyCode: [
        //     { required: true, message: '请输入验证码', trigger: 'blur' },
        //   ]
        // },
        loginApi: this.getApi('loginurl'),
        // registerApi: registerurl
      };
    },
    methods: {
        getVerifyImg() {
            $('.login-container .verifyCodeImg').attr('src', this.getApi('captchaurl') + '?' + new Date().getTime());
        },
      // 注册验证码事件
      // user_getVerifyImg() {
      //   $('.register-container .verifyCodeImg').attr('src', captchaurl);
      // },
      handleSubmitD(ev) {
        // var _this = this;
        this.$refs.ruleFormD.validate((valid) => {
          if (valid) {
            let checked = this.checked == true ? 1 : 0;
            let loginParams = {
              account: this.ruleFormD.account, 
              password: this.ruleFormD.checkPass,
              verifycode: this.ruleFormD.verifyCode,
              autologin: checked
            };
            this.$http.jsonp(this.loginApi, {
                params: loginParams
            }).then(response => {
                let res = response.body;
                if (res.status == 0) {
                    this.logining = true;
                    let user = {
                        account: this.ruleFormD.account,
                        password: '***'
                    };
                    if (loginParams.autologin) {
                        // 自动登录有效期
                        const exp = 1000*60*60*24*7;
                        setLocalStorage('user',user, exp);
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(user));
                    }
                    this.$router.push({ path: '/userHome' });
                } else if (res.status == -1) {
                    this.$message({
                      message: '验证码错误',
                      type: 'error'
                    });
                } else if (res.status == -2) {
                    this.$message({
                      message: '账号或密码错误',
                      type: 'error'
                    });
                } else if (res.status == -3) {
                    this.$message({
                      message: '账号不存在',
                      type: 'error'
                    });
                } else if (res.status == -4) {
                    this.$message({
                      message: '账号被禁用',
                      type: 'error'
                    });
                }
            }, error => {
                this.$message.error('服务器请求失败');
            })
            
          } else {
            this.$message.error('error submit!!');
            return false;
          }
        });

      },
      // 注册
        // submitForm(formName) {
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             let registerParams = {
        //                 account: this.ruleFormZ.user_id,
        //                 password: this.ruleFormZ.user_psw,
        //                 email: '',
        //                 verifycode: this.ruleFormZ.user_verifyCode
        //             };
        //             console.log(registerParams);
        //             this.$http.jsonp(this.registerApi, {
        //                 params: registerParams
        //             }).then(response => {
        //                 console.log(response);
        //             }, error => {
        //                 console.log(error);
        //             })
        //         } else {
        //             this.$message('error submit!!');
        //             return false;
        //         }
        //     });
        // },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
        // 重设注册验证码模块位置
        // verifyPositon() {
        //     $('label[for="user_verifyCode"]').css({
        //         position: 'absolute',
        //         left: '-95px',
        //         top: '0'
        //     });
        // }
    },
    mounted() {
        // this.verifyPositon();
    },
    updated() {
        // this.verifyPositon();
    }

  }

</script>

<style lang="scss" scoped>
    .verifyCodeImg {
        display: block;
        width: 100%;
        height: 34px;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
    }
    .register-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        width: 400px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
    }
    .login-wrapper {
        margin: 180px auto;
        width: 500px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .el-tabs__content {
            max-height: 500px;
        }
    }
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        width: 400px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
        .line {
            text-align: center;
        }
    }
</style>