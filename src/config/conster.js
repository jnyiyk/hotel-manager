//开发模式
let model = {
    dev: 'http//bingjs.com:83/',//开发阶段
  /*  test: 'http//10.5.5.12:8080/',//测试阶段
    pro: 'http//10.5.5.12:8080/'//生产阶段*/
}
//定义请求根路径
export const BASE_URL = model.dev//根据开发阶段返回相应地址