<template >
	<view class="box">
		<!-- 搜索区域 -->
		<view class="search-box" >
			<text class="iconfont icon-sousuo sousuo"></text>
			<input style="padding-left: 80rpx;" :placeholder="placeholders" placeholder-style="font-size: 32rpx; color:#A9AFB8;"
			 v-model="inputValue"
			 @confirm="search"
			 />
			<text class="quxiao" @click="qingkongSearchvalue">取消</text>
		</view>
		
		<!-- 热搜区域 -->
		<view class="hot">
		<view class="title">
			热搜
		</view>
		<view class="items">
			<view class="item" @click="click_item_search('春江花月夜')">
				春江花月夜
			</view>
		</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history" v-show="isShow">
			<view class="title">
				搜索历史
			</view>
			<view class="items">
				<view class="item" v-for="(item,index) in searchHistoryList" :key='index' @click="click_item_search(item)">
					{{item}}
				</view>
			</view>
			<view class="clear"  @click="empty">
				<image src="../../static/img/delete_history.png">
				<text >
					清空搜索历史
				</text>
			</view>
		</view>
		
		<!-- 搜索列表 -->
		<view class="content-box">
			<view class="dynamic-contents" >
				<view v-for="(item, index) in yikaiDongtaiList" :key="index">
					<view class="dynamic-content" @click="yikaoDongtai(item.id)">
						<view class="dynamic-img"><image :src="item.aedMinimg"></image></view>
						<view class="dynamic-detail">
							<view class="dynamic-title">{{ item.aedTitle }}</view>
							<view class="dynamic-pub">
								<text>{{ item.aedPublisheder }}</text>
								<text>{{ item.aedCreatetime }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getmoreList1 } from '../../api/api.js';
export default {
	data() {
		return {
			inputValue: '',
			searchHistoryList: [], //搜索出来的内容，
			yikaiDongtaiList: [],
			//是否显示历史搜索
			isShow: true,
			//适配手机高度
			phoneHeight: 0,
			// 提示信息
			placeholders: '搜索',
			// 页面样式
			
		};
	},
	onLoad() {
		let list= uni.getStorageSync('searchList')
		if(list){
			this.searchHistoryList = JSON.parse(list)
		}
	},
	onShow() {  
		setTimeout(()=>{
	      let list= uni.getStorageSync('searchList')
			if(list){
				this.searchHistoryList =  JSON.parse(list)
			}
		},300)
		
	},
	methods: {
		//获取窗口高度，适配手机
		getWindowHeight() {
			uni.getSystemInfo({
				success: res => {
					this.phoneHeight = res.windowHeight;
				}
			});
		},
		//点击查看某一篇的艺考动态信息
		yikaoDongtai(ids) {
			// console.log(ids);
			uni.navigateTo({
				url: '../yikaoxiangqing/yikaoxiangqing?id=' + ids
			});
		},
		//点击历史记录的某一项搜索
		click_item_search(item) {
			console.log(item);
			this.isShow = false;
			let aedTitle = item;
			let currentPage = 0;
			let pageSize = 10;
			let sousuoTyoe = 1;
			getmoreList1(aedTitle, sousuoTyoe, currentPage, pageSize).then(res => {
				// this.isSearch=false;
				console.log(res);
				if (res.data.msg == '暂无数据,请期待哦!') {
					uni.showModal({
						title: '暂无数据,请期待哦!'
					});
				} else {
					// console.log(res.data.artexamdynamicList);
					this.yikaiDongtaiList = res.data.artexamdynamicList;
				}
			});
		},
		//取消,清空输入框的数据
		qingkongSearchvalue() {
			this.inputValue = '';
			// console.log(1111);
			uni.reLaunch({
				url: '../shouye/shouye'
			});
		},
		search() {
			if (this.inputValue == '') {
				uni.showModal({
					title: '搜索内容不能为空'
				});
				//解决ios鼠标无法弹回的问题
				uni.hideKeyboard(); //添加这一行代码即可
			} else {
				//如果历史记录缓存没有，就包含进去
				if (!this.searchHistoryList.includes(this.inputValue)) {
					this.searchHistoryList.unshift(this.inputValue);
					uni.setStorage({
						key: 'searchList',
						data: JSON.stringify(this.searchHistoryList)
					});
					this.isShow = false;
					let aedTitle = this.inputValue;
					let currentPage = 0;
					let pageSize = 10;
					let sousuoTyoe = 1;
					getmoreList1(aedTitle, sousuoTyoe, currentPage, pageSize).then(res => {
						console.log(res.data.msg);
						// this.isSearch=false;
						if (res.data.msg == '暂无数据,请期待哦!') {
							uni.showModal({
								title: '暂无数据,请期待哦!'
							});
						} else {
							// console.log(res.data.artexamdynamicList);
							this.yikaiDongtaiList = res.data.artexamdynamicList;
							// console.log(this.yikaiDongtaiList);
						}

						//解决ios鼠标无法弹回的问题
						uni.hideKeyboard(); //添加这一行代码即可
					});
				} else {
					//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
					let i = this.searchHistoryList.indexOf(this.inputValue);
					this.searchHistoryList.splice(i, 1);
					this.searchHistoryList.unshift(this.inputValue);
					uni.showToast({
						title: '不能重复添加'
					});
					uni.setStorage({
						key: 'searchList',
						data: JSON.stringify(this.searchHistoryList)
					});
					this.isShow = false;
					let aedTitle = this.inputValue;
					let currentPage = 0;
					let pageSize = 10;
					let sousuoTyoe = 1;
					getmoreList1(aedTitle, sousuoTyoe, currentPage, pageSize).then(res => {
						// this.isSearch=false;
						console.log(res.data.artexamdynamicList);
						this.yikaiDongtaiList = res.data.artexamdynamicList;
						//解决ios鼠标无法弹回的问题
						uni.hideKeyboard(); //添加这一行代码即可
					});
				}
			}
		},
		//清空历史记录
		empty() {
			uni.showToast({
				title: '已清空'
			});
			uni.removeStorage({
				key: 'searchList'
			});

			this.searchHistoryList = [];
		}
	}
};
</script>

