<template>
  <div class="search">
    <el-button size="small" type="primary" @click="openDrawer=true">添加</el-button>
  </div>
  <!--  表格-->
  <el-table :data="tableData" size="small" style="width: 90%">
    <el-table-column label="序号" prop="roleId" width="180"/>
    <el-table-column label="角色名称" prop="roleName" width="180"/>
    <el-table-column fixed="right" label="操作" width="180">
      <template #default="scope">
        <el-button size="small" type="warning">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--抽屉
  :before-close="handleClose"
  -->
  <el-drawer
      v-model="openDrawer"

      direction="rtl"
      size="30%"
      title="添加角色">
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script>
import {list} from '../../api/role'
import {reactive, toRefs} from 'vue'

export default {
  name: "RolePage",
  setup() {
    //定义数据
    let data = reactive({
      tableData: [],
      openDrawer: false
    })
    //定义加载角色数据的方法
    let loadTable = async () => {
      let roledata = await list()
      data.tableData = roledata
    }
    //调用加载角色数据方法
    const tableData = loadTable()
    let handleClose = () => {
      alert(1);
      done();
    }
    return {
      //返回数据
      ...toRefs(data),
      handleClose
    }
  },

}
</script>

<style scoped>

</style>