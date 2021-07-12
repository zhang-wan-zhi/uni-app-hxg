<template>
	<view class="dynamic-detail" >
		<view class="title">{{ yikaoDongtaiList_obj.aedTitle }}</view>
		<view class="pub">
			<text>{{ yikaoDongtaiList_obj.aedPublisheder }}</text>
			<text>{{ yikaoDongtaiList_obj.aedCreatetime }}</text>
		</view>
		<view class="content" v-html="yikaoDongtaiList_obj.aedContent"></view>
		<view class="img"><image :src="yikaoDongtaiList_obj.aedMinimg" ></image></view>
	</view>
</template>

<script>
import { getyikaoDongtaiList_one } from '../../api/api.js';
export default {
	data() {
		return {
			yikaoDongtaiList: [],
			yikaoDongtaiList_obj: {
				aedTitle:''
			}
		};
	},
	onLoad(res) {
		getyikaoDongtaiList_one(res.id).then(res => {
			console.log(res);
			this.yikaoDongtaiList_obj = res.data.artexamdynamic;
		});
	}
};
</script>

<style lang="scss">
.content1 {
	.content1_title {
		width: 100%;
		height: 100rpx;
		// border:1px solid red;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		.content1_title_title {
			width: 90%;
			height: 100rpx;
			// border:1px solid red;
			margin-left: 5%;
		}
	}
	.content1_user {
		width: 100%;
		height: 50rpx;
		// border:1px solid blue;
		color: #8a8a88;
		font-size: 20rpx;
		line-height: 50rpx;
		.content1_user_user {
			width: 150rpx;
			height: 50rpx;
			// margin-left:50rpx;
			// border:1px solid pink;
			float: left;
			text-align: center;
		}
		.content1_user_time {
			width: 400rpx;
			height: 50rpx;
			// border:1px solid pink;
			float: right;
		}
	}
	.content1_content {
		width: 90%;
		height: 500rpx;
		margin-left: 5%;
		// border:1px solid red;
		text-indent: 50rpx;
		margin-top: 30rpx;
	}
}

.dynamic-detail {
	width: 100%;
	padding: 0rpx 40rpx;
}
.title {
	margin: 20rpx 0rpx;
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	color: #0f1826;
}

.pub {
	display: flex;
	justify-content: flex-end;
}
.pub text {
	padding: 0rpx 30rpx;
	font-size: 12px;
	font-weight: 400;
	line-height: 40rpx;
	color: #707070;
}
.content {
	margin: 40rpx 0rpx;
	font-size: 14px;
	text-indent: 50rpx;
	line-height: 50rpx;
}
.img {
	width: 100%;
	height: 100%;
	image {
		width: 100%;
		height: 448rpx;
		border-radius: 16rpx;
	}
}
</style>
