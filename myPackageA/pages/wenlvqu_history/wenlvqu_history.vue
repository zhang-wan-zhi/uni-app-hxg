<template>
	<view class="gzyx">
		<view class="school-item" v-for="item in xuexiao" :key="item.id"
			@click="handleClick(item.academy,item.uapProb)">
			<view class="item-img">
				<image :src="item.academy.acPrep4" v-if="item.academy.acPrep4"></image>
			</view>
			<view class="item-main">
				<view class="item-main-top" @click="hint(item.academy.acName)">{{ item.academy.acName }}</view>
				<view class="item-main-btm">{{ item.academy.acMajor }}</view>
			</view>
			<view class="item-percent">{{ (item.uapProb*100).toFixed(2) + '%' }}</view>
		</view>
	</view>
</template>

<script>
	import {
		getHistoryForUser
	} from '../../../api/api.js'
	export default {
		data() {
			return {
				xuexiao: []
			};
		},
		onLoad() {
			let userOPenid = uni.getStorageSync('openid');
			let data = {
				userOPenid: userOPenid
			}
			getHistoryForUser(data).then(res => {
				this.xuexiao = res.data.data.userandprobs
				console.log('res', res)
			})
		},
		methods: {
			cunfollow() {
				uni.showModal({
					title: '提示',
					content: '取消关注该院校？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			hint(e) {
				console.log('item.acName', e);
				uni.showToast({
					title: e,
					icon: 'none',
					duration: 2000
				});
			},
			handleClick(schoolInfo, prob) {
				let data = {
					academy: schoolInfo,
					prob: prob
				}
				uni.navigateTo({
					url: '../wengailvbaogao/wengailvbaogao'
				});
				uni.$on('gailv', () => {
					uni.$emit('gailvbaogao', {
						info: data
					});
				});
				console.log('发射成功');
				setTimeout(() => {
					uni.$off('gailv')
				}, 1000)

			},
		}
	};
</script>

<style lang="scss" scoped>
	.gzyx {
		padding-top: 40rpx;
	}

	.school-item {
		display: flex;
		width: 640rpx;
		padding: 21rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;

		.item-img {
			width: 77rpx;
			height: 77rpx;
			flex-shrink: 0;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.item-main {
			/* flex: 1; */
			width: 347rpx;
			margin-left: 30rpx;

			.item-main-top {
				width: 100%;
				height: 77rpx;
				line-height: 77rpx;
				font-size: 35rpx;
				color: #273253;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.item-main-btm {
				font-size: 27rpx;
				color: #92969d;
			}
		}

		.item-percent {
			width: 144rpx;
			height: 77rpx;
			font-size: 37rpx;
			font-weight: 400;
			line-height: 98rpx;
			color: #fbbe4b;
			margin-left: 10rpx;
		}
	}
</style>
