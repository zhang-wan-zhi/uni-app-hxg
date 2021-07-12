<template>
	<view class="ceping">
		<view>
			<view class="ceping__title">
				<text>一对一精准测评</text>
			</view>
			<view class="ceping__title2">
				<text>专属老师为您在线解答</text>
			</view>
		</view>
		<view class="ceping__img">
			<image src="../../static/img/ceping.png" mode="aspectFit"></image>
		</view>
		<!-- <view class="ceping__btn">
			立即测评
		</view> -->
		<button class="ceping__btn" open-type="contact">
			立即测评
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.ceping {
	display: flex;
	width: 100%;
	height: 100vh;
	flex-direction: column;
	justify-content: space-between;
	padding: 80rpx 40rpx 120rpx;
	&__title {
		color: #ED5C4D;
		font-size: 54rpx;
		font-weight: 600;
		letter-spacing: 4rpx;
	}
	&__title2 {
		font-size: 30rpx;
	}
	&__img {
		width: 640rpx;
		margin: 0 auto ;
	}
	&__btn {
		width: 640rpx;
		height: 80rpx;
		text-align: center;
		background-color: #ED5C4D;
		color: #fff;
		line-height: 80rpx;
		border-radius: 20rpx;
		margin: 0 auto;
	}
}
</style>
