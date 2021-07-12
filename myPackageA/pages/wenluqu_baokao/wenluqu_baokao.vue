<template>
	<view class="examination">
		<view class="examination__center">
			<view class="examination__center__title">
				信息填报
			</view>
			<!-- 文化分 -->
			<view class="question">
				<view class="question__title">
					<image src="../../static/img/biaoji.png"></image>
					<text>文化分</text>
				</view>
				<input type="number" v-model="cultural" focus placeholder="满分750分" />
			</view>
			<!-- 省份 -->
			<view class="question">
				<view class="question__title">
					<image src="../../static/img/biaoji.png"></image>
					<text>省份</text>
				</view>
				<picker @change="bindPickerChange" :value="index" :range="provinceArr" range-key="pName">
					<input type="text" v-model="provinceArr[index].pName" placeholder="请选择省份" disabled="true" />
				</picker>
			</view>
			<!-- 统考排名 -->
			<view class="question">
				<view class="question__title">
					<image src="../../static/img/biaoji.png"></image>
					<text>统考排名</text>
				</view>
				<input v-model="rank" placeholder="请输入排名" type="number" verifyNumber="true" />
			</view>
			<!-- 统考分 -->
			<view class="question">
				<view class="question__title">
					<image src="../../static/img/biaoji.png"></image>
					<text>统考分</text>
				</view>
				<input v-model="unifiedEx" placeholder="满分300分" type="number" verifyNumber="true" />
			</view>
			<!-- 分科 -->
			<view class="question">
				<view class="question__title">
					<image src="../../static/img/biaoji.png"></image>
					<text>分科</text>
				</view>
				<picker @change="bindPickerChange2" :value="fenkeIndex" :range="fenkeArr" range-key="name">
					<input type="text" v-model="fenkeArr[fenkeIndex].name" placeholder="请选择分科" disabled="true" />
				</picker>
			</view>
			<!-- 提交 -->
			<view class="examination__center__confirm confirm-btn3" @click="confirm">
				确定
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getWenluquShengfeng,
		getAskLuquBaokao
	} from '../../../api/api.js'
	export default {
		data() {
			return {
				// 文化分
				cultural: '',
				// 省份索引
				index: null,
				fenkeIndex: null,
				// 省份列表
				provinceArr: [],
				// 统考排名
				rank: '',
				// 统考成绩
				unifiedEx: '',
				fenkeArr: [{
						name: '理科'
					},
					{
						name: '文科'
					},
					{
						name: '新高考'
					}
				]
			};
		},
		onLoad() {
			getWenluquShengfeng().then(res => {
				console.log('省份', res);
				this.provinceArr = res.data.provinces;
				/* res.data.provinces.map(item => {
					this.candidateProvince.push(item.pName)
				}) */
			})
		},
		methods: {
			// 省份改变
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：', e.detail)
				this.index = e.detail.value
			},
			bindPickerChange2(e) {
				this.fenkeIndex = e.detail.value
			},
			// 提交
			confirm() {
				// 校验
				console.log('this.cultural',this.cultural)
				if (this.cultural == '' || this.unifiedEx == '' || this.rank == '' || this.fenkeIndex == null || this
					.index == null) {
					uni.showToast({
						title: '有未填项！',
						duration: 1000,
						icon: 'none'
					})
					return
				}
				if (this.cultural > 750) {
					uni.showToast({
						title: '文化分满分750分',
						duration: 1000,
						icon: 'none'
					})
					return
				}
				if (this.unifiedEx > 300) {
					uni.showToast({
						title: '统考满分300分',
						duration: 1000,
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '加载中...'
				})
				let openid = uni.getStorageSync('openid');
				let data = {
					culScore: this.cultural,
					provinceId: this.provinceArr[this.index].id,
					unifyRanking: this.rank,
					unifyExamScore: this.unifiedEx,
					fengKe: this.fenkeArr[this.fenkeIndex].name,
					userOPenid: openid
				}
				getAskLuquBaokao(data).then(res => {
					console.log('res', res)
					if (res.data.code == 200) {
						uni.hideLoading()
						uni.navigateTo({
							url: '../wenbaokao_baogao/wenbaokao_baogao'
						})
						uni.$on('baokao', () => {
							uni.$emit('bkbaogao', {
								info: res.data.data
							});
						});
						console.log('发射成功');
					} else {
						uni.hideLoading();
						uni.showToast({
							title: '服务器开小差啦...',
							duration: 1000,
							icon: 'none'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.examination {
		padding: 2vh 38rpx;
		background-color: #F0F0F0;

		&__center {
			width: 100%;
			min-height: 96vh;
			background-color: #fff;
			border-radius: 38rpx;
			padding: 20rpx;

			&__title {
				width: 100%;
				text-align: center;
				padding-top: 54rpx;
				margin-bottom: 40rpx;
				height: 89rpx;
				font-size: 35rpx;
				line-height: 35rpx;
				font-weight: 400;
				color: #000000;
			}

			&__confirm {
				width: 564rpx;
				height: 84rpx;
				text-align: center;
				line-height: 84rpx;
				font-size: 35rpx;
				color: #fff;
				letter-spacing: 4rpx;
				margin: 0 auto;
				background: #FBBE4B;
				border-radius: 46rpx;
			}

			.confirm-btn3 {
				margin-top: 60rpx;
			}
		}

	}

	.uni-input {
		width: 543rpx;
		height: 77rpx;
		background: #FFFFFF;
		border: 2px solid #FBBE4B;
		border-radius: 15rpx;
		padding: 15rpx;
	}

	// 公共问题
	.question {
		width: 543rpx;
		margin: 0 auto;
		margin-bottom: 27rpx;

		&__title {
			margin-bottom: 27rpx;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}

			text {
				font-size: 31rpx;
				font-weight: 400;
				color: #A9AFB8;
			}
		}

		input {
			width: 543rpx;
			height: 77rpx;
			background: #FFFFFF;
			border: 2px solid #FBBE4B;
			border-radius: 15rpx;
			padding: 15rpx;
		}

		.btns {
			display: flex;
			width: 543rpx;
			height: 77rpx;
			justify-content: space-around;

			.btns1 {
				width: 140rpx;
				height: 70rpx;
				text-align: center;
				line-height: 70rpx;
				font-size: 35rpx;
				color: #fff;
				letter-spacing: 4rpx;
				margin: 0 auto;
				background: #FBBE4B;
				border-radius: 27rpx;
			}

		}
	}
</style>
