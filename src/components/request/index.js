import axios from 'axios'
// 创建axios实例
const service=axios.create({
    baseURL:"https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
    timeout:5000,
    // 使token值保存到头部里面
    headers:{
        "Content-Type":"application/json;charset=utf-8"
    }
})
// 请求拦截（请求发送之前先拦截下拉判断进行操作）
service.interceptors.request.use((config)=>{
    config.headers=config.headers || {}
    //             确保登录
    if(localStorage.getItem('token')){
            config.headers.token=localStorage.getItem('token') || ""
    }
    return config
})

// 响应拦截
service.interceptors.response.use((res)=>{
    const code=res.data.code
    if(code!=200){
        return Promise.reject(res.data)
    }
    return res.data
},(err)=>{
    console.log(err);
    
})

export default service