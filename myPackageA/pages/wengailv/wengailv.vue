<template>
	<view class="probability__main">
		<view class="probability__center">
			<view class="probability__center__title">
				信息填报
			</view>
			<!-- 学校专业选择 -->
			<view v-if="luquType === 'bg'">
				<view class="back historical" @click="historical">
					历史记录
				</view>
				<view class="example-body">
					<uni-combox label="院校" labelWidth="150px" :candidates="candidateSchool" placeholder="请输入院校"
						v-model="school" :emptyTips="schoolTips" @blur="onBlur"></uni-combox>
				</view>
				<!--  v-if="majorInputShow" -->
				<view class="example-body">
					<view class="fill-view" v-if="!majorInputShow">
						
					</view>
					<!-- <uni-combox label="专业" labelWidth="150px" :candidates="candidateMajor" placeholder="请选择专业"
						v-model="major" :emptyTips="majoyTips"></uni-combox> -->
					<view class="uni-combox__label">
						<text>专业</text>
					</view>
					<picker @change="bindPickerChange3" :range="academies" range-key="acMajor">
						<input type="text" v-model="academies[zhuanyeIndex].acMajor" :placeholder="majortips"
							disabled="true" />
					</picker>
				</view>
				<view class="example-body">
					<view class="uni-combox__label">
						<text>分科</text>
					</view>
					<picker @change="bindPickerChange2" :range="fenkeArr" range-key="name">
						<input type="text" v-model="fenkeArr[fenkeIndex].name" placeholder="请选择分科" disabled="true" />
					</picker>
				</view>
				<view class="example-body">
					<view class="uni-combox__label">
						<text>省份</text>
					</view>
					<picker @change="bindPickerChange" :range="provinceArr" range-key="pName">
						<input type="text" v-model="provinceArr[index].pName" placeholder="请选择省份" disabled="true" />
					</picker>
				</view>

				<view class="probability__center__confirm" @click="confirm">
					确定
				</view>
			</view>
			<!-- 综合 -->
			<view class="zonghe" v-if="luquType === '3'">
				<view class="back" @click="backTo">
					返回
				</view>
				<view v-for="(item,index) in zongheTitle" :key="item.id">
					<view class="question" v-if="item.isshow == 1">
						<view class="question__title">
							<image src="../../static/img/biaoji.png"></image>
							<text>{{item.title + '是否通过？'}}</text>
							<switch :checked="false" @change="switch2Change(index)" class="ques-radio"
								style="transform:scale(0.7)" />
						</view>
						<!-- <input type="number" v-model="item.value"/> -->
						<input type="number" v-model="item.value" :disabled="!item.inputShow"
							:class="!item.inputShow? 'input-abled' : ''"
							:placeholder="item.inputShow? '请输入' +item.title +'分' : item.title+'未通过，录取概率为0。'" />
						<!-- <view class="btns" v-if="!item.inputShow">
							<view class="btns1" @click="showInput(item,index)">
								是
							</view>
							<view class="btns1" @click="showTips">
								否
							</view>
						</view> -->
					</view>
				</view>
				<view class="probability__center__confirm confirm-btn3" @click="confirmFirst('3')">
					确定
				</view>
			</view>
			<!-- 专过文录 -->
			<view class="zgwl" v-if="luquType === '2'">
				<view class="back" @click="backTo">
					返回
				</view>
				<view class="question">
					<view class="question__title">
						<image src="../../static/img/biaoji.png"></image>
						<text>专业考试（联考/统考/校考）是否通过?</text>
						<switch :checked="false" @change="switch1Change" class="ques-radio"
							style="transform:scale(0.7)" />
					</view>
					<input type="number" v-model="wenhuafen" :disabled="!wenhuapass"
						:class="!wenhuapass? 'input-abled' : ''"
						:placeholder="wenhuapass? '请输入文化分' : '专业考试未通过，录取概率为0。'" />
					<!-- <view class="btns" v-if="!wenhuapass">
						<view class="btns1" @click="wenhuapass = !wenhuapass">
							是
						</view>
						<view class="btns1" @click="showTips">
							否
						</view>
					</view> -->
				</view>
				<view class="probability__center__confirm confirm-btn3" @click="confirmFirst('2')">
					确定
				</view>
			</view>
			<!-- 文过专入 -->
			<view class="whzr" v-if="luquType === '1'">
				<view class="back" @click="backTo">
					返回
				</view>
				<view class="question">
					<view class="question__title">
						<image src="../../static/img/biaoji.png"></image>
						<text>文化分得分</text>
					</view>
					<input type="number" v-model="wenhuafen" />
				</view>
				<view v-for="(item,index) in wgzrTitle" :key="item.rextype">
					<view class="question" v-if="reExamType == item.rextype">
						<view class="question__title">
							<image src="../../static/img/biaoji.png"></image>
							<text>{{ item.title + '是否通过' }}</text>
							<switch :checked="false" @change="switch3Change(index)" class="ques-radio"
								style="transform:scale(0.7)" />
						</view>
						<!-- <input type="number" v-model="item.rank" v-if="item.inputShow" /> -->
						<input type="number" v-model="item.rank" :disabled="!item.inputShow"
							:class="!item.inputShow? 'input-abled' : ''"
							:placeholder="item.inputShow? '请输入' +item.title +'排名' : item.title+'未通过，录取概率为0。'" />
						<!-- <view class="btns" v-if="!item.inputShow">
							<view class="btns1" @click="showInput(item,index)">
								是
							</view>
							<view class="btns1" @click="showTips">
								否
							</view>
						</view> -->
					</view>
				</view>
				<view class="probability__center__confirm confirm-btn3" @click="confirmFirst('1')">
					确定
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getSchoolName,
		getMajorName,
		getWenluquShengfeng,
		getAskLuquProb
	} from '../../../api/api.js'
	export default {
		data() {
			return {
				candidateSchool: [],
				school: '',
				candidateMajor: [],
				major: '',
				timer: null,
				academies: [{
					acMajor: '请输入正确的院校名，以获取院校专业。'
				}],
				majortips: '输入正确院校名获取专业',
				luquType: 'bg',
				// 综合问题
				zongheQues: [],
				// 综合题目
				zongheTitle: [{
						title: '校考',
						id: 0,
						value: '',
						isshow: 1,
						ratio: '',
						inputShow: false
					},
					{
						title: '统考',
						id: 1,
						value: '',
						isshow: 1,
						ratio: '',
						inputShow: false
					},
					{
						title: '联考',
						id: 2,
						value: '',
						isshow: 1,
						ratio: '',
						inputShow: false
					},
					{
						title: '文化',
						id: 3,
						value: '',
						isshow: 1,
						ratio: '',
						inputShow: false
					},
				],
				// 选择的学校专业id
				schoolPrimaryId: '',
				// 记录是否通过
				isPass: true,
				// 文过专入
				wgzrTitle: [{
						title: '校考',
						rank: '',
						rextype: '1',
						inputShow: false,
						attribute: 'schoolExamRanking'
					},
					{
						title: '统考',
						rank: '',
						rextype: '2',
						inputShow: false,
						attribute: 'unifyRanking'
					},
					{
						title: '校考',
						rank: '',
						rextype: '3',
						inputShow: false,
						attribute: 'schoolExamRanking'
					},
					{
						title: '联考',
						rank: '',
						rextype: '4',
						inputShow: false,
						attribute: 'allyExamRanking'
					}
				],
				// 文过专录，专业考试类型
				reExamType: '',
				// 文化分
				wenhuafen: '',
				// 文化分是否通过
				wenhuapass: false,
				// 省份索引
				index: '',
				// 专业索引
				zhuanyeIndex: '',
				// 专业数组
				zhuanyeArr: '',
				// 省份数组
				provinceArr: [],
				// 分科索引
				fenkeIndex: '',
				// 分科数组
				fenkeArr: [{
						name: '理科'
					},
					{
						name: '文科'
					},
					{
						name: '新高考'
					}
				],
				// 学校提示
				schoolTips: '',
				majoyTips: '请输入正确的院校名称。',
				returnStatus: false,
				majorInputShow: false

			}
		},
		onLoad() {
			getWenluquShengfeng().then(res => {
				console.log('省份', res);
				this.provinceArr = res.data.provinces;
			})
		},
		watch: {
			school: function(newSchool, oldSchool) {
				this.major = '';
				this.academies = '';
				this.majorInputShow = false;
				this.zhuanyeIndex = '';
				if (this.timer !== null) {
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(this.debounce, 1000);
				console.log('11111111', newSchool, oldSchool)
			}
		},
		methods: {
			// 模糊请求学校
			debounce(newSchool) {
				let data = {
					school: this.school
				}
				this.schoolTips = '正在搜索院校中......'
				getSchoolName(data).then(res => {
					if (res.data.msg == '没有数据') {
						this.schoolTips = '无匹配院校,请输入其他院校。'
					}
					// 学校列表
					this.candidateSchool = res.data.academyNames;
					// 查询专业,精确查询
					this.majortips = '正在搜索院校专业中......'
					getMajorName(data).then(res => {
						console.log('res', res)
						if (res.data.msg === '查询成功') {
							/* this.candidateMajor = res.data.academyNames; */
							// 专业列表
							this.academies = res.data.hxgAcademies;
							this.majortips = '请选择专业'
							this.majorInputShow = true
						} else {
							this.academies = [{
								acMajor: '请输入正确的院校名，以获取院校专业。'
							}]
							this.majortips = '输入正确院校名获取专业'
						}
					})
				})
			},
			onBlur() {},
			// 省份改变
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：', e.detail)
				this.index = e.detail.value
			},
			// 分科
			bindPickerChange2(e) {
				this.fenkeIndex = e.detail.value
			},
			// 专业
			bindPickerChange3(e) {
				this.zhuanyeIndex = e.detail.value
			},
			switch1Change(e) {

				console.log(e.detail.value)
				this.wenhuapass = e.detail.value
				this.isPass = e.detail.value
				if (this.wenhuapass == false) {
					this.wenhuafen = ''
				}
			},
			switch2Change(index) {
				this.zongheTitle[index].inputShow = !this.zongheTitle[index].inputShow
				if (this.zongheTitle[index].inputShow == false) {
					this.zongheTitle[index].value = '';
				}
				console.log('1111', this.zongheTitle[index])
			},
			switch3Change(index) {
				this.wgzrTitle[index].inputShow = !this.wgzrTitle[index].inputShow
				if (this.wgzrTitle[index].inputShow == false) {
					this.wgzrTitle[index].rank = ''
				}
				console.log('111', this.wgzrTitle[index])
			},
			// 填写更多信息
			confirm() {
				// 校验
				console.log(this.school, this.zhuanyeIndex, this.fenkeIndex, this.index)
				if(!this.zhuanyeIndex) {
					if(this.majorInputShow) {
						uni.showToast({
							title: '请选择专业！',
							duration: 2000,
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '请输入正确的院校名，以显示专业选项！',
							duration: 2000,
							icon: 'none'
						})
					}
					return
				}
				if (!this.fenkeIndex || !this.school  || !this.index) {
					uni.showToast({
						title: '有未填写的选项！',
						duration: 2000,
						icon: 'none'
					})
					return
				}
				// 校验结束
				// 判断专业类型
				this.luquType = this.academies[this.zhuanyeIndex].reLuquType;
				// 选择的学校专业id
				this.schoolPrimaryId = this.academies[this.zhuanyeIndex].id;
				console.log(this.luquType)
				if (this.luquType == '3') {
					// 如果是综合
					if (this.academies[this.zhuanyeIndex].acNewlqgz != null) {
						this.zongheQues = this.academies[this.zhuanyeIndex].acNewlqgz.split('+');
						for (let i = 0; i < this.zongheQues.length; i++) {
							this.zongheQues[i] = this.zongheQues[i].substring(1);
							if (this.zongheQues[i] == '0') {
								this.zongheTitle[i].isshow = 0
							} else {
								this.zongheTitle[i].ratio = this.zongheQues[i]
							}
						}
						console.log('this.zongheQues', this.zongheQues, this.zongheTitle)

					}
				}
				if (this.luquType == '1') {
					// 如果是文过专入
					// 文过专入类型
					this.reExamType = this.academies[this.zhuanyeIndex].reExamType
				}

			},
			// 公共提交
			confirmFirst(type) {
				// 是否有未通过
				if (!this.isPass) {
					uni.showModal({
						title: '提示',
						content: '有考试未通过,录取概率为0',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}
				// 校验
				for (let i = 0; i < this.zongheTitle.length; i++) {
					if (this.zongheTitle[i].value > 750) {
						uni.showToast({
							title: '分数超过正常范围！',
							duration: 2000,
							icon: 'none'
						})
						return
					}
				}
				if (this.wenhuafen > 750) {
					uni.showToast({
						title: '分数超过正常范围！',
						duration: 2000,
						icon: 'none'
					})
					return
				}
				// 校验结束

				let data = '';
				if (type === '3') {
					// 校验
					this.zongheTitle.map(item => {
						if (item.isshow == 1 && !item.inputShow) {
							this.returnStatus = true
						}

					})
					data = this.confirm3()
				} else if (type === '2') {
					data = this.confirm2()
				} else {
					this.wgzrTitle.map(item => {
						if (this.reExamType == item.rextype && !item.inputShow) {
							this.returnStatus = true
						}
					})
					data = this.confirm1()
				}
				if (this.returnStatus) {
					uni.showModal({
						title: '提示',
						content: '有考试未通过,录取概率为0',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					this.returnStatus = false
					return
				}
				uni.showLoading({
					title: '加载中'
				});
				// 发送请求
				getAskLuquProb(data).then(res => {
					uni.hideLoading();
					console.log('res', res)
					if (res.data.code == 200) {
						// 跳转页面，并发射数据
						uni.navigateTo({
							url: '../wengailvbaogao/wengailvbaogao'
						});
						uni.$on('gailv', () => {
							uni.$emit('gailvbaogao', {
								info: res.data.data,
							});
						});
						console.log('发射成功');
					} else {
						uni.showToast({
							title: res.data.msg + '',
							duration: 2000,
							icon: 'none'
						})
					}


				})
			},
			// 文过专入
			confirm1() {
				// 获取是哪个考试
				let index = Number(this.reExamType) - 1;
				let attribute = this.wgzrTitle[index].attribute;
				let openid = uni.getStorageSync('openid');
				// 省份id
				let provinceId = this.provinceArr[this.index].id;
				let data = {
					// 文化分
					culScore: this.wenhuafen,
					userOPenid: openid,
					schoolPrimaryId: this.schoolPrimaryId,
					allyExamFlag: 1,
					schoolExamFlag: 1,
					unifyExamFlag: 1,
					fengKe: this.fenkeArr[this.fenkeIndex].name,
					provinceId: provinceId
				}
				data[attribute] = this.wgzrTitle[index].rank
				return data
			},
			// 专过文录
			confirm2() {
				let openid = uni.getStorageSync('openid');
				// 省份id
				let provinceId = this.provinceArr[this.index].id;
				let data = {
					userOPenid: openid,
					schoolPrimaryId: this.schoolPrimaryId,
					// 文化分
					culScore: this.wenhuafen,
					allyExamFlag: 1,
					schoolExamFlag: 1,
					unifyExamFlag: 1,
					fengKe: this.fenkeArr[this.fenkeIndex].name,
					provinceId: provinceId
				}
				return data
			},
			// 综合提交
			confirm3() {

				let openid = uni.getStorageSync('openid');
				let zhf = 0;
				console.log('this.zongheTitle', this.zongheTitle)
				for (let i = 0; i < this.zongheTitle.length; i++) {
					zhf = zhf + (this.zongheTitle[i].ratio * this.zongheTitle[i].value) / 100
				}
				// 省份id
				let provinceId = this.provinceArr[this.index].id;
				console.log('zhf', zhf)
				let data = {
					userOPenid: openid,
					schoolPrimaryId: this.schoolPrimaryId,
					// 综合分
					zhf: zhf,
					allyExamFlag: 1,
					schoolExamFlag: 1,
					unifyExamFlag: 1,
					fengKe: this.fenkeArr[this.fenkeIndex].name,
					provinceId: provinceId
				}
				return data
			},
			showInput(item, index) {
				item.inputShow = true;
				let newItem = item;
				this.zongheTitle.splice(index, 1, newItem)
			},
			// 未通过
			showTips() {
				this.isPass = false;
				uni.showModal({
					title: '提示',
					content: '考试未通过,录取概率为0',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 返回
			backTo() {
				this.luquType = 'bg';
				this.isPass = true;
				this.zongheTitle = [{
						title: '校考',
						id: 0,
						value: '',
						isshow: 1,
						ratio: '',
						inputShow: false
					},
					{
						title: '统考',
						id: 1,
						value: '',
						isshow: 1,
						ratio: '',
						inputShow: false
					},
					{
						title: '联考',
						id: 2,
						value: '',
						isshow: 1,
						ratio: '',
						inputShow: false
					},
					{
						title: '文化',
						id: 3,
						value: '',
						isshow: 1,
						ratio: '',
						inputShow: false
					},
				];
				this.wgzrTitle = [{
						title: '校考',
						rank: '',
						rextype: '1',
						inputShow: false,
						attribute: 'schoolExamRanking'
					},
					{
						title: '统考',
						rank: '',
						rextype: '2',
						inputShow: false,
						attribute: 'unifyRanking'
					},
					{
						title: '校考',
						rank: '',
						rextype: '3',
						inputShow: false,
						attribute: 'schoolExamRanking'
					},
					{
						title: '联考',
						rank: '',
						rextype: '4',
						inputShow: false,
						attribute: 'allyExamRanking'
					}
				];
				this.wenhuafen = '';
				this.wenhuapass = false;
			},
			// 历史记录
			historical() {
				uni.navigateTo({
					url: '../wenlvqu_history/wenlvqu_history'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.probability__main {
		padding: 5vh 38rpx;
		background-color: #F0F0F0;

		.probability__center {
			width: 100%;
			height: 90vh;
			background-color: #fff;
			border-radius: 38rpx;
			position: relative;

			&__title {
				width: 100%;
				text-align: center;
				padding-top: 54rpx;
				margin-bottom: 88rpx;
				height: 89rpx;
				font-size: 35rpx;
				line-height: 35rpx;
				font-weight: 400;
				color: #000000;
			}

			.example-body {
				position: relative;
				display: flex;
				align-items: center;
				padding: 20rpx;
				margin: 0 auto;
				margin-bottom: 84rpx;
				width: 543rpx;
				height: 77rpx;
				background: #FFFFFF;
				border: 2px solid #FBBE4B;
				border-radius: 15rpx;
				.fill-view {
					width: 100%;
					height: 100%;
					position: absolute;
					z-index: 999;
					left: 0rpx;
				}
			}

			.flag {
				display: flex;

				.example-body2 {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 0 auto;
					margin-bottom: 84rpx;
					width: 200rpx;
					height: 77rpx;
					background: #FFFFFF;
					border: 2px solid #FBBE4B;
					border-radius: 15rpx;
				}
			}

			&__confirm {
				width: 180rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				font-size: 30rpx;
				color: #fff;
				letter-spacing: 4rpx;
				background: #FBBE4B;
				border-radius: 20rpx;
				position: absolute;
				bottom: 80rpx;
				left: 50%;
				transform: translateX(-50%);
			}

			.confirm-btn3 {
				margin-top: 50rpx;
			}
		}
	}

	// 公共问题
	.question {
		width: 543rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;

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

			.ques-radio {
				margin-left: 20rpx;
			}
		}

		input {
			width: 543rpx;
			height: 30rpx;
			background: #FFFFFF;
			border: 2px solid #FBBE4B;
			border-radius: 15rpx;
			padding: 10rpx 15rpx;
			box-sizing: content-box;
			font-size: 30rpx;
		}

		.input-abled {
			border: 2px solid #8799A3;
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

	.back {
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		width: 110rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 27rpx;
		color: #fff;
		letter-spacing: 4rpx;
		margin: 0 auto;
		background: #FBBE4B;
		border-radius: 46rpx;
	}

	.historical {
		width: 160rpx;
		height: 54rpx;
		line-height: 54rpx;
	}

	.uni-combox__label {
		font-size: 16px;
		line-height: 22px;
		padding-right: 10px;
		color: #999999;
	}
</style>
