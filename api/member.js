let urls = "https://www.qzys.art/ruoyi-admin";




//普通用户充值
export function userCharge(oProductid,money) {
	const oOpenid= uni.getStorageSync('openid');
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/pay/memeberPayToGenral',
			method: 'POST',
			data: {
				oOpenid,
				oProductid,
				money
			},
			success: res => {
				resolve(res.data.wixinPay)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 普通会员支付
export function putongCharge(oProductid,money) {
	const oOpenid= uni.getStorageSync('openid');
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/pay/memeberPayToGenralMember',
			method: 'POST',
			data: {
				oOpenid,
				oProductid,
				money
			},
			success: res => {
				resolve(res.data.wixinPay)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

//专业会员支付
export function zhuanyeCharge(oProductid,money) {
	const oOpenid= uni.getStorageSync('openid');
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/pay/memeberPayToMajorMember',
			method: 'POST',
			data: {
				oOpenid,
				oProductid,
				money
			},
			success: res => {
				resolve(res.data.wixinPay)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 双会员续费接口
export function doubleCharge(oProductid,money) {
	const oOpenid= uni.getStorageSync('openid');
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/pay/memeberPayToTwoMember',
			method: 'POST',
			data: {
				oOpenid,
				oProductid,
				money
			},
			success: res => {
				resolve(res.data.wixinPay)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}













// <------------------------------------------------------------------>

// 充值会员
export function charge(oProductid,money) {
	const oOpenid= uni.getStorageSync('openid');
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/pay/orders',
			method: 'POST',
			data: {
				oOpenid,
				oProductid,
				money
			},
			success: res => {
				resolve(res.data.wixinPay)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}


// 续费会员
export function renewal(oProductid,money) {
	const oOpenid= uni.getStorageSync('openid');
	return new Promise((resolve, reject) => {
		uni.request({
			url: urls + '/hxg/pay/ordersForContinue',
			method: 'POST',
			data: {
				oOpenid,
				oProductid,
				money
			},
			success: res => {
				resolve(res.data.wixinPay)
			},
			fail: err => {
				reject(err)
			},
		})
	})
}

// 查询provider信息
export function getProviderInfo() {
	return new Promise((resolve, reject) => {
		uni.getProvider({
			service: 'payment',
			success(res) {
				resolve(res.provider[0]);
			},
			fail(res) {
				reject(res);
			}
		})
	})
}

// 查询会员钱数id信息

export function getCharges() {
	const openid= uni.getStorageSync('openid');
	return new Promise((resolve, reject) => {
			uni.request({
				url:  urls +  '/hxg/pay/getCharge',
				method: 'POST',
				data:{
					openid
				},
				success(res) {
					resolve(res.data);
				},
				fail(res) {
					reject(res);
				}
			});
		})
	
}
//查询用户信息

export function getMemberInfo(){
	const openid= uni.getStorageSync('openid');
	return new Promise((resolve,reject)=>{
		uni.request({
			url: urls + '/hxg/pay/selectUserFormember',
			method:'POST',
			data:{
				openid
			},
			success(res) {
				resolve(res.data)
			},
			fail(res) {
				 console.log(res);
			}
		})
	})
}