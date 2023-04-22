//定义操作的角色API函数

import {$get} from '../util/request.js'

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