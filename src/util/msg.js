//消息框
import {ElMessage} from 'element-plus'

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
