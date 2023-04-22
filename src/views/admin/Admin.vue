<template>
  <div>
    <el-button type="primary" @click="addForm">添加</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="用户编码" prop="userCode" width="180"/>
    <el-table-column label="用户名称" prop="userName" width="180"/>
    <el-table-column fixed="right" label="操作" width="180">
      <template #default="scope">
        <el-button size="small" type="warning" @click="editForm(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="delForm(scope.$index,scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--  抽屉-->
  <!--  <el-drawer
        v-model="drawer"
        title="I am the title"
        :direction="direction"
        :before-close="handleClose"
    >
      <span>Hi, there!</span>
    </el-drawer>-->
  <el-drawer v-model="openDrawer" :direction="ltr">
    <template #header>
      <span>{{ isAdd ? '新增账号' : '编辑账号' }}</span>
    </template>
    <template #default>
      <div class="item">
        <span>用户编码：</span>
        <div>
          <el-input v-model=formData.userCode placeholder="Please input" size="small"/>
        </div>
      </div>
      <div class="item">
        <span>用户名称：</span>
        <div>
          <el-input v-model=formData.userName placeholder="请输入" size="small"/>
        </div>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>

</template>

<script>

import {reactive, toRefs} from 'vue'
import {getList, editUser} from "@/api/admin";

export default {
  name: "AdminPage",
  setup() {
    let data = reactive({
      tableData: [],
      openDrawer: true,
      isAdd: false,
      formData: {
        userCode: "",
        userName: ""
      }
    })
    //定义加载列表数据
    let loadTableData = async () => {
      let adminData = await getList()
      if (adminData.success) {
        data.tableData = adminData.list
      } else {
        data.tableData = []
      }
    }
    //调用加载列表数据
    loadTableData()
    //定义添加方法
    let addForm = async () => {
      data.openDrawer = true
      data.isAdd = true
    }
    //定义修改方法
    let editForm = async (row) => {
      console.log(1)
      data.openDrawer = true
      data.isAdd = false
      data.tableData = {
        userCode: row.userCode,
        userName: row.userName
      }
    }
    //定义删除方法
    let delForm = async (index, row) => {
    }
    //定义抽屉的取消方法
    let cancelClick = async () => {
    }
    //定义抽屉的确认方法
    let confirmClick = async () => {

      let returndata = await editUser(data)
    }
    return {
      ...toRefs(data), addForm, editForm, delForm, cancelClick, confirmClick

    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin: 10px 10px 10px 0;

  h2 {
    flex: 1;
    text-align: center;
  }

  span {
    width: 70px;
  }

  div {
    flex: 1;
  }
}
</style>