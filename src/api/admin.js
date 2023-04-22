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
        let params = {loginId, loginPwd}
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