<style lang="scss">
.search {
	width: 100%;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0px 15px;
	// margin-top:35rpx;
	margin-top: 160rpx;
	.search1 {
		display: flex;
		align-items: center;
		// border:1px solid red;
		.searchInput {
			background-color: #fff;
			width: 220px;
			height: 80rpx;
			margin-left: 5px;
			margin-top: 35rpx;
			/* border:1px solid red; */
			border-radius: 32rpx;

			background-color: rgba(255, 255, 255, 100);
			color: rgba(16, 16, 16, 100);
			font-size: 14px;
			text-align: center;
			box-shadow: 0px 1px 9px 2px rgba(195, 195, 195, 40);
			font-family: Roboto;
			border: 1px solid rgba(217, 212, 212, 100);
		}
	}
	.searchQuxiao {
		width: 80px;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 32rpx;
		margin-left: 5px;
		margin-top: 35rpx;
		/* border:1px solid red; */
		background-color: #4cb5f6;
		color: #fff;
	}
}

.searchHistory {
	width: 100%;
	margin-top: 5px;
	.searchHistory1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0px 5px;
		// border: 1px solid red;
		.lishiSearch_title {
			font-weight: bold;
			font-size: 40rpx;
			/* border:1px solid red; */
			margin-top: 30rpx;
			margin-left: 50rpx;

			width: 112px;
			height: 41px;
			color: rgba(16, 16, 16, 100);
			font-size: 24px;
			// text-align: left;
			font-family: SourceHanSansSC-bold;
		}
		.lishiSearch_title1 {
			width: 50rpx;
			height: 50rpx;
			// border:1px solid red;
			margin-right: 25rpx;
			font-size: 24px;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.isShows {
		display: flex;
	}
	.isNotShows {
		display: none;
	}
	.searchHistoryItem {
		margin-top: 30rpx;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		// border: 1px solid red;
		.searchHistoryItem1 {
			height: 56rpx;
			line-height: 56rpx;
			text-align: center;
			margin: 0px 5px;
			border-radius: 6px;
			background-color: #fff;
			text-align: center;
			border: 1px solid rgba(255, 255, 255, 100);
			.searchHistoryItem_item {
				// width: 100%;
				height: 29px;
				color: rgba(16, 16, 16, 100);
				font-size: 15px;
				text-align: center;
				color: #000;
				// font-family: SourceHanSansSC-regular;
			}
		}
	}
	.content_contents {
		width: 100%;
		height: auto;
		margin-top: 50rpx;
		// border:1px solid green;
		.content_content {
			width: 100%;
			height: 150rpx;
			// border:1px solid green;
			margin-top: 5rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.content_content1 {
				width: 90%;
				height: 150rpx;
				// border:1px solid pink;
				border-bottom: 1px solid #bbbbbb;
				.content_content1_left {
					width: 70%;
					height: 150rpx;
					// border:1px solid red;
					float: left;
					.content_content1_left_top {
						width: 100%;
						height: 90rpx;
						// border:1px solid green;
						font-weight: bold;
						// white-space: nowrap;
						// word-break:break-all;

						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.content_content1_left_bottom {
						width: 100%;
						height: 50rpx;
						// border:1px solid blue;
						color: #9b9b9b;
						font-size: 20rpx;
						.content_content1_left_bottom1 {
							width: 150rpx;
							height: 50rpx;
							line-height: 50rpx;
							text-align: left;
							float: left;
							// border:1px solid red;
						}
						.content_content1_left_bottom2 {
							width: 140rpx;
							height: 50rpx;
							line-height: 50rpx;
							text-align: right;
							float: right;
							// border:1px solid red;
						}
					}
				}
				.content_content1_right {
					width: 25%;
					height: 150rpx;
					margin-left: 10rpx;
					// border:1px solid green;
					float: left;
					image {
						width: 100%;
						height: 90%;
					}
				}
			}
		}
	}
}

.box {
	width: 100%;
	height: 100%;
	padding: 30rpx 40rpx;
	background-color: #FFFFFF;
}

// 搜索框
.search-box {
	position: relative;
	width: 670rpx;
	height: 60rpx;
	margin: 24rpx auto;

	.sousuo {
		position: absolute;
		left: 28rpx;
		top: 14rpx;
		color: #ed5c4d;
	}

	input {
		width: 520rpx;
		height: 60rpx;
		border: 2rpx solid #ed5c4d;
		border-radius: 40rpx;
		background-color: #ffffff;
	}
	.quxiao {
		position: absolute;
		right: 20rpx;
		top: 0rpx;
		width: 80rpx;
		height: 60rpx;
		font-size: 36rpx;
		font-weight: 400;
		line-height: 60rpx;
		color: #a9afb8;
	}
}

// 热搜
.hot,.history{
	width: 100%;
	margin-top: 40rpx;
}
.title{
	width: 100%;
	height: 44rpx;
	font-size: 16px;
	font-weight: 500;
	line-height: 44rpx;
	color: #FFADA6;
}
.items{
	display: flex;
	flex-wrap: wrap;
}
.item{
	height: 64rpx;
	padding: 0rpx 30rpx;
	margin: 30rpx 20rpx 0rpx 0rpx;
	background: #F7F7F7;
	text-align:center;
	line-height: 64rpx;
	border-radius: 60rpx;
}
// 清空样式
.clear{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;
	margin: 20rpx auto;
	height: 60rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: #8A8A8A;
	image{
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
		
	}
}
// 搜索内容样式

.content-box{
   width: 100%;
   margin-top: 80rpx;
}


// 艺考动态列表样式
		.dynamic-content,
		.class-content {
			display: flex;
			align-items: center;
			width: 670rpx;
			height: 192rpx;
			margin: 0rpx auto 28rpx;
			border-radius: 16rpx;
			background-color: #ffffff;
		}
		.dynamic-content .dynamic-img,
		.class-content .class-img {
			width: 232rpx;
			height: 160rpx;
			margin: 0rpx 16rpx;
			border-radius: 8px;
			overflow: hidden;
		}
		.dynamic-content .dynamic-img image,
		.class-content .class-img image {
			width: 100%;
			height: 100%;
		}
		.dynamic-detail,
		.class-detail {
			width: 368rpx;
			height: 160rpx;
			display: flex;
			flex-direction: column;
		}
		.dynamic-title,
		.class-title {
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
</style>
