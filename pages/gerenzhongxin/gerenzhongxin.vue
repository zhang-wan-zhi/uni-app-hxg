<template>
	<view class="box">
		<!-- 未登录展示 -->
		<view v-show="!isExitShow">
			<view class="user-box"><view class="login" @click="click_shouquan">点击登录</view></view>
		</view>
		<!-- 用户信息 -->
		<view v-show="isExitShow">
			<view class="user-box">
				<view class="user-img"><image :src="userData.avatarUrl"></image></view>
				<view class="user-detail">
					<view class="user-name">{{ userData.nickName }}</view>
					<view class="user-vip">
						<image src="../../static/img/tab/putong.png" v-show="status == 1"></image>
						<image src="../../static/img/tab/zhuanye.png" v-show="status == 2||status == 3"></image>
						<text v-show="userData.province">{{ userData.province }}-{{ userData.city }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 充值会员 -->
		<view class="vip-box" v-if="platform == 'ios'">
			根据相关规定，ios不支持会员充值功能！
		</view>
		<view class="vip-box" v-else>
			<view class="professional" @click="consume(0)">
				<view class="vip-logo-one"><image src="../../static/img/my/special.png"></image></view>
				<view class="vip-title">
					<view class="vip-title-top">专业版</view>
					<view class="vip-title-bottom">所有信息特享</view>
				</view>
			</view>

			<view class="members" @click="consume(1)">
				<view class="vip-logo-two "><image src="../../static/img/my/member.png"></image></view>
				<view class="vip-title">
					<view class="vip-title-top">会员版</view>
					<view class="vip-title-bottom">更多信息优享</view>
				</view>
			</view>
		</view>

		<!-- 分享收藏部分 -->

		<view class="uer-handle">
			<!-- 我的收藏 -->
			<!-- <view class="item" @click="toSave">
				<image src="../../static/img/my/save.png"></image>
				<text class="title">我的收藏</text>
			</view> -->
			<view class="item" @click="attentionSchool">
				<view class="iconfont icon-jiaguanzhu">
				</view>
				<text class="title">关注院校</text>
			</view>
			<view class="item">
				<button open-type="share" class="share-btn" @click="share">
					<image src="../../static/img/my/share.png"></image>
					<text class="title">分享</text>
				</button>
			</view>
			<view class="item" @click="yijianFangkui">
				<image src="../../static/img/my/opinion.png"></image>
				<text class="title">意见反馈</text>
			</view>
			<view class="item" @click="guanyuwomeng">
				<image src="../../static/img/my/about.png"></image>
				<text class="title">关于我们</text>
			</view>
		</view>

		<!-- 退出登录 -->
		<view class="out-login" v-show="isExitShow" @click="exitLogin">退出登录</view>
	</view>
</template>

<script>
import { hasOpenid } from '../../api/api.js';
import {getMemberInfo } from '../../api/member.js';
export default {
	data() {
		return {
			//用户信息
			userData: {},
			//是否显示退出
			isExitShow: false,
			// 会员状态
			status: 0,
			platform: ''
		};
	},
	onLoad() {
		let openid = uni.getStorageSync('openid');

		//对退出登录校验
		if (openid == '') {
			this.isExitShow = false;
		} else {
			this.isExitShow = true;
		}
		// 获取用户信息
		this.userData = uni.getStorageSync('userinfo');
	},
	onShow() {
		if(uni.getSystemInfoSync().platform == 'ios') {
			this.platform = 'ios'
		}
		console.log(uni.getSystemInfoSync().platform)
		let openid = uni.getStorageSync('openid');
		if (openid) {
			this.getMemberInfo()
		}
		//对退出登录校验
		if (openid == '') {
			this.isExitShow = false;
		} else {
			this.isExitShow = true;
		}
	},
	methods: {
		// 储存会员信息
		getMemberInfo() {
			// 储存会员信息
			getMemberInfo().then(res => {
				console.log(res);
				const type = res.data.prep2;
				this.status=type;
				const deadline1 = res.data.toTime.slice(0, 10);
				const deadline2 = res.data.majortoTime.slice(0, 10);
				uni.setStorage({
					key: 'huiyuan',
					data: {
						type,
						deadline1,
						deadline2
					}
				});
			});
		},

		//退出登录
		exitLogin() {
			uni.showModal({
				title: '温馨提示',
				content: '您要退出登录吗？',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.removeStorage({ key: 'userinfo' });
						uni.removeStorage({ key: 'openid' });
						uni.removeStorage({
							key: 'huiyuan'
						});
						//解决退出登录的bug
						uni.reLaunch({
							url: '../gerenzhongxin/gerenzhongxin'
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		//登录授权
		click_shouquan() {
			uni.navigateTo({
				url: '../index/index'
			});
		},
		// 充值会员
		consume(index) {
			if (!hasOpenid()) {
				uni.showToast({
					title: '请登录账号',
					duration: 2000,
					icon: 'none'
				});
				return false;
			}
			uni.navigateTo({
				url: '../huiyuanzhongxin/huiyuanzhongxin?key=' + index
			});
		},
		// 我的收藏
		toSave() {
			if (!hasOpenid()) {
				uni.showToast({
					title: '请登录账号',
					duration: 2000,
					icon: 'none'
				});
				return false;
			}
			uni.navigateTo({
				url: '../wodeshoucang/wodeshoucang'
			});
		},
		// 关注院校
		attentionSchool() {
			if (!hasOpenid()) {
				uni.showToast({
					title: '请登录账号',
					duration: 2000,
					icon: 'none'
				});
				return false;
			}
			uni.navigateTo({
				url: '../../myPackageA/pages/guanzhuyuanxiao/guanzhuyuanxiao'
			});
		},
		// 分享
		share() {
			if (!hasOpenid()) {
				uni.showToast({
					title: '请登录账号',
					duration: 2000,
					icon: 'none'
				});
				return false;
			}
		},
		//关于我们
		guanyuwomeng() {
			uni.navigateTo({
				url: '../guanyuwomeng/guanyuwomeng'
			});
		},
		//意见反馈
		yijianFangkui() {
			if (!hasOpenid()) {
				uni.showToast({
					title: '请登录账号',
					duration: 2000,
					icon: 'none'
				});
				return false;
			}
			uni.navigateTo({
				url: '../yijianFangkui/yijianFangkui'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	padding: 30rpx 50rpx;
	width: 100%;
	height: 100vh;
}
.user-box {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 104rpx;
	margin: 0 0rpx 40rpx;
}
.login {
	width: 200rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	border: 1px solid #ed5c4d;
	border-radius: 32rpx;
	font-size: 28rpx;
	font-weight: 400;
	color: #ed5c4d;
}
.user-img {
	width: 104rpx;
	height: 104rpx;
	margin-right: 32rpx;
	border: 4rpx solid #ed5c4d;
	border-radius: 50%;
	overflow: hidden;
	image {
		width: 100%;
		height: 100%;
	}
}
.user-detail {
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
}
.user-name {
	height: 64rpx;
	font-size: 36rpx;
	font-weight: 700;
	line-height: 64rpx;
	color: #0f1826;
}
.user-vip {
	display: flex;
	align-items: center;
	height: 40rpx;
	font-size: 24rpx;
	font-weight: 400;
	line-height: 40rpx;
	color: #0f1826;
	image {
		width: 90rpx;
		height: 36rpx;
		margin-right: 30rpx;
	}
}

// 充值会员
.vip-box {
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin: 28rpx 0rpx;
}

.vip-box .professional,
.members {
	width: 320rpx;
	height: 140rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
}
.professional {
	background: url(../../static/img/my/huiyuan1.png) no-repeat 0px 0px;
	background-size: 320rpx 140rpx;
}
.members {
	background: url(../../static/img/my/huiyuan2.png) no-repeat 0px 0px;
	background-size: 320rpx 140rpx;
}

.vip-box .vip-logo-one {
	width: 80rpx;
	height: 80rpx;
	margin: 0rpx 36rpx;
}
.vip-box .vip-logo-two {
	width: 80rpx;
	height: 80rpx;
	margin: 0rpx 30rpx;
}

.vip-box .vip-logo-one image,
.vip-box .vip-logo-two image {
	width: 100%;
	height: 100%;
}

.vip-box .vip-title {
	width: 160rpx;
}

.vip-box .vip-title-top {
	font-size: 16px;
	font-weight: 400;
	line-height: 22px;
	color: #ed5c4d;
	height: 25px;
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	color: #f9ddb6;
}

.vip-box .vip-title-bottom {
	margin-top: 8rpx;
	font-size: 12px;
	font-weight: 400;
	line-height: 17px;
	color: #ffffff;
}

// 分享收藏样式

.uer-handle {
	width: 100%;
}

.uer-handle .item,
.share-btn {
	overflow: hidden;
	display: flex;
	align-items: center;
	width: 100%;
	height: 96rpx;
	margin-top: 12rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	border-width: 0rpx;
	font-size: 28rpx;
	image {
		width: 34rpx;
		height: 34rpx;
		margin: 0rpx 20rpx;
	}
}
.iconfont {
	width: 34rpx;
	height: 34rpx;
	margin: 0rpx 20rpx;
	color: #F0796D;
}
.share-btn {
	margin: 0px;
	padding: 0px;
	border-width: 0rpx;
	background-color: #ffffff;
}

.share-btn::after {
	border: none;
}

// 退出登录样式

.out-login {
	width: 260rpx;
	height: 80rpx;
	// margin: 200rpx auto 0rpx;
	position: fixed;
	bottom: 100rpx;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 12rpx;
	text-align: center;
	line-height: 80rpx;
	background-color: #ed5c4d;
	color: #ffffff;
}
</style>
