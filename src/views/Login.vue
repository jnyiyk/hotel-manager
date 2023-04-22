<template>
  <div class="container">
    <div class="login">
      <div class="item">
        <h2>DachkjELCAP后台管理系统</h2>
      </div>
      <div class="item">
        <span>账号：</span>
        <div>
          <el-input v-model="loginId" placeholder="请输入账号" size="small"></el-input>
        </div>
      </div>
      <div class="item">
        <span>密码：</span>
        <div>
          <el-input v-model="loginPwd" placeholder="请输入密码" size="small" type="password"></el-input>
        </div>
      </div>
      <div class="itemcheckbox">
        <div>
          <el-checkbox v-model="checkMe" label="记住密码" size="small"></el-checkbox>
        </div>
      </div>
      <div class="itembutton">
        <el-button size="small" type="primary" @click="adminLogin">登录</el-button>

        <el-button size="small">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import {reactive, toRefs, onBeforeMount} from 'vue'
//后台访问API
import {login, loginAuto} from '../api/admin.js'
//导入路由
import {useRouter} from 'vue-router'

export default {
  name: "LoginPage",
  setup() {

    //获取路由对象
    let $router = useRouter()
    //定义登陆数据
    let loginData = reactive({
      loginId: "",
      loginPwd: "",
      checkMe: false//未选中
    })
    //定义点击事件的登陆方法
    let adminLogin = async () => {
      /*let {loginId, loginPwd} = loginData*/
      //调用登陆方法分
      let success = await login(loginData)
      if (success) {
        //成功后跳转页面
        $router.push('/layout');
      }
    }
    //页面加载之前
    onBeforeMount(async () => {
      if (await loginAuto()) {
        $router.push('/layout')
      }
    })
    return {
      ...toRefs(loginData),
      adminLogin
    }
  }

}
</script>

<style lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #7a7374,#207f4c);
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    width: 400px;
    border: 1px solid #eee;
    border-radius: 6px;

    .item {
      font-size: 14px;
      display: flex;
      align-items: center;
      margin: 10px 0;

      h2 {
        flex: 1;
        text-align: center;
      }

      span {
        width: 60px;
      }

      div {
        flex: 1;
      }

    }

    .itembutton {
      text-align: center;
    }

    .itemcheckbox {
      text-align: right;
    }
  }
}

</style>