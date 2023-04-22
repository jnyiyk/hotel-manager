//定义操作的管理员API函数，
//导入请求函数
import {$get, $post, $setToken} from '../util/request.js'
import Md5 from 'js-md5'
import {ElMessage} from 'element-plus'
import {$msg_s, $msg_w, $msg_e} from '../util/msg.js'
//登陆方法
export let login = async (params) => {
    let {checkMe} = params
    params.loginPwd = Md5(Md5(params.loginPwd.split('').reverse().join()))
    //let data = await $get('Admin/Login', params)
    let data = new Object();
    data.success = true;
    data.message = "登录成功";
    data.token = "Dachkj";
    if (data.success) {
        //sessionStorage缓存随浏览器关闭而清空
        //localStorage缓存一直存在，除非手动清空
        sessionStorage.setItem('token', data.token);
        //将token信息设置为请求头
        $setToken();
        //获取角色列表
        // await $get('Role/List', sessionStorage.getItem('token'), '')
        $msg_s(data.message);
        if (checkMe) {
            localStorage.setItem('loginId', params.loginId)
            localStorage.setItem('loginPwd', params.loginPwd)
        }
    } else {
        $msg_e(data.message);
    }
    return data.success;

}
//自动登陆，记住密码时使用，密码不再加密
export let loginAuto = async () => {
    let loginId = localStorage.getItem('loginId')
    let loginPwd = localStorage.getItem('loginPwd')
    if (loginId && loginPwd) {
        // let params = {loginId, loginPwd}
        //let data=await $get('Admin/Login', params)
        let data = new Object();
        data.success = true;
        data.message = "登录成功";
        data.token = "Dachkj";
        if (data.success) {
            //将token信息设置为请求头
            sessionStorage.setItem('token', data.token);
            $setToken();
            return true;
        } else {
            return false;
        }
    } else {
        return false

    }

}

//查询列表
export let getList = async () => {
    let userlist = [
        {
            userCode: 'lidj',
            userName: '李东峻'

        },
        {
            userCode: 'zhangkl',
            userName: '张开蕾'

        },
        {
            userCode: 'liuxz',
            userName: '刘祥志'

        },
        {
            userCode: 'yiyk',
            userName: '衣永康'

        }
    ]
    let data = {
        success: true,
        list: userlist
    }
    return data

}

//增加/编辑账号
export let editUser = async (params) => {

    let {isAdd, formData} = params
    if (!formData.userCode) {
        $msg_w("用户编码不能为空")
    }
    if (!formData.userName) {
        $msg_w("用户名称不能为空")
    }

    if (formData.userCode && formData.userName) {

        if (isAdd) {
            //调用添加接口
        } else {
            //调用更新接口
        }
        //模拟返回数据
        let returndata = {
            success: true,
            msg: isAdd ? "保存成功" : "修改成功"
        }

        if (returndata.success) {
            $msg_s(returndata.msg)
        } else {
            $msg_e(returndata.msg)
        }
        return returndata
    }

}
//删除账号
