<template>
	<view>
		<!-- 视频 -->
		<view class="class-item">
			<view class="class-video"><video :src="yikaoKechengList_one.aeVideourl" objectFit="cover"></video></view>
			<!-- 视频详情 -->
			<view class="detail">
				<view >
					<text class="title">{{ yikaoKechengList_one.aeTitle }}</text>
				</view>
				<view class="watch">
					<image src="../../static/img/firstIcon/watch.png" mode=""></image>
					<text class="watch-number">{{ yikaoKechengList_one.peopleNum }}次观看</text>
				</view>
			</view>
			<!-- 点赞分享 -->
			<view class="handle">
				<view @click="click_dianzan">
					<image src="../../static/icon/kecheng/dianzan1.png" v-show="!isDianzan"></image>
					<image src="../../static/icon/kecheng/dianzan.png" v-show="isDianzan"></image>
					<text>{{ likeCount }}赞</text>
				</view>
				<view @click="open">
					<image src="../../static/icon/kecheng/comment.png"></image>
					<text>评论</text>
				</view>
				<view @click="click_shouchang">
					<image src="../../static/icon/kecheng/shoucang1.png" v-show="!isShouchang"></image>
					<image src="../../static/icon/kecheng/shoucang2.png" v-show="isShouchang"></image>
					<text>收藏</text>
				</view>
				<view>
					<image src="../../static/icon/kecheng/fenxiang.png" mode=""></image>
					<!-- <text>分享</text> -->
					<button open-type="share" class="share-btn">分享</button>
					<text>分享</text>
				</view>
			</view>
		</view>

		<!-- 分割线 -->
		<view class="line"></view>

		<!-- 更多视频 -->
		<view class="more">
			<view class="tip">更多视频</view>
			<!-- 艺考课程列表 -->
			<view>
				<view class="class-contents" v-for="(item, index) in yikaoKechengList" :key="index">
					<view class="class-content" @click="yikaokecheng_click(item.aeId)">
						<view class="class-img"><image :src="item.aeImgurl"></image></view>
						<view class="class-detail">
							<view class="class-title">{{ item.aeTitle }}</view>
							<view class="class-number">
								<image src="../../static/img/firstIcon/watch.png"></image>
								<text>{{ item.peopleNum + '次观看' }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<uni-popup ref="popup" type="bottom" class="popup-comment">
			<view class="pinglun">
				<view class="comment-num">{{ commentLength == 0 ? '快来评论吧~' : commentLength + '条评论' }}</view>
				<scroll-view scroll-y="true" style="height: 660rpx;" @scrolltolower="lower">
					<view class="comment-item-main" v-for="(item, index) in commentLists" :key="item.id" :id="index">
						<view class="comment-item">
							<view class="left"><image :src="item.avatar" class="img"></image></view>
							<view class="content">
								<view class="title-name">{{ item.nickname }}</view>
								<view class="content-text">
									<text>{{ item.content }}</text>
								</view>
								<view class="content-btm">
									<text>{{ item.addTime }}</text>
									<text class="btm-back" @click="replyComment(item.nickname, item.id, 'second', index)">回复</text>
								</view>
							</view>
							<view class="right">
								<view class="img-like" @click="commentLike(item)">
									<image src="../../static/icon/kecheng/aixin.png" v-if="item.isLike == 0 || item.isLike == null"></image>
									<image src="../../static/icon/kecheng/aixin3.png" v-else></image>
									<text class="comment-like-num">{{ item.likeNums == 0 || item.likeNums == null ? '' : item.likeNums }}</text>
								</view>
							</view>
						</view>
						<view v-if="showReplyList.indexOf(item.id) !== -1">
							<view class="comment-item items" v-for="reply in item.children" :key="reply.id">
								<view class="left"><image :src="reply.avatar" class="img"></image></view>
								<view class="content">
									<view class="title-name">
										<view>{{ reply.nickname }}</view>
										<view v-if="reply.rootId">回复</view>
										<view v-if="reply.rootId">{{ reply.rootId }}</view>
									</view>
									<view class="content-text">
										<text>{{ reply.content }}</text>
									</view>
									<view class="content-btm">
										<text>{{ reply.addTime }}</text>
										<text class="btm-back" @click="replyComment(reply.nickname, reply.parentId, 'third', index)">回复</text>
									</view>
								</view>
								<view class="right">
									<view class="img-like" @click="commentLike2(reply)">
										<image src="../../static/icon/kecheng/aixin.png" v-if="reply.isLike == 0 || reply.isLike == null"></image>
										<image src="../../static/icon/kecheng/aixin3.png" v-else></image>
										<text class="comment-like-num">{{ reply.likeNums == 0 || reply.likeNums == null ? '' : reply.likeNums }}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="spread" v-if="item.nums > 0" @click="isShowReply(item.id, index)">
							<text>{{ showReplyList.indexOf(item.id) !== -1 ? '收起' : '展开' + item.nums + '条回复' }}</text>
							<text :class="showReplyList.indexOf(item.id) !== -1 ? 'up' : 'down'"></text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="comment-btm">
				<input type="text" :placeholder="placeholderComment" :focus="iptFocus" v-model="commentText" />
				<button :type="commentText ? 'primary' : 'default'" @click="sendCourseComment(CommentId, superUserId, tier)">发送</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import {
	getyikaoKechengList_one,
	getyikaoKechengList,
	getLikeCountAdd,
	addCourseComment,
	getLikeInfo,
	addCollect,
	getCountComment,
	addCommentLike,
	getCommentChildren,
} from '../../api/api.js';
export default {
	data() {
		return {
			yikaoKechengList_one: [],
			//艺考课程列表数据
			yikaoKechengList: [],
			//是否显示icon图标
			isIcon: true,
			//是否显示课程
			isKecheng: true,
			//是否显示评论
			comment: false,
			//是否处于收藏状态
			isShouchang: false,
			//是否处于点赞状态
			isDianzan: false,
			isDianzanArr: ['../../static/img/dianzan_icon1.png', '../../static/img/dianzan_icon.png'],
			isDianzanArrstr: '../../static/img/dianzan_icon.png',
			likeCount: '',
			isSend: false,
			commentText: '',
			CommentId: null,
			superUserId: null,
			iptFocus: false,
			placeholderComment: '发条评论吧~',
			commentLists: [],
			showReplyComment: '',
			tier: null,
			showReplyList: [],
			commentLength: '',
			currentPage: 1,
			isLower: false,
			CommentIndex: '',
			isLogin: false
		};
	},

	methods: {
		//艺考课程
		yikaokecheng_click(id) {
			// console.log(id);
			uni.redirectTo({
				url: '../yikaokecheng_item/yikaokecheng_item?ids=' + id
			});
		},
		// 展开、收起
		isShowReply(id, index) {
			if (this.showReplyList.indexOf(id) == -1) {
				let data = {
					artexamId: this.yikaoKechengList_one.aeId,
					parentId: id
				};
				getCommentChildren(data).then(res => {
					console.log(res);
					this.commentLists[index].children = res.data.data;
					this.showReplyList.push(id);
				});
			} else {
				let index = this.showReplyList.indexOf(id);
				this.showReplyList.splice(index, 1);
			}
		},
		//点击收藏图标触发
		click_shouchang() {
			if (!this.isLogin) {
				uni.showToast({
					title: '请登录账号',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			this.isShouchang = !this.isShouchang;
			let data = {
				collArtexamid: this.yikaoKechengList_one.aeId,
				collOpenid: uni.getStorageSync('openid')
			};
			addCollect(data).then(res => {
				console.log(res);
			});
		},
		//点击点赞图标触发
		click_dianzan() {
			if (!this.isLogin) {
				uni.showToast({
					title: '请登录账号',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			this.isDianzan = !this.isDianzan;
			console.log(this.yikaoKechengList_one.aeId);
			let data = {
				liArtexamid: this.yikaoKechengList_one.aeId,
				liOpenid: uni.getStorageSync('openid')
			};
			getLikeCountAdd(data).then(res => {
				console.log('点赞成功', res);
				this.likeCount = res.data.artLike.likeCount;
			});
		},
		// 一级评论点赞
		commentLike(item) {
			console.log('item', item.id);
			let data = {
				likecount: uni.getStorageSync('openid'),
				commentId: item.id
			};
			addCommentLike(data).then(res => {
				console.log('评论点赞', res);
				if (item.isLike == 1) {
					item.isLike = 0;
					item.likeNums = item.likeNums - 1;
					console.log('item取消赞', item);
				} else {
					item.isLike = 1;
					item.likeNums = item.likeNums + 1;
					console.log('item加赞', item);
				}
			});
		},
		// 二级评论点赞
		commentLike2(item) {
			let data = {
				likecount: uni.getStorageSync('openid'),
				commentId: item.id
			};
			addCommentLike(data).then(res => {
				if (item.isLike == 1) {
					item.isLike = 0;
					item.likeNums = item.likeNums - 1;
					this.$forceUpdate();
				} else {
					item.isLike = 1;
					item.likeNums = item.likeNums + 1;
					this.$forceUpdate();
				}
			});
		},
		// 获取评论列表
		getCommentList() {
			return new Promise((resolve, reject) => {
				let data = {
					artexamId: this.yikaoKechengList_one.aeId,
					openId: uni.getStorageSync('openid'),
					pageSize: 20,
					pageNum: this.currentPage
				};
				getCountComment(data).then(res => {
					resolve(res);
				});
			});
		},
		// 点击评论
		async open() {
			this.currentPage = 1;
			this.isLower = false;
			this.showReplyList = [];
			// 初始化数据结束
			this.$refs.popup.open('bottom');
			console.log('打开页面111');
			let res = await this.getCommentList();
			console.log('返回数据2222', res);
			this.commentLength = res.data.total;
			this.commentLists = res.data.row;
		},
		async lower() {
			if (this.isLower) {
				return;
			} else {
				this.currentPage = this.currentPage + 1;
				let res = await this.getCommentList();
				console.log('无语了', res);
				if (res.data.code == 204) {
					this.isLower = true;
				}
			}
		},
		// 回复评论
		replyComment(userNickName, id, tier, index) {
			console.log('index', index);
			this.iptFocus = true;
			this.placeholderComment = '回复@' + userNickName;
			this.CommentId = id;
			this.superUserId = userNickName;
			this.tier = tier;
			this.CommentIndex = index;
		},
		// 发送评论
		async sendCourseComment(id, superUserId, tier) {
			if (!this.isLogin) {
				uni.showToast({
					title: '请登录账号',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if(!this.commentText) {
				uni.showToast({
					title: '内容为空！',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			let myDate = new Date();
			let { avatarUrl, nickName } = uni.getStorageSync('userInfo');
			if (tier == 'second') {
				let data = {
					avatar: avatarUrl,
					nickname: nickName,
					artexamId: this.yikaoKechengList_one.aeId,
					content: this.commentText,
					nickId: uni.getStorageSync('openid'),
					parentId: id
				};
				let res = await this.sendCommentRequest(data);
				console.log('获取res', res);
				this.commentLists[this.CommentIndex].nums = this.commentLists[this.CommentIndex].nums + 1;
				this.showReplyList.push(id);
				if (!this.commentLists[this.CommentIndex].children) {
					this.commentLists[this.CommentIndex].children = new Array();
				}
				this.commentLists[this.CommentIndex].children.push(res.data.data);
				this.clearCommentData();
				/* this.commentLists[this.CommentIndex].children.push(res.data);
				this.commentLength = this.commentLength + 1;
				this.clearCommentData(); */
			} else if (tier == 'third') {
				var data = {
					avatar: avatarUrl,
					nickname: nickName,
					artexamId: this.yikaoKechengList_one.aeId,
					content: this.commentText,
					nickId: uni.getStorageSync('openid'),
					rootId: superUserId,
					parentId: id
				};
				let res = await this.sendCommentRequest(data);
				console.log('获取res', res);
				this.commentLists[this.CommentIndex].nums = this.commentLists[this.CommentIndex].nums + 1;
				this.showReplyList.push(id);
				if (!this.commentLists[this.CommentIndex].children) {
					this.commentLists[this.CommentIndex].children = new Array();
				}
				this.commentLists[this.CommentIndex].children.push(res.data.data);
				this.clearCommentData();
			} else {
				var data = {
					avatar: avatarUrl,
					nickname: nickName,
					artexamId: this.yikaoKechengList_one.aeId,
					content: this.commentText,
					nickId: uni.getStorageSync('openid')
				};
				let res = await this.sendCommentRequest(data);
				console.log('刚刚发的评论', res.data.data);
				console.log(this.commentLists);
				if(!this.commentLists) {
					this.commentLists = []
				}
				this.commentLists.unshift(res.data.data);
				console.log('加入', this.commentLists);
				this.clearCommentData();
			}
		},
		// 清除数据
		clearCommentData() {
			this.commentText = '';
			this.CommentId = null;
			this.superUserId = null;
			this.placeholderComment = '发条评论吧~';
			this.CommentIndex = '';
		},
		sendCommentRequest(data) {
			return new Promise((resolve, reject) => {
				addCourseComment(data).then(res => {
					resolve(res);
				});
			});
		}
	},
	async onLoad(id) {
		//获取指定艺考课程的数据
		await getyikaoKechengList_one(id.ids).then(res => {
			console.log('页面数据', res.data.hxgArtexam);
			this.yikaoKechengList_one = res.data.hxgArtexam;
			//对时间进行处理
			this.likeCount = res.data.hxgArtexam.likeCount;
		});
		//获取艺考课程列表
		getyikaoKechengList().then(res => {
			// console.log(res.data.artexams);
			this.yikaoKechengList = res.data.artexams;
		});
		// 查看该课程该用户是否点赞收藏过(liOpenid,liArtexamid)
		let likeInfoData = {
			liOpenid: uni.getStorageSync('openid'),
			liArtexamid: this.yikaoKechengList_one.aeId
		};
		// 判断是否登入
		if (uni.getStorageSync('openid')) {
			this.isLogin = true;
			console.log('登陆了',this.isLogin)
			getLikeInfo(likeInfoData).then(res => {
				console.log('是否点赞收藏', res);
				res.data.data.isLike == 0 ? (this.isDianzan = false) : (this.isDianzan = true);
				res.data.data.isColl == 0 ? (this.isShouchang = false) : (this.isShouchang = true);
			});
		}
	},
	onUnload() {
		console.log('onback');
	}
};
</script>

<style lang="scss" scoped>
.class-video {
	width: 100%;
	height: 440rpx;
	video {
		width: 100%;
		height: 100%;
	}
}

.detail {
	width: 100%;
	padding: 30rpx 40rpx;
}

.title {
	width: 100%;
	font-size: 18px;
	font-weight: 400;
	color: #0f1826;
}
.watch {
	display: flex;
	width: 100%;
	height: 80rpx;
	align-items: center;
}
.watch image {
	width: 36rpx;
	height: 36rpx;
}
.watch-number {
	padding: 0rpx 10rpx;
	font-size: 12px;
	font-weight: 400;
	line-height: 22px;
	color: #a9afb8;
}
// 用户操作样式

.handle {
	display: flex;
	width: 100%;
	height: 120rpx;
	justify-content: space-between;
	padding: 0rpx 40rpx;
	view {
		display: flex;
		width: 60rpx;
		flex-direction: column;
		align-items: center;
		image {
			width: 52rpx;
			height: 52rpx;
		}
	}
}

// 分割线
.line {
	width: 100%;
	height: 6rpx;
	margin: 30rpx 0rpx;
	background-color: #cccccc;
}
// 更多视频样式
.more {
	padding: 10rpx 40rpx;
	font-size: 16px;
	line-height: 22px;
	color: #6e7580;
}
.tip {
	margin-bottom: 20rpx;
}

// 艺考动态列表样式

.class-content {
	display: flex;
	align-items: center;
	width: 670rpx;
	height: 192rpx;
	margin: 0rpx auto 28rpx;
	border-radius: 16rpx;
	background-color: #ffffff;
}

.class-content .class-img {
	width: 232rpx;
	height: 160rpx;
	margin: 0rpx 16rpx;
	border-radius: 8px;
	overflow: hidden;
}

.class-content .class-img image {
	width: 100%;
	height: 100%;
}

.class-detail {
	width: 368rpx;
	height: 160rpx;
	display: flex;
	flex-direction: column;
}

.class-title {
	width: 100%;
	flex: 1;
	font-size: 28rpx;
	font-weight: 700;
	line-height: 40rpx;
	color: #0f1826;
}
// 艺考课程样式

.class-number {
	height: 36rpx;
	font-size: 12px;
	font-weight: 400;
	line-height: 36rpx;
	color: #a9afb8;
	display: flex;
	align-items: center;
	image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
	}
}
// 评论样式

.pinglun {
	height: 700rpx;
	width: 100%;
	background-color: #fff;
	overflow: scroll;
}
.pinglun .comment-num {
	text-align: center;
	color: #c1c6cc;
	height: 40rpx;
	margin-top: 10rpx;
}
.comment-item-main {
	margin-bottom: 40rpx;
	.spread {
		color: #bbbbbb;
		margin-left: 80rpx;
		height: 17px;
		position: relative;
		.down {
			width: 0;
			height: 0;
			position: absolute;
			margin-left: 5px;
			top: 7px;
			border-right: 8px solid transparent;
			border-left: 8px solid transparent;
			border-bottom: 8px solid transparent;
			border-top: 8px solid #bbbbbb;
		}
		.up {
			width: 0;
			height: 0;
			position: absolute;
			margin-left: 5px;
			bottom: 4px;
			border-right: 8px solid transparent;
			border-left: 8px solid transparent;
			border-bottom: 8px solid #bbbbbb;
			border-top: 8px solid transparent;
		}
	}
}
.items {
	margin-left: 80rpx;
}
.pinglun .comment-item {
	display: flex;

	padding: 0 20rpx;

	.left {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		overflow: hidden;
		.img {
			width: 80rpx;
			height: 80rpx;
		}
	}
	.content {
		flex: 1;
		margin: 0 20rpx;
		.title-name {
			color: #bbbbbb;
			/* display: inline-block; */
			view {
				max-width: 150rpx;
				display: inline-block;
				margin-right: 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.content-text {
			/* width: 480rpx; */
			font-size: 16px;
			margin: 20rpx 0;
		}
		.content-btm {
			color: #bbbbbb;
			margin-bottom: 20rpx;
			.btm-back {
				margin-left: 40rpx;
				font-size: 16px;
			}
		}
	}
	.right {
		height: 70rpx;

		.img-like {
			image {
				display: block;
				width: 50rpx;
				height: 50rpx;
				margin-top: 20rpx;
			}
		}
	}
}
.popup-comment .comment-btm {
	height: 100rpx;
	width: 100%;
	display: flex;
	/* position: absolute; */
	bottom: 0;
	background-color: #fff;
	border-top: 2rpx solid #e0e0e0;
	input {
		height: 80rpx;
		width: 400rpx;
		border-radius: 20rpx;
		background-color: #f3f3f3;
		margin-left: 80rpx;
		margin-top: 10rpx;
		padding: 10rpx;
	}
	button {
		height: 80rpx;
		margin-top: 10rpx;
	}
}
.comment-like-num {
	display: inline-block;
	width: 50rpx;
	text-align: center;
}

.share-btn {
	opacity: 0;
	position: absolute;
}
</style>
