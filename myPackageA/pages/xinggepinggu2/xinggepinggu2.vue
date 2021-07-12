<template>
	<view class="box">
		<!-- 提示框 -->
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="warn" title="提示" content="还有没有回答的题目!" @confirm="dialogConfirm">
				</uni-popup-dialog>
			</uni-popup>

			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message type="error" message="提交失败!" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
		<!-- 选择 -->
		<uni-popup ref="popup" type="top">
			<scroll-view scroll-y="true" style="height: 620rpx;">
				<view class="selects">
					<view :class="['circle-nums', { checkselect: item.selectItem != '' }]"
						v-for="(item, index) in askstudies" :key="index" @click="selected(index)">
						{{ index + 1 }}
					</view>
					<view class="circle-nums-em" v-for="(item, index) in 7 - (askstudies.length % 7)" :key="index">
					</view>
				</view>
			</scroll-view>
		</uni-popup>
		<!-- 选择结束 -->
		<view class="questions-box">
			<swiper :indicator-dots="false" :autoplay="false" :duration="50" :current="indexNums"
				@change="intervalChange">
				<swiper-item v-for="(item1, index1) in questionList" :key="index1">
					<view class="type">
						<text v-if="item1.asType == 1">填空题</text>
						<text v-if="item1.asType == 2">单选题</text>
						<text v-if="item1.asType == 3">多选题</text>
						<text v-if="item1.asType == 4">选择时间</text>
						<text v-if="item1.asType == 5">选择省份</text>
						<text v-if="item1.asType == 6 || item1.asType == 7">分数</text>
						<!-- <text>{{ ' ' + (index1 + 1) + '/' + questionList.length }}</text> -->
						<text class="all-question iconfont" @click="openSelect">查看全部</text>
					</view>

					<view class="list">
						<view class="title" v-html="item1.asContent"></view>
						<!-- 如果是选择题 -->
						<view class="options" v-if="item1.asType === 2 || 3">
							<scroll-view scroll-y="true" class="scroll-list">
								<view
									:class="['option', { checked: askstudies[index1].selectItem.split(',').includes(item2.astvName) }]"
									v-for="(item2, index2) in item1.askstudytovalues"
									@click="handleOption(index1, index2, item1, item2)" :key="index2">
									<text>{{ item2.astvName }}</text>
								</view>
							</scroll-view>
						</view>
						<!-- 如果是填空题1 -->
						<view class="gap__filling" v-if="item1.asType === 1"><textarea
								v-model="askstudies[index1].selectItem" placeholder="请输入答案..." /></view>
						<!-- 如果是时间选择4 -->
						<div class="item" v-if="item1.asType === 4">
							<dyDatePicker timeType="month" @getData="getData" placeholder="请选择日期" minSelect="1921/01/01"
								maxSelect="2025/12/31" :childValue="askstudies[index1].selectItem"></dyDatePicker>
						</div>
						<!-- 如果是地区选择 -->
						<view class="item-province" v-if="item1.asType === 5">
							<picker @change="bindPickerChange" :value="index" :range="provinceArr" range-key="pName"
								@click="handleIndex(index1)">
								<input type="text" v-model="provinceArr[index].pName"
									:placeholder="askstudies[index1].selectItem || '请输入城市'" disabled="true" />
							</picker>
						</view>
						<!-- 如果是100分 -->
						<view class="item-numb" v-if="item1.asType === 6">
							<slider :value="askstudies[index1].selectItem" @change="sliderChange" min="0"
								:max="item1.reserve2" show-value />
						</view>
						<!-- 如果是文化分 -->
						<view class="item-numb" v-if="item1.asType === 7">
							<slider :value="askstudies[index1].selectItem" @change="sliderChange" min="0"
								:max="item1.reserve2" show-value />
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="control">
			<view class="last" @click="last">上一题</view>
			<view class="next" @click="next" v-show="!(indexNums == questionList.length - 1)">下一题</view>
			<view class="submit" @click="submit" v-show="indexNums == questionList.length - 1">
				{{ submiting ? '提交中' : '提交' }}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getyikaoTikuList_one_all,
		getAskStudy,
		getWenxuexiResuleList,
		getAskStudyRecord,
		getEnrollList,
		getEnrollAnswers,
		postEnrollAnswes,
		getWenluquShengfeng
	} from '../../../api/api.js';
	import dyDatePicker from '../../../components/dy-Date/dy-Date.vue';
	export default {
		components: {
			dyDatePicker
		},
		data() {
			return {
				questionList: [],
				// 当前题目索引
				currentIndex: 0,
				// 原list
				list: [],
				indexNums: 0,
				style: 'checked',
				askstudies: [],
				submiting: false,
				optionPage: '',
				//加载中组件数据
				// 省份
				index1: '',
				index: '',
				// 省份数组
				provinceArr: [],
			};
		},
		onLoad(option) {
			console.log('option', option.page);
			this.optionPage = option.page;
			uni.showLoading({
				title: '加载中'
			});
			this.getAnswerArr();
			/* if(option.page === '2') {
				getEnrollList().then(res => {
					console.log('getEnrollList',res)
				})
			} */
			getWenluquShengfeng().then(res => {
				console.log('省份', res);
				this.provinceArr = res.data.provinces;
			})
		},
		methods: {
			getData(time) {
				console.log('getData', time);
				this.askstudies[this.indexNums].selectItem = time;
			},
			// 省份改变
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：', e.detail)
				this.index = e.detail.value
				this.askstudies[this.index1].selectItem = this.provinceArr[this.index].pName
			},
			handleIndex(index1) {
				this.index1 = index1;
				console.log(index1)
			},
			// 分数改变
			sliderChange(e) {
				console.log('picker发送选择改变，携带值为：', e.detail)
				this.askstudies[this.indexNums].itemScore = e.detail.value
				this.askstudies[this.indexNums].selectItem = e.detail.value
			},
			async getAnswerArr() {
				if (this.optionPage === '2') {
					// 获取答案记录
					let useropenid = {
						userOpenid: uni.getStorageSync('openid')
					};
					let answers = await getEnrollAnswers(useropenid);
					console.log('answers', answers);
					let answerArr = answers.data.data.askstudies;
					/* let answerArr = [] */
					// 获取题目
					let res = await getEnrollList();
					console.log('获取问校考问题', res);
					// 对数组属性进行处理
					this.questionList = this.handleQueName(res.data.rows);
					console.log('questionList', this.questionList);
					// 隐藏加载中...
					uni.hideLoading();
					if (answerArr) {
						// 如果有答题记录
						console.log('有答题记录');
						this.askstudies = answerArr;
						this.indexNums = answerArr.length - 1;
					} else {
						// 如果没有答题记录,新建答案容器数组
						console.log('没有答题记录');
						for (let i = 0; i < res.data.rows.length; i++) {
							this.askstudies.push({
								itemScore: 0,
								// 选项id
								optionIds: '',
								quId: res.data.rows[i].id,
								selectItem: '',
								type: res.data.rows[i].asType
							});
						}
						console.log('没有答题记录', this.askstudies);
					}
				} else {
					// 问学习开始
					// 获取答案记录
					let useropenid = {
						userOpenid: uni.getStorageSync('openid')
					};
					let answers = await getAskStudyRecord(useropenid);
					let answerArr = answers.data.data.ascbuContentArray;
					// 获取题目
					let res = await getAskStudy();
					this.questionList = res.data.data;
					// 隐藏加载中...
					uni.hideLoading();
					console.log('questionList', this.questionList);
					if (answerArr) {
						// 如果有答题记录
						this.askstudies = answerArr;
						this.indexNums = answerArr.length - 1;
					} else {
						// 新建答案容器数组
						for (let i = 0; i < res.data.data.length; i++) {
							this.askstudies.push({
								id: res.data.data[i].id,
								asTocatalogid: res.data.data[i].asTocatalogid,
								itemScore: 0,
								selectItem: ''
							});
						}
					}
					console.log('this.askstudies', this.askstudies);
					// 问学习结束
				}
			},
			handleQueName(ques) {
				ques.map(item => {
					item.asType = item.type;
					item.asContent = item.seContent;
					if (item.optionList) {
						item.askstudytovalues = item.optionList;
						item.askstudytovalues.map(item1 => {
							item1.astvName = item1.content;
							delete item1.content;
						});
						delete item.optionList;
					}

					delete item.type;
					delete item.seContent;

					return item;
				});
				console.log('处理后', ques);
				return ques;
			},
			// 选中答案触发事件
			handleOption(index1, index2, item1, item2) {
				if (this.optionPage === '2') {
					// 问校考
					// 计入高亮答案项
					if (this.askstudies[index1].optionIds.indexOf(item2.id) !== -1) {
						// 如果点击项已经选中
						if (item1.asType == 3) {
							// 多选
							console.log('这是多选');
							let selectItemArr = this.askstudies[index1].selectItem.split(',');
							let itemIndex = selectItemArr.indexOf(item2.astvName);
							selectItemArr.splice(itemIndex, 1);
							this.askstudies[index1].selectItem = selectItemArr.join(',');
							/* this.askstudies[index1].selectItem = this.askstudies[index1].selectItem.replace(item2.astvName,
								''); */
							this.askstudies[index1].optionIds = this.askstudies[index1].optionIds.replace(item2.id, '');
							this.askstudies[index1].itemScore = this.askstudies[index1].itemScore = this.askstudies[index1]
								.itemScore - item2.score;
							console.log('this.askstudies[index1]', this.askstudies[index1]);
						} else {
							// 单选
							// 如果已经选择一个答案，则取消选中
							this.askstudies.splice(index1, 1, {
								id: item1.id,
								optionIds: '',
								itemScore: 0,
								selectItem: ''
							});
							console.log('this.askstudies取消', this.askstudies);
							return;
						}
					} else {
						// 问报考,第一次选择或者重新选择
						if (item1.asType == 3) {
							// 如果是多选题
							console.log('这是多选');
							let optids = this.askstudies[index1].optionIds;
							let seleitem = this.askstudies[index1].selectItem;
							this.$set(this.askstudies, index1, {
								quId: item1.id,
								itemScore: (this.askstudies[index1].itemScore = this.askstudies[index1].itemScore +
									item2.score),
								optionIds: optids ? optids + ',' + item2.id : item2.id + '',
								selectItem: seleitem ? seleitem + ',' + item2.astvName : item2.astvName,
								type: item1.asType
							});
							console.log('this.askstudies[index1]', this.askstudies[index1]);
						} else {
							// 如果是单选
							this.$set(this.askstudies, index1, {
								quId: item1.id,
								itemScore: item2.score,
								optionIds: item2.id + '',
								selectItem: item2.astvName,
								type: item1.asType
							});
							console.log('选中了', this.askstudies)
							if (this.indexNums < this.questionList.length - 1) {
								this.indexNums++;
							}
						}
					}
				} else {
					// 问学习
					// 计入高亮答案项
					if (this.askstudies[index1].selectItem === item2.astvName) {
						// 如果已经选择一个答案，则取消选中
						this.askstudies.splice(index1, 1, {
							id: item1.id,
							asTocatalogid: item1.asTocatalogid,
							itemScore: 0,
							selectItem: ''
						});
						console.log('this.askstudies取消', this.askstudies);
						return;
					} else {
						// 第一次选择或者重新选择
						let itemScore = item1.asScore * item2.astvPercent;
						console.log('itemScore', itemScore);
						this.$set(this.askstudies, index1, {
							id: item1.id,
							asTocatalogid: item1.asTocatalogid,
							itemScore: itemScore + '',
							selectItem: item2.astvName
						});
						if (this.indexNums < this.questionList.length - 1) {
							this.indexNums++;
						}
					}
				}
			},
			// 上一题
			last() {
				if (this.indexNums <= 0) {
					uni.showToast({
						title: '已经到第一题了',
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				this.indexNums--;
			},
			// 下一题
			next() {
				this.indexNums++;
			},
			// 节流
			throttle(fn, delay) {
				let valid = true;
				return function() {
					if (!valid) {
						//休息时间 暂不接客
						return false;
					}
					// 工作时间，执行函数并且在间隔期内把状态位设为无效
					valid = false;
					setTimeout(() => {
						fn();
						valid = true;
					}, delay);
				};
			},
			// 提交
			dialogConfirm() {
				this.$refs.popup.open('top');
			},
			submit() {
				console.log('this.askstudies', this.askstudies)
				if (this.submiting) {
					console.log('111111');
					return;
				}
				// 判断是否有哪一题没回答
				let emy = false;
				this.askstudies.forEach(item => {
					if (item.selectItem === '') {
						this.$refs.alertDialog.open();
						emy = true;
					}
				});
				if (emy) {
					return;
				}
				// 发送提交请求
				if (this.optionPage === '2') {
					// 问校考提交
					this.askstudies.map(item => {
						if (item.type == 1) {
							item.content = item.selectItem
						}
					})
					let data = {
						userOpenid: uni.getStorageSync('openid'),
						askstudies: this.askstudies,
					};
					console.log('提交的答案', this.askstudies);
					this.submiting = true;
					postEnrollAnswes(data).then(res => {
						console.log(111, res);
						if (res.data.code == 200) {
							// 跳转页面，并发射数据
							uni.navigateTo({
								url: '../wenbaokaonew/wenbaokaonew'
							});
							uni.$on('need', () => {
								uni.$emit('baogao', {
									xuexiao: res.data.data,
								});
							});
							console.log('发射成功');
							setTimeout(() => {
								this.submiting = false;
							}, 500);
						} else {
							this.submiting = false;
							this.$refs.message.open();
						}
					});
				} else {
					// 问学习
					let data = {
						userOpenid: uni.getStorageSync('openid'),
						askstudies: this.askstudies
					};
					console.log('111111', this.askstudies);
					this.submiting = true;
					getWenxuexiResuleList(data).then(res => {
						console.log(111, res);
						if (res.data.code == 200) {
							// 跳转页面，并发射数据
							uni.navigateTo({
								url: '../wenxuexiBaogao/wenxuexiBaogao'
							});
							uni.$on('need', () => {
								uni.$emit('baogao', {
									haomai: res.data.haomai,
									overAllScore: res.data.overAllScore,
									xuexiao: res.data.xuexiao,
									chartsData: res.data.chartsData,
									suitAbleMajor: res.data.suitAbleMajor,
									postData: data
								});
							});
							console.log('发射成功');
							setTimeout(() => {
								this.submiting = false;
							}, 500);
						} else {
							this.submiting = false;
							this.$refs.message.open();
						}
					});
				}
			},
			openSelect() {
				this.$refs.popup.open('top');
			},
			selected(index) {
				(this.indexNums = index), this.$refs.popup.close();
			},
			// 滑动触发
			intervalChange(e) {
				this.indexNums = e.detail.current;
				console.log(this.indexNums);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
		height: 100vh;
		padding: 2.5vh;
	}

	.all-question {
		float: right;
		font-size: 30rpx;
		font-weight: 400;
		color: #57b5ed;
	}

	.type {
		height: 100rpx;
		font-size: 35rpx;
		font-weight: 400;
		color: #a9afb8;
		line-height: 100rpx;
	}

	.scroll-list {
		max-height: 70vh;
	}

	.questions-box {
		position: relative;
		width: 100%;
		overflow: hidden;

		swiper {
			height: 80vh;
		}
	}

	.title {
		font-size: 18px;
		font-weight: 400;
		line-height: 18px;
		color: #242448;
		margin-bottom: 30rpx;
	}

	.option {
		min-width: 200rpx;
		height: 60rpx;
		margin-bottom: 30rpx;
		padding-left: 30rpx;
		font-size: 14px;
		font-weight: 400;
		line-height: 60rpx;
		color: #273253;
		border-radius: 60rpx;
		background-color: #ffffff;
	}

	.gap__filling {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 35rpx;

		textarea {
			width: 643rpx;
			height: 365rpx;
			background: #ffffff;
			border: 2rpx solid #fbbe4b;
			border-radius: 15rpx;
			padding: 22rpx 34rpx;
		}
	}

	.checked {
		background-color: #fbbe4b;
	}

	.control {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 5vh;
	}

	.last,
	.next,
	.submit {
		width: 172rpx;
		height: 56rpx;
		text-align: center;
		line-height: 56rpx;
		background: #fbbe4b;
		border-radius: 56rpx;
		color: #ffffff;
	}

	// 选择

	.selects {
		width: 100vw;
		min-height: 620rpx;
		background-color: #ffffff;
		padding: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		.circle-nums {
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			border-radius: 50%;
			border: 1px solid #fbbe4b;
			text-align: center;
			line-height: 80rpx;
		}

		.circle-nums-em {
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
		}

		.checkselect {
			background-color: #fbbe4b;
			color: #ffffff;
		}
	}

	.item-province {
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
	}
</style>
