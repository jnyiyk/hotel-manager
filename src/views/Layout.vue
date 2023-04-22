<template>
  <div class="container">
    <div :style="{width:isCollapse?'65px':'200px',background:currentThemeColor}" class="left">
      <div class="logo">
        <div>{{ !isCollapse ? 'DachkjELCAP' : 'ELCAP' }}</div>
      </div>
      <el-menu
          :background-color=currentThemeColor
          :collapse="isCollapse"
          active-text-color="#ffd04b"
          class="el-menu-vertical-demo"
          default-active="1-1"
          router
          text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Avatar/>
            </el-icon>
            <span>账户管理</span>
          </template>
          <el-menu-item index="/layout/role">角色管理</el-menu-item>
          <el-menu-item index="/layout/admin">账户管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <House/>
            </el-icon>
            <span>客房管理</span>
          </template>
          <el-menu-item index="2-1">类型管理</el-menu-item>
          <el-menu-item index="2-2">客房管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Histogram/>
            </el-icon>
            <span>房客管理</span>
          </template>
          <el-menu-item index="3-1">房客管理</el-menu-item>

        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <Key/>
            </el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="4-1">权限管理</el-menu-item>

        </el-sub-menu>


      </el-menu>
    </div>
    <div class="right">
      <div :style="{background:currentThemeColor}" class="top">
        <div class="icon" @click="isCollapse=!isCollapse">
          <el-icon v-show="!isCollapse">
            <Fold/>
          </el-icon>
          <el-icon v-show="isCollapse">
            <Expand/>
          </el-icon>
        </div>
        <div class="menu">
          <!--              :default-active="1"-->
          <el-menu
              :background-color="currentThemeColor"

              active-text-color="#ffd04b"
              class="el-menu-demo"
              mode="horizontal"
              text-color="#fff"
          >
            <el-menu-item index="1">
              <el-icon>
                <HomeFilled/>
              </el-icon>
              首页
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <Message/>
              </el-icon>
              邮件
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <ChatDotSquare/>
              </el-icon>
              消息
            </el-menu-item>
            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <Football/>
                </el-icon>
                切换皮肤
              </template>
              <el-menu-item v-for="(item,index) in getColorNames" :index="'4-'+(index+1)" @click="changeTheme(index)">
                {{ item }}
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon>
                  <Avatar/>
                </el-icon>
                管理员
              </template>
              <el-menu-item index="5-1">个人中心</el-menu-item>
              <el-menu-item index="5-2">修改密码</el-menu-item>
              <el-menu-item index="5-3" @click="exit">退出系统</el-menu-item>

            </el-sub-menu>

          </el-menu>
        </div>
      </div>
      <div class="bottom">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
//导入组合式API
import {computed, reactive, toRefs, onBeforeMount} from 'vue'
//导入全局状态管理对象
import {useStore} from 'vuex'
//导入路由器对象
import {useRouter} from 'vue-router'
//导入图标
import {
  Avatar,
  House,
  Fold,
  Expand,
  HomeFilled,
  Message,
  ChatDotSquare,
  Football,
  Histogram,
  Key
} from '@element-plus/icons-vue'


export default {
  name: "LayoutPage",
  setup() {
    let $store = useStore()
    let $router = useRouter()
    if (localStorage.getItem('color') && localStorage.getItem('colorName')) {
      let color = {
        color: localStorage.getItem('color'),
        name: localStorage.getItem('colorName')
      }
      $store.dispatch('theme/updateCurrentThemeColor', color)
    }
    let data = reactive({
      isCollapse: false//是否折叠，false为展开
    })
    //从全局状态中获取颜色数组
    let getColorNames = computed(() => {
      return $store.getters['theme/getColorNames']
    })
    //返回当前默认主题色
    let currentThemeColor = computed(() => {
      return $store.state.theme.currentThemeColor.color
    })
    //切换主题
    let changeTheme = (index) => {
      //跟据index 获取相应的 颜色主题
      let color = $store.state.theme.colors[index]
      //将该主题颜色赋值给当前主题色
      $store.dispatch('theme/updateCurrentThemeColor', color)
      //将选中的主题色写入缓存
      localStorage.setItem('color', color.color)
      localStorage.setItem('colorName', color.name)
    }
    //定义菜单数据
    let menuData = reactive({
      activeIndex1: '1'
    })
    let exit = () => {
      sessionStorage.clear()
      localStorage.clear()
      $router.push('/login')
    }
    //加载前，验证是否有缓存，如果没有跳转到登陆页
    onBeforeMount(() => {
      let token = sessionStorage.getItem('token')
      if (!token) {
        $router.push('/login')
      }
    })
    return {
      ...toRefs(data),
      getColorNames,
      currentThemeColor,
      changeTheme, exit
    }
  },
  components: {
    Avatar, House, Fold, Expand, Message, ChatDotSquare, HomeFilled, Football, Histogram, Key
  }

}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;

  .left {
    transition: all 0.5s;

    .logo {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        color: white;
        font-size: 18px;
        border: 1px solid #eee;
        padding: 4px 10px;
        border-radius: 4px;
        flex-shrink: 1;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;

    .top {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon {
        font-size: 20px;
        color: white;
        padding-left: 10px;
      }

      div {
        width: 650px
      }
    }

    .bottom {
      flex: 1;
      padding: 6px
    }
  }
}

</style>