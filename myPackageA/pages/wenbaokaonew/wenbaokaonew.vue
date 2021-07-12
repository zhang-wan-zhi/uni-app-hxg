<template>
	<view>
		<view class="again" @click="resetAnswer"><text>重新答题</text></view>
		<view class="reportplus">
			<view class="content_top">
				<view class="leftsemicircle"></view>
				<view class="rightsemicircle"></view>
				<view class="university">
					<text>{{ isShow ? '报考推荐' : '日程安排' }}</text>
				</view>
			</view>

			<view class="content-plus">
				<!-- 报考推荐 -->
				<view class="school-recommend" v-if="isShow">
					<!-- 冲刺学校 -->
					<view :class="['school-list', { 'school-list-check': showChong }]"
						@click="this.showChong = !this.showChong">冲刺学校</view>
					<view v-if="showChong">
						<view v-if="xuexiao.chong.length > 0">
							<view class="school-item" v-for="item in xuexiao.chong" :key="item.id">
								<view class="item-img">
									<image :src="item.acPrep4" v-if="item.acPrep4"></image>
								</view>
								<view class="item-main">
									<view class="item-main-top" @click="hint(item.acName)">{{ item.acName }}</view>
									<view class="item-main-btm">{{ item.acMajor }}</view>
								</view>
								<view class="item-percent">{{ item.gailv + '%' }}</view>
							</view>
							<!-- 模糊效果 -->
							<view class="school-item item-filter" v-if="permissions !== '2'" @click="upgrade">
								<view class="item-img">
									<image src="../../static/img/hubeimeishu.jpg"></image>
								</view>
								<view class="item-main">
									<view class="item-main-top">中国美术学院</view>
									<view class="item-main-btm">垃圾zzs</view>
								</view>
								<view class="item-percent">85%</view>
							</view>
							<view class="more-school" v-if="permissions !== '2'" @click="upgrade">{{platform == 'ios' ? '根据相关规定ios不支持会员功能购买！' : '升级专业版查看更多学校...'}}</view>
							<!-- 模糊效果 -->
						</view>
						<view class="school-item2" v-else>没有可以匹配的学校哦~</view>
					</view>
					<!-- 稳定学校 -->
					<view :class="['school-list', { 'school-list-check': showWeng }]"
						@click="this.showWeng = !this.showWeng">重点学校</view>
					<view v-if="showWeng">
						<view v-if="xuexiao.zhong.length > 0">
							<view class="school-item" v-for="item in xuexiao.zhong" :key="item.id">
								<view class="item-img">
									<image :src="item.acPrep4" v-if="item.acPrep4"></image>
								</view>
								<view class="item-main">
									<view class="item-main-top">{{ item.acName }}</view>
									<view class="item-main-btm">{{ item.acMajor }}</view>
								</view>
								<view class="item-percent">{{ item.gailv + '%' }}</view>
							</view>
							<!-- 模糊效果 -->
							<view class="school-item item-filter" v-if="permissions !== '2'" @click="upgrade">
								<view class="item-img">
									<image src="../../static/img/hubeimeishu.jpg"></image>
								</view>
								<view class="item-main">
									<view class="item-main-top">中国美术学院</view>
									<view class="item-main-btm">垃圾zzs</view>
								</view>
								<view class="item-percent">85%</view>
							</view>
							<view class="more-school" v-if="permissions !== '2'" @click="upgrade">{{platform == 'ios' ? '根据相关规定ios不支持会员功能购买！' : '升级专业版查看更多学校...'}}</view>
							<!-- 模糊效果 -->
						</view>
						<view class="school-item2" v-else>没有可以匹配的学校哦~</view>
					</view>
					<!-- 保底学校 -->
					<view :class="['school-list', { 'school-list-check': showBao }]"
						@click="this.showBao = !this.showBao">保底学校</view>
					<view v-if="showBao">
						<view v-if="xuexiao.bao.length > 0">
							<view class="school-item" v-for="item in xuexiao.bao" :key="item.id">
								<view class="item-img">
									<image :src="item.acPrep4" v-if="item.acPrep4"></image>
								</view>
								<view class="item-main">
									<view class="item-main-top">{{ item.acName }}</view>
									<view class="item-main-btm">{{ item.acMajor }}</view>
								</view>
								<view class="item-percent">{{ item.gailv + '%' }}</view>
							</view>
							<!-- 模糊效果 -->
							<view class="school-item item-filter" v-if="permissions !== '2'" @click="upgrade">
								<view class="item-img">
									<image src="../../static/img/hubeimeishu.jpg"></image>
								</view>
								<view class="item-main">
									<view class="item-main-top">中国美术学院</view>
									<view class="item-main-btm">垃圾zzs</view>
								</view>
								<view class="item-percent">85%</view>
							</view>
							<view class="more-school" v-if="permissions !== '2'" @click="upgrade">{{platform == 'ios' ? '根据相关规定ios不支持会员功能购买！' : '升级专业版查看更多学校...'}}</view>
							<!-- 模糊效果 -->
						</view>
						<view class="school-item2" v-else>没有可以匹配的学校哦~</view>
					</view>
				</view>
				<!-- 日程安排 -->
				<view class="schedule school-recommend" v-else>
					<view>
						<view v-if="schoolTimeList.length > 0">
							<view class="schedule-item" v-for="item in schoolTimeList" :key="item.id">
								<view class="schedule-top">
									<view class="schedule-img">
										<image :src="item.acPrep4" v-if="item.acPrep4"></image>
									</view>
									<view class="schedule-main-top" @click="hint(item.acName)">
										<view class="schedule-text">{{ item.acName }}</view>
									</view>
									<view class="schedule-main-btm" @click="hint(item.acMajor)">{{ item.acMajor }}
									</view>
								</view>
								<view class="schedule-btm">
									<view class="schedule-time-title">考试时间</view>
									<view class="schedule-time-title schedule-time">{{ item.acFirsttrytime }}</view>
									<view class="schedule-btm-check"
										@click="handleChecked(item.id, item.acFirsttrytime,item.gailv)">
										<!-- <checkbox value="cb" color="#57B5ED" style="transform:scale(0.6)"
											@click="handleChecked(item.id, item.acFirsttrytime,item.gailv)"
											:checked="idArr.indexOf(item.id) != -1" /> -->
										<view class="iconfont icon-xuanzhongkuang" v-if="idArr.indexOf(item.id) != -1">

										</view>
										<view class="iconfont icon-xuanzhongkuang color-gray" v-else>

										</view>

									</view>
								</view>
							</view>
							<!-- 点击查看跟多 -->
							<view class="schedule-item item-filter" v-if="permissions !== '2'" @click="upgrade">
								<view class="schedule-top">
									<view class="schedule-img">
										<image src="../../static/img/hubeimeishu.jpg"></image>
									</view>
									<view class="schedule-main-top">
										<view class="schedule-text">中央美术学院</view>
									</view>
									<view class="schedule-main-btm">造型艺术专业</view>
								</view>
								<view class="schedule-btm">
									<view class="schedule-time-title">考试时间</view>
									<view class="schedule-time-title schedule-time">2021-5-8</view>
									<view class="schedule-btm-check">
										<checkbox value="cb" color="#57B5ED" style="transform:scale(0.6)" />
										<view class="iconfont icon-xuanzhongkuang">

										</view>

									</view>
								</view>
							</view>
							<view class="more-school" v-if="permissions !== '2'" @click="upgrade">{{platform == 'ios' ? '根据相关规定ios不支持会员功能购买！' : '升级专业版查看更多学校...'}}</view>
						</view>
						<view class="school-item2" v-else>没有可以匹配的学校哦~</view>
					</view>
				</view>
				<!-- 查看日程 -->
				<view class="share-report" @click="handleSchoolTime">
					<view class="leftsemicircle"></view>
					<view class="rightsemicircle"></view>
					<button type="default">{{ isShow ? '考试日程' : '返回' }}</button>
				</view>
			</view>
		</view>
		<button type="default" class="attention-school" v-show="!isShow" @click="attention">确定关注</button>
	</view>
