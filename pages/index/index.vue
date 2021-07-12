<template>
	<view class="content">
		<view class="getUser_content" :style="{ height: phoneHeight * 0.9 + 'px;' }">
			<view class="login_view">
				<image src="../../static/img/qzys_logo.png" class="login_logo"></image>
				<view class="login_name">掐指艺算</view>
				<view class="login_line"></view>
				<view class="login_title">该程序将获取以下授权</view>
				<!-- 解码，对空格进行解析 -->
				<text class="login_describe" decode="true" space="true">获得您的公开信息(昵称、头像等)</text>
				<view class="login_chooise">
					<button style="width:300rpx" class="login_refuse" @click="login_refuse">拒绝</button>
					<!--  v-if="canIUse"  -->
					<button style="width:300rpx" class="login_allow" lang="zh_CN" @click="wechatLogin">允许</button>
					<!--  <view v-else class="login_allow">请升级微信版本</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getTest } from '../../api/http.js';
import { getWxcode, getUser_openid_Info } from '../../api/api.js';
export default {
	data() {
		return {
			userInfo: [],
			//适配手机高度
			phoneHeight: 0
		};
	},
	onLoad() {
		//获取窗口高度，适配手机
		this.getWindowHeight();
	},

	methods: {
		getInfo() {
			uni.request({
				url: `${this.$serverUrl}api/TestGet`, //这里的lid,page,pagesize只能是数字或字母
				// #ifdef H5
				url: '/api/api/TestGet',
				// #endif
				//#ifdef APP-PLUS
				url: 'http://192.168.3.30:8090/api/TestGet',
				//#endif
				method: 'POST',
				contentType: 'application/json;charset=UTF-8'
			}).then(res => {
				console.log(res);
				this.title = res[1].data.data[0].username;
			});
		},
		//获取窗口高度，适配手机
		getWindowHeight() {
			uni.getSystemInfo({
				success: res => {
					this.phoneHeight = res.windowHeight;
				}
			});
		},
		//拒接登录
		login_refuse: function() {
			//返回上一级关闭当前页面
			uni.navigateBack({
				delta: 1
			});
		},

		//登录授权
		wechatLogin() {
			uni.getUserProfile({
				desc: '登录',
				lang: 'zh_CN',
				success: function(infoRes) {
					uni.showLoading({
					    title: '登录中'
					});
					//存储用户信息到缓存中
					let userinfo = infoRes.userInfo;
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes.code);
							getWxcode(loginRes.code).then(res => {
								//获取到用户的openid
								let openid = res.data.data.openid;
								uni.setStorage({
									key: 'openid',
									data: openid
								});
								uni.setStorage({
									key: 'userinfo',
									data: userinfo
								});
								console.log(userinfo);
								let province = userinfo.province;
								let sex = userinfo.gender;
								let userImg = userinfo.avatarUrl;
								let userName = userinfo.nickName;
								//将用户信息存入数据库后，将openid存入缓存中
								getUser_openid_Info(openid, province, sex, userImg, userName).then(res => {
									console.log(res);
									uni.hideLoading();
									uni.reLaunch({
										url: '../gerenzhongxin/gerenzhongxin'
									});
									
								});
							});
						},
						fail() {
							uni.hideLoading();
							uni.showToast({
							    title: '服务器开小差了',
							    duration: 2000
							});
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.getUser {
		width: 70%;
		height: 300rpx;
		border: 1rpx solid #ccc;
		border-radius: 25rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -175rpx;
		margin-left: -35%;
		text-shadow: 2rpx 2rpx 2rpx #ccc;
		.getUser_top {
			width: 100%;
			height: 80rpx;
			// border:1rpx solid red;
			text-align: center;
			.getUser_top_title {
				width: 230rpx;
				height: 80rpx;
				// border:1rpx solid blue;
				float: left;
				line-height: 80rpx;
				color: #101010;
				margin-left: 150rpx;
				font-weight: bold;
				// font-family: SourceHanSansSC-bold;
			}
		}
		.getShouquan_title {
			width: 100%;
			height: 80rpx;
			// border:1rpx solid red;
			line-height: 80rpx;
			text-align: center;
			font-size: 30rpx;
			// .getShouquan_title_title{}
		}
		.shouquan_button {
			width: 100%;
			height: 80rpx;
			// border:1px solid red;
			button::after {
				border: none;
			}
			.buttons {
				width: 40%;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #28b942;
				font-size: 25rpx;
				color: #fff;
				margin-top: 15rpx;
			}
		}
	}
	.getUser_content {
		width: 100%;
		height: 700rpx;
		// border:1px solid red;
		.login_view {
			// width:95%;
			// height:650rpx;
			// border:1px solid blue;
			width: 100%;
			background: #fafafa;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.login_logo {
				margin-top: 100rpx;
				width: 100rpx;
				height: 100rpx;
				border-radius: 16rpx;
			}
			.login_name {
				margin-top: 50rpx;
				font-size: 32rpx;
				color: #636363;
			}
			.login_line {
				width: 100%;
				height: 1rpx;
				margin-top: 80rpx;
				background: #f4f4f4;
			}
			.login_title {
				width: 100%;
				padding-left: 60rpx;
				margin-top: 80rpx;
				font-size: 28rpx;
				color: #636363;
			}
			.login_describe {
				width: 100%;
				padding-left: 120rpx;
				margin-top: 30rpx;
				font-size: 24rpx;
				color: #9c9c9c;
			}
			.login_chooise {
				width: 100%;
				display: flex;
				flex-direction: row;
				padding-left: 50rpx;
				padding-right: 50rpx;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				margin-top: 80rpx;
				.login_refuse {
					border: 1px;
					display: flex;
					border-radius: 50rpx;
					color: #fff;
					font-size: 28rpx;
					width: 30%;
					height: 70rpx;
					justify-content: center;
					margin-right: 50rpx;
					align-items: center;
					background: #b1b1b1;
				}
				.login_allow {
					border: 1px;
					display: flex;
					width: 30%;
					margin-left: 50rpx;
					border-radius: 50rpx;
					font-size: 28rpx;
					height: 70rpx;
					align-items: center;
					justify-content: center;
					color: #fff;
					background: #1296db;
				}
			}
		}
	}
}
</style>
