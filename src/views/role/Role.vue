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
        <el-button size="small" type="warning" @click="editForm(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="delForm(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--抽屉
  :before-close="handleClose"
  -->
  <el-drawer
      v-model="openDrawer"
      :before-close="handleClose"
      :title="isAdd?'添加角色':'编辑角色'"
      direction="rtl"
      size="30%">
    <div>
      <div class="item">
        <span>角色名称：</span>
        <div>
          <el-input v-model=formData.roleName placeholder="请输入" size="small"></el-input>
        </div>
      </div>
      <div class="item">
        <div>
          <el-button size="small" type="primary" @click="submitForm">提交</el-button>
        </div>
      </div>
    </div>

  </el-drawer>
</template>

<script>
import {add, del, list} from '../../api/role'
import {reactive, toRefs} from 'vue'

export default {
  name: "RolePage",
  setup() {
    //定义数据
    let data = reactive({
      tableData: [],
      isAdd: true,
      openDrawer: false,
      formData: {
        roleName: ''
      }
    })
    //定义加载角色数据的方法
    let loadTable = async () => {
      let roledata = await list()
      data.tableData = roledata
    }

    //调用加载角色数据方法
    const tableData = loadTable()
    //关闭抽屉
    let handleClose = () => {
      data.openDrawer = false
      //清空表单
      data.formData = {
        roleName: ''
      }
    }
    //角色添加、编辑方法
    let submitForm = async () => {
      let returnData = await add(data)
      if (returnData.success) {
        data.openDrawer = false
        //表单提交成功后刷新列表数据
        await loadTable()
      }
    }
    //编辑表单页面赋值
    let editForm = async (row) => {
      // console.log(...row)
      data.isAdd = false
      data.openDrawer = true
      data.formData = {
        roleName: row.roleName
      }
    }
    //删除方法
    let delForm = async (row) => {

      let {rowId} = row
      data.formData = {
        roleName: row.roleName
      }
      let retrunData = await del(data)
      if (retrunData.success){

        await loadTable()
      }
    }
    return {
      //返回数据
      ...toRefs(data),
      handleClose, submitForm,
      editForm, delForm
    }
  },

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