</template>

<script>
	import {
		getReportByAskStudyCurve,
		saveSchool
	} from '../../../api/api.js';
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				// 判断身份
				permissions: '',
				// 学校列表是否展开
				showChong: false,
				showWeng: false,
				showBao: false,
				showChong1: false,
				showWeng1: false,
				showBao1: false,
				isShow: true,
				// 学校列表
				xuexiao: {},
				// 选中的时间列表
				checkedTimeList: {},
				// 日程安排记录
				idArr: [],
				schoolTimeList: [],
				// 保存选中学校信息
				savePostData: [],
				platform: ''

			};
		},
		onLoad() {
			
			if(uni.getSystemInfoSync().platform == 'iso') {
				this.platform = 'ios'
			}
			// 查看用户身份0普通，1会员，2专业会员
			this.permissions = uni.getStorageSync('huiyuan').type + ''
			/* this.permissions = '1'; */
			console.log('this.schoolTimeList', this.schoolTimeList);
			// 获取上一个页面的信息
			uni.$on('baogao', res => {
				console.log('接受', res);
				if (this.permissions === '0') {
					console.log('000000000')
					if (res.xuexiao.chong.length > 1)
						res.xuexiao.chong = res.xuexiao.chong.slice(0, 1);
					if (res.xuexiao.zhong.length > 1)
						res.xuexiao.zhong = res.xuexiao.zhong.slice(0, 1);
					if (res.xuexiao.bao.length > 1)
						res.xuexiao.bao = res.xuexiao.bao.slice(0, 1);
					this.xuexiao = res.xuexiao;


				} else if (this.permissions === '1') {
					console.log('111111111')
					if (res.xuexiao.chong.length > 3)
						res.xuexiao.chong = res.xuexiao.chong.slice(0, 3);
					if (res.xuexiao.zhong.length > 3)
						res.xuexiao.zhong = res.xuexiao.zhong.slice(0, 3);
					if (res.xuexiao.bao.length > 3)
						res.xuexiao.bao = res.xuexiao.bao.slice(0, 3);
					this.xuexiao = res.xuexiao;

				} else {
					console.log('222222222')
					this.xuexiao = res.xuexiao;

				}

			});
			uni.$emit('need');
			this.schoolTimeList = this.schoolTimeList.concat(this.xuexiao.chong, this.xuexiao.zhong, this.xuexiao.bao);
			console.log('this.schoolTimeList', this.schoolTimeList)
		},
		onUnload() {
			// 移除监听事件
			uni.$off('baogao');
		},
		methods: {
			hint(e) {
				console.log('item.acName', e);
				uni.showToast({
					title: e,
					icon: 'none',
					duration: 1000
				});
			},
			backTo() {
				uni.reLaunch({
					url: '../shouye/shouye'
				});
			},
			resetAnswer() {
				uni.navigateBack();
				console.log('resetAnswer');
			},
			showText(id) {
				if (this.showTextList.indexOf(id) === -1) {
					this.showTextList.push(id);
				} else {
					let index = this.showTextList.indexOf(id);
					this.showTextList.splice(index, 1);
				}
			},
			// 升级
			upgrade() {
				if(this.platform == 'ios') {
					return
				}
				uni.redirectTo({
					url: '../../../pages/huiyuanzhongxin/huiyuanzhongxin?backto=xiaokao'
				});
			},
			// 选中勾选框触发
			handleChecked(id, checktime, gailv) {
				if (this.idArr.indexOf(id) == '-1') {
					this.idArr.push(id);

					console.log('idArr', this.idArr, );
					// 添加
					if (this.checkedTimeList[checktime] == null) {
						this.checkedTimeList[checktime] = 0;
					} else if (this.checkedTimeList[checktime] < 2) {
						this.checkedTimeList[checktime]++;
					} else {
						uni.showToast({
							title: '同一天只能选择3个学校',
							icon: 'none'
						});
						// 取消
						let index = this.idArr.indexOf(id);
						this.idArr.splice(index, 1);
					}
					console.log('选中', this.checkedTimeList);
				} else {
					// 取消
					let index = this.idArr.indexOf(id);
					this.idArr.splice(index, 1);
					// 相同时间判断
					this.checkedTimeList[checktime]--;
					console.log('idArr', this.idArr);
				}
			},
			// 确定关注
			attention() {
				
				let schoolIds = this.idArr.join(',');
				let userOpenId = uni.getStorageSync('openid');
				let data = {
					schoolIds: schoolIds,
					userOpenId: userOpenId
				}
				uni.showModal({
					title: '提示',
					content: '是否关注选中院校？',
					success: function(res) {
						if (res.confirm) {
							saveSchool(data).then(res => {
								console.log('关注学校', res)
								if (res.data.code == 200) {
									store.commit('changeSchoolTime')
									/* uni.reLaunch({
										url: '../../../pages/shouye/shouye'
									}); */
									uni.showToast({
										title: '关注成功',
										duration: 2000,
										icon: 'none'
									});
								}
							})
						} else if (res.cancel) {}
					}
				});

			},
			handleSchoolTime() {
				uni.showLoading({
					title: '加载中...'
				})
				console.log(this.schoolTimeList)
				// 去除null

				let newArr = [];
				this.schoolTimeList.map(function(item) {
					if (item.acFirsttrytime != null) {
						newArr.push(item)
					}

				})
				this.schoolTimeList = newArr;
				console.log('去除null', this.schoolTimeList)
				// 从小到大排序
				this.schoolTimeList.sort(function(a, b) {
					return new Date(a.acFirsttrytime.replace(/-/g, '/')).getTime() > new Date(b.acFirsttrytime
						.replace(/-/g, '/')).getTime() ? 1 : -1
				}); //从小到大排序
				console.log('this.schoolTimeList', this.schoolTimeList)
				uni.hideLoading()
				this.isShow = !this.isShow;
			}
		}
	};
</script>

<style lang="scss" scoped>
	// 重新答题
	.again {
		width: 643rpx;
		height: 60rpx;
		margin: 0 auto;
		padding: 5rpx;

		text {
			width: 111rpx;
			height: 38rpx;
			font-size: 27rpx;
			font-weight: 400;
			line-height: 42rpx;
			letter-spacing: 2rpx;
			color: #92969d;
		}
	}

	// 超级会员版
	.reportplus {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;

		.content-plus {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 40rpx;
			width: 643rpx;
			background-color: #ffffff;

			.plus-title {
				color: #7b818b;
				font-size: 35rpx;
				margin: 30rpx 0;
			}

			.nums {
				width: 507rpx;
				height: 177rpx;
				font-size: 173rpx;
				text-align: center;
				font-weight: 400;
				line-height: 177rpx;
				color: #fbbe4b;
				letter-spacing: 7rpx;
			}

			.charts-box {
				width: 100%;
				border-bottom: 2px dotted #dadbdd;
				padding-bottom: 40rpx;

				.charts-data {
					display: flex;
					align-self: flex-start;
					font-size: 35rpx;
					align-items: center;
					margin: 40rpx 0 0 40rpx;

					.minicircle {
						width: 10px;
						height: 10px;
						background-color: #57b5ed;
						border-radius: 50%;
					}

					.data-title {
						margin-left: 20rpx;
						color: #a9afb8;
					}

					.data-num {
						margin-left: 20rpx;
						color: #57b5ed;
					}
				}
			}

			// 学习建议
			.study-suggest {
				width: 100%;
				padding: 40rpx 0;
				align-self: flex-start;
				border-bottom: 2px dotted #dadbdd;

				.study-suggest-item {
					color: #273253;
					width: 541rpx;
					font-size: 31rpx;
					font-weight: 400;
					margin-right: 31rpx;
					margin-top: 30rpx;
					margin-left: 60rpx;
					letter-spacing: 3rpx;
				}
			}

			// 学校推荐
			.school-recommend {
				width: 566rpx;
				align-self: flex-start;
				padding-bottom: 40rpx;

				.school-list {
					font-size: 35rpx;
					color: #57b5ed;
					margin: 40rpx 0 0 40rpx;
				}

				.school-list-check {
					color: #b0b5bd;
				}

				.school-item2 {
					width: 566rpx;
					height: 140rpx;
					border-bottom: 1px solid #dadbdd;
					text-align: center;
					line-height: 120rpx;
				}

				.item-filter {
					filter: blur(10px);
				}

				.more-school {
					position: relative;
					top: -110rpx;
					text-align: center;
					font-size: 31rpx;
					color: #fcd58c;
				}

				.school-item {
					display: flex;
					width: 566rpx;
					padding: 21rpx 10rpx 31rpx 10rpx;
					border-bottom: 1px solid #dadbdd;

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
						/* flex-grow: 1; */
						width: 350rpx;
						margin-left: 30rpx;

						.item-main-top {
							width: 315rpx;
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
						width: 111rpx;
						height: 77rpx;
						font-size: 42rpx;
						font-weight: 400;
						line-height: 98rpx;
						color: #fbbe4b;
					}
				}
			}
		}
	}

	// 公共标题
	.default-title {
		align-self: flex-start;
		font-size: 35rpx;
		color: #7b818b;
		margin-left: 40rpx;
	}

	// 公共头部
	.content_top {
		width: 643rpx;
		height: 145rpx;
		display: flex;
		// padding-left: 170rpx;
		justify-content: center;
		background-color: #f6f7fb;
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

	// 分享
	.share-report {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 170rpx;
		width: 643rpx;
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
			height: 70rpx;
			width: 260rpx;
			line-height: 70rpx;
			color: #ffffff;
			background-color: #57b5ed;
			border-radius: 46rpx;
		}
	}

	// 日程安排
	.schedule {
		.schedule-item {
			height: 179rpx;
			padding: 38rpx 10rpx;
			border-bottom: 1px solid #dadbdd;

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

				.schedule-btm-check {
					width: 38rpx;
					height: 38rpx;

					.iconfont {
						width: 38rpx;
						height: 38rpx;
						color: #1890FF;
					}

					.color-gray {
						color: #BFBFBF;
					}
				}
			}
		}
	}

	.attention-school {
		width: 628rpx;
		height: 84rpx;
		background: #fbbe4b;
		color: #fff;
		font-size: 35rpx;
		border-radius: 23rpx;
		margin: 29rpx auto;
		letter-spacing: 4rpx;
	}
</style>
