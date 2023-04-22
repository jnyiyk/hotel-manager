//定义操作的角色API函数

import {$get, $post} from '../util/request.js'
import {$msg_s, $msg_w, $msg_e, $confirm} from '../util/msg.js'

export let list = async () => {
    let url = 'Role/List'//获取角色列表的接口地址
    //let data = await $get(url)
    let tempRoleData = [
        {
            roleId: '1',
            roleName: '系统管理员'
        },
        {
            roleId: '2',
            roleName: '普通管理员'
        },
        {
            roleId: '3',
            roleName: '一般操作员'
        }
    ]
    return tempRoleData
}
//添加角色方法
export let add = async (params) => {
    console.log("添加时获取到的参数：" + params)

    if (!params.formData.roleName) {
        return $msg_e("请输入角色名称")
    } else {
        let data = new Object();
        let {isAdd} = params
        console.log("isAdd:" + isAdd)
        if (isAdd) {
            let url = "Role/Add"
            // let {success,msg} = $post(url, params)
            //模拟接口返回数据
            data.success = true
            data.msg = "添加成功"

        } else {
            //调用编辑接口
            //XXXXXX
            // 模拟接口返回数据
            data.success = true
            data.msg = "修改成功"
        }


        if (data.success) {
            $msg_s(data.msg)
        } else {
            $msg_e(data.msg)
        }
        return data
    }
}
export let del = async (params) => {
    await $confirm("确定要删除么", "提示", "warning")
    if (!params.formData.roleName) {
        $msg_e("删除谁？")
    } else {
        //调用删除接口XXXXXX
        let data = new Object()
        data.success = true
        data.msg = "删除成功"
        if (data.success) {
            $msg_s(data.msg)
        } else {
            $msg_e(data.msg)
        }
        return data
    }

}