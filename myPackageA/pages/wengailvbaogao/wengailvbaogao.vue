<template>
	<view class="proba">
		<view class="proba__top">
			<view class="leftsemicircle"></view>
			<view class="rightsemicircle"></view>
			<view class="user-img">
				<image :src="schoolInfo.acPrep4"></image>
			</view>
			<view class="university">
				<text>{{ schoolInfo.acName }}</text>
			</view>
		</view>
		<!-- 中间 -->
		<view class="proba__center">
			<text class="proba__center__major">{{schoolInfo.acMajor}}</text>
			<view class="proba__center__pici">
				<text class="pici1">录取批次:</text>
				<text class="pici2">{{schoolInfo.acAdmitbatch}}</text>
			</view>
			<!-- <view class="proba__center__postil">
				<text>注：分析结果基于历年录取情况分析，结果仅供参考。</text>
			</view> -->
			<zwz-hint></zwz-hint>
			<view class="proba__center__border">

			</view>
			<view class="proba__center__title">
				<text>录取概率</text>
			</view>
			
			<view class="proba__center__numb">
				<text>{{(prob*100).toFixed(2) + '%'}}</text>
			</view>
			<view class="beizhu" v-if="schoolInfo.acPrep2">
				<text>{{'备注：' + schoolInfo.acPrep2}}</text>
			</view>
			<view class="beizhu" v-else>
			</view>
		</view>
		<!-- 下面 -->
		<view class="share-report">
			<view class="leftsemicircle"></view>
			<view class="rightsemicircle"></view>
			<button type="default" @click="backPre">返回</button>
		</view>
	</view>
</template>

<script>
	import zwzHint from '../../components/zwz-hint/zwz-hint.vue';
	export default {
		components: {
			zwzHint
		},
		data() {
			return {
				schoolInfo: {},
				prob: ''
			};
		},
		onLoad() {
			// 获取上一个页面的信息
			uni.$on('gailvbaogao', res => {
				console.log(res)
				this.prob = Number(res.info.prob);
				this.schoolInfo = res.info.academy;
			});
			uni.$emit('gailv');
			console.log('发送请求了');
		},
		onUnload() {
			// 移除监听事件，防止重复监听
			uni.$off('gailvbaogao');
			console.log('移除事件');
		},
		methods: {
			backPre() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.proba {
		width: 100%;
		background-color: #F0F0F0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 40rpx;

		&__top {
			width: 680rpx;
			height: 145rpx;
			display: flex;
			// padding-left: 170rpx;
			justify-content: center;
			background-color: #F6F7FB;
			align-items: center;
			position: relative;

			.leftsemicircle {
				// background-color: #F0F0F0;
				position: absolute;
				left: -10px;
				top: 145rpx;
				margin-top: -10px;
				background-color: #f4f4f4;
				height: 20px;
				width: 20px;
				border-radius: 10px;
			}

			.rightsemicircle {
				position: absolute;
				background-color: #f4f4f4;
				right: -10px;
				top: 145rpx;
				margin-top: -10px;
				height: 20px;
				width: 20px;
				border-radius: 10px;
			}

			.user-img {
				width: 96rpx;
				height: 96rpx;
				margin-right: 32rpx;
				// border: 4rpx solid #ed5c4d;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.university {
				color: #273253;
				height: 50rpx;
				font-size: 35rpx;
				font-weight: bold;
				line-height: 40rpx;
			}
		}

		&__center {
			width: 680rpx;
			padding: 10px;
			background-color: #FFFFFF;
			letter-spacing: 2rpx;

			&__major {
				width: 680rpx;
				font-size: 28rpx;
				font-weight: 600;
				color: #273253;
			}

			&__pici {
				margin-bottom: 20rpx;
				margin-top: 20rpx;

				.pici1 {
					color: #6E7580;
				}

				.pici2 {
					color: #273253;
					margin-left: 10rpx;
				}
			}

			&__postil {
				margin-bottom: 10rpx;
				color: #6E7580;
				font-size: 20rpx;
			}

			&__border {
				width: 648rpx;
				height: 0px;
				border-top: 2px dotted #dadbdd;
				margin: 0 auto;
			}

			&__title {
				width: 300rpx;
				height: 48rpx;
				margin: 0 auto;
				margin-top: 40rpx;
				font-size: 35rpx;
				font-weight: 400;
				line-height: 48rpx;
				color: #6E7580;
				text-align: center;
			}

			&__numb {
				width: 507rpx;
				height: 400rpx;
				line-height: 400rpx;
				margin: 0 auto;
				font-size: 100rpx;
				font-weight: 400;
				color: #FBBE4B;
				text-align: center;
			}
			.beizhu {
				width: 100%;
				height: 200rpx;
				color: red;
			}
		}

		.share-report {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 170rpx;
			width: 680rpx;
			border-top: 2px dotted #dadbdd;
			position: relative;
			background-color: #ffffff;

			.leftsemicircle {
				// background-color: #F0F0F0;
				position: absolute;
				left: -10px;
				top: 0;
				margin-top: -10px;
				background-color: #f4f4f4;
				height: 20px;
				width: 20px;
				border-radius: 10px;
			}

			.rightsemicircle {
				position: absolute;
				background-color: #f4f4f4;
				right: -10px;
				top: 0;
				margin-top: -10px;
				height: 20px;
				width: 20px;
				border-radius: 10px;
			}

			button {
				height: 58rpx;
				width: 245rpx;
				line-height: 58rpx;
				color: #ffffff;
				background-color: #57b5ed;
				border-radius: 46rpx;
			}
		}
	}
</style>
