<template>
	<view class="gzyx">
		<view class="schedule-item" v-for="(item,index) in xuexiao" :key="item.id">
			<view class="schedule-top">
				<view class="schedule-img">
					<image :src="item.acPrep4"></image>
				</view>
				<view class="schedule-main-top" @click="hint(item.acName)">
					<view class="schedule-text">{{ item.acName }}</view>
				</view>
				<view class="schedule-main-btm" @click="hint(item.acMajor)">{{ item.acMajor }}</view>
			</view>
			<view class="schedule-btm">
				<view class="schedule-time-title">考试时间</view>
				<view class="schedule-time-title schedule-time">{{ item.acFirsttrytime }}</view>
				<view class="qxgz" @click="cunfollow(item.id,index)">
					<image src="../../static/img/qxgz.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSaveSchool,
		deleteSchool
	} from '../../../api/api.js'
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				xuexiao: []
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...'
			})
			let userOpenid = uni.getStorageSync('openid');
			getSaveSchool(userOpenid).then(res => {
				console.log('关注学校res',res)
				uni.hideLoading()
				if(res.data.code == 200) {
					this.xuexiao = res.data.data;
					if(res.data.msg == null || res.data.data.length == 0  ) {
						uni.showModal({
						    title: '提示',
						    content: '还没有关注院校，去答题关注吧~',
							confirmText: '去关注',
						    success: function (res) {
						        if (res.confirm) {
						            uni.redirectTo({
						            	url: '../xinggepinggu2/xinggepinggu2?page=2'
						            })
						        } else if (res.cancel) {
						            uni.redirectTo({
										url: '../../../pages/gerenzhongxin/gerenzhongxin'
									})
						        }
						    }
						});
					}
				} else {
					uni.showModal({
					    title: '提示',
					    content: '服务器开小差啦~',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateBack()
					        } else if (res.cancel) {
					            uni.navigateBack()
					        }
					    }
					});
				}
				
				
			})
		},
		methods: {
			cunfollow(id,index) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '取消关注该院校？',
					success: function(res) {
						if (res.confirm) {
							
							deleteSchool(id).then(res => {
							console.log(res)
							if(res.data.code == 200) {
								that.xuexiao.splice(index,1);
								store.commit('changeSchoolTime')
							}
								
							})
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
		}
	};
</script>

<style lang="scss" scoped>
	.gzyx {
		padding-top: 40rpx;
	}

	.schedule-item {
		width: 643rpx;
		height: 179rpx;
		padding: 38rpx 10rpx;
		background: #ffffff;
		border-radius: 15rpx;
		margin: 0 auto;
		margin-bottom: 38rpx;

		.schedule-top {
			display: flex;
			width: 100%;
			height: 77rpx;

			.schedule-img {
				width: 77rpx;
				height: 77rpx;
				overflow: hidden;

				image {
					width: 77rpx;
					height: 77rpx;
				}
			}

			.schedule-main-top {
				margin-left: 35rpx;
				flex: 1;

				.schedule-text {
					width: 285rpx;
					height: 48rpx;
					line-height: 48rpx;
					font-size: 35rpx;
					font-weight: 400;
					color: #273253;
					letter-spacing: 2rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.schedule-main-btm {
				width: 173rpx;
				height: 48rpx;
				line-height: 48rpx;
				font-size: 27rpx;
				font-weight: 400;
				color: #92969d;
				letter-spacing: 2rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		.schedule-btm {
			display: flex;
			width: 100%;
			height: 38rpx;
			padding-left: 112rpx;
			padding-right: 10rpx;

			.schedule-time-title {
				width: 123rpx;
				height: 38rpx;
				font-size: 27rpx;
				font-weight: 400;
				line-height: 38rpx;
				color: #92969d;
				letter-spacing: 2rpx;
			}

			.schedule-time {
				flex: 1;
				width: 144rpx;
				margin-left: 8rpx;
			}

			.qxgz {
				width: 38rpx;
				height: 38rpx;
				color: #ed5c4d;

				image {
					width: 38rpx;
					height: 38rpx;
				}
			}
		}
	}
</style>
