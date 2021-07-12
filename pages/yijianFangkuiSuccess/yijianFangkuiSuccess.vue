<template>
	<view class="success" :style="[{height:phoneHeight+'px'}]">
		<view class="center">
			<image src="../../static/img/submitsuccess.png" mode=""></image>
			<view class="title-one">提交成功</view>
			<view class="title-two">感谢您的建议和反馈</view>
		</view>
		<view class="return" @click="fanhui">返回</view>
	</view>
</template>

<script>
export default {
	data(){
		return{
			phoneHeight:600
		}
	},
	methods: {
		fanhui() {
			uni.switchTab({
				url: '/pages/gerenzhongxin/gerenzhongxin'
			});
		}
	},
	onLoad(){
		try {
		    const res = uni.getSystemInfoSync();
		    console.log(res.model);
		    console.log(res.pixelRatio);
		    console.log(res.windowWidth);
		    console.log(res.windowHeight);
		    console.log(res.language);
		    console.log(res.version);
		    console.log(res.platform);
			this.phoneHeight=res.windowHeight	
		} catch (e) {
		     console.log(e);
		}
	},
	
}


</script>

<style lang="scss" scoped>
.success {
	position: relative;
	width: 100%;
	height: 600px;
	text-align: center;
	letter-spacing: 8rpx;
}
.center {
	position: absolute;
	transform: translate(-50%, -50%);
	left: 50%;
	top: 50%;
}
.center image{
	width: 200rpx;
	height: 200rpx;
	margin-bottom: 30rpx;
}
.title-one {
	margin-bottom: 20rpx;
	font-size: 18px;
	font-weight: 400;
	line-height: 20px;
	color: #273253;
}
.title-two {
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	color: #273253;
}
.return {
	position: absolute;
	transform: translateX(-50%);
	left: 50%;
	bottom: 200rpx;
	width: 640rpx;
	height: 90rpx;
	background: #ed5c4d;
	border-radius: 90rpx;
	font-size: 18px;
	font-weight: 400;
	line-height: 22px;
	color: #ffffff;
	line-height: 90rpx;
}
</style>
