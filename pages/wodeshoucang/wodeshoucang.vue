<template>
	<view class="box">
		<view class="dynamic-contents">
			<view v-for="(item, index) in saveList" :key="index" @click="toPage(item.artexam.aeId)">
				<view class="dynamic-content">
					<view class="dynamic-img"><image :src="item.artexam.aeImgurl"></image></view>
					<view class="dynamic-detail">
						<view class="dynamic-title">{{ item.artexam.aeTitle }}</view>
						<view class="dynamic-pub">
							<text>{{ item.artexam.aeCreatetime }}</text>
							<image src="../../static/icon/kecheng/shoucang2.png" @click.stop="cancelSave(item.artexam.aeId)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			saveList: []
		};
	},
	onLoad() {
		this.getSaveList();
	},
	methods: {
		getSaveList() {
			let openid = uni.getStorageSync('openid');
			//获取收藏的课程
			this.$myRequest({
				url: '/hxg/getColls',
				method: 'POST',
				data: {
					openid
				}
			}).then(res => {
				console.log(res);
				this.saveList = res.data;
			});
		},
		cancelSave(id) {
			uni.showModal({
				title: '确定取消收藏',
				success:(res)=> {
					if (res.confirm){
						let openid = uni.getStorageSync('openid');
						this.$myRequest({
							url: '/hxg/collArtExam',
							method: 'POST',
							data: {
								collOpenid: openid,
								collArtexamid: id
							}
						}).then(res => {
							this.getSaveList();
						});
					}
					
				}
			});
		},
		toPage(id) {
			uni.navigateTo({
				url: '../yikaokecheng_item/yikaokecheng_item?ids=' + id
			});
		}
	}
};
</script>

<style>
.box {
	width: 100%;
}
.dynamic-content {
	display: flex;
	align-items: center;
	width: 600rpx;
	height: 192rpx;
	margin: 30rpx auto 0rpx;
	border-radius: 16rpx;
	background-color: #ffffff;
}
.dynamic-content .dynamic-img {
	width: 232rpx;
	height: 160rpx;
	margin: 0rpx 16rpx;
	border-radius: 8px;
	overflow: hidden;
}
.dynamic-content .dynamic-img image {
	width: 100%;
	height: 100%;
}
.dynamic-detail {
	width: 368rpx;
	height: 160rpx;
	padding-right: 30rpx;
	display: flex;
	flex-direction: column;
}
.dynamic-title {
	width: 100%;
	flex: 1;
	font-size: 28rpx;
	font-weight: 700;
	line-height: 40rpx;
	color: #0f1826;
}
.dynamic-pub {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 34rpx;
	font-size: 12px;
	font-weight: 400;
	line-height: 34rpx;
	color: #a9afb8;
}
.dynamic-pub image {
	width: 34rpx;
	height: 34rpx;
}
</style>
