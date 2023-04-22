//消息框
import {ElMessage, ElMessageBox} from 'element-plus'

export let $msg_s = (val, duration = 2000) => {
    ElMessage({
        showClose: true,
        message: val,
        duration,
        type: 'success',
    })
}
export let $msg_w = (val, duration = 2000) => {
    ElMessage({
        showClose: true,
        message: val,
        duration,
        type: 'warning',
    })
}
export let $msg_e = (val, duration = 2000) => {
    ElMessage({
        showClose: true,
        message: val,
        duration,
        type: 'error',
    })
}

export let $confirm = async (msg, title, type) => {
    return new Promise((resolve, reject) => {
        ElMessageBox.confirm(
            msg,
            title,
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type,
            }
        )
            .then(() => {
                resolve();
            })
            .catch(() => {
            })
    })
}
export let $comfirm1 = async (msg, title, type, callback) => {

    let data = true;
    ElMessageBox.confirm(
        msg,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,
        }
    )
        .then(() => {

        })
        .catch(() => {
        })
    console.log("确认框实际返回：" + data)
    return data
}
