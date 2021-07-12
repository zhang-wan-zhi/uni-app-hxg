//测试接口
//使用promise,解决then返回数组为2个，第1个为null的问题
//必须写success函数，否则无法返回数据
export function getTest(){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:'/api/api/TestGet',
			method: 'POST',
			contentType: 'application/json;charset=UTF-8',
			success: res=>{
				resolve(res)
			},
			fail: err=>{
				reject(err)
			},
		})
	})
}


let baseUrl = "https://www.qzys.art/ruoyi-admin";
// 封装接口
export function myRequest(option){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl+option.url,
			method:option.method||'get',
			data:option.data||{},
			success(res) {
				resolve(res.data)
			},
			fail(res) {
				console.log(res)
				uni.showToast({
					title: '请求出错，请稍后再试',
					duration: 2000,
					icon:'none'
				})
			}
		})
		
	})
}