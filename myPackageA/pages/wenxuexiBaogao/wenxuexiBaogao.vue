<template>
	<view>
		<view class="again" @click="resetAnswer"><text>重新答题</text>
		<zwz-hint></zwz-hint>
		</view>
		<!-- 专业版 -->
		<view class="reportplus" v-if="permissions === '2'">
			<view class="content_top">
				<view class="leftsemicircle"></view>
				<view class="rightsemicircle"></view>
				<view class="user-img"><image :src="bgurl"></image></view>
				<view class="university">
					<text>{{ nickName }}的性格评估</text>
				</view>
			</view>
			<view class="content-plus">
				<text class="plus-title">综合得分</text>
				<view class="nums">{{ Math.round(baogaoinfo.overAllScore) }}</view>
				<view class="charts-box">
					<qiun-data-charts
						type="radar"
						:opts="{ legend: { show: false }, extra: { radar: { gridType: 'circle', max: 10000 }, tooltip: { showBox: false } } }"
						:chartData="chartsData"
					/>
					<view class="charts-data" v-for="item in reportData" :key="item.title">
						<view class="minicircle"></view>
						<view class="data-title">{{ item.title + ':' }}</view>
						<view class="data-num">{{ item.data }}</view>
					</view>
				</view>
				<!-- 折线图 -->
				<view class="study-suggest">
					<view class="default-title">成绩趋势</view>
					<qiun-data-charts type="line" :chartData="studyCurveChartsData" background="none" />
				</view>
				<!-- 心理测试结果 -->
				<view class="study-suggest">
					<view class="default-title">心理测试结果</view>
					<view class="study-suggest-item" v-for="item in psychologicalTest" :key="item.id">{{ item.asdsName }}</view>
				</view>
				<!-- 学习建议 -->
				<view class="study-suggest">
					<view class="default-title">学习建议</view>
					<view class="study-suggest-item" v-for="item in studySuggests" :key="item.id">{{ item.asdsName }}</view>
				</view>
				<!-- 专业建议 -->
				<view class="study-suggest">
					<view class="default-title">专业建议</view>
					<view class="study-suggest-item" v-for="item in suitAbleMajor" :key="item.id">{{ item }}</view>
				</view>
				<!-- 条件分享 -->
				<view class="suggest">
					<view class="suggest-item" v-for="item in suggestList" :key="item.id">
						<view :class="['suggest-item-title', 'suggest-item-check']">{{ item.asdcTitle }}</view>
						<view>
							<view class="suggest-item-text" v-for="text in item.askstudydiatoselects" :key="text.id">{{ text.asdsName }}</view>
						</view>
					</view>
				</view>
				<!-- 学校推荐 -->
				<view class="school-recommend">
					<view :class="['school-list', { 'school-list-check': showChong }]" @click="this.showChong = !this.showChong">冲刺学校</view>
					<view v-if="showChong">
						<view v-if="baogaoinfo.xuexiao.cong.length > 0">
							<view class="school-item" v-for="item in baogaoinfo.xuexiao.cong" :key="item.id">
								<view class="item-img"><image :src="item.acPrep4"></image></view>
								<view class="item-main">
									<view class="item-main-top" @click="hint(item.acName)">{{ item.acName }}</view>
									<view class="item-main-btm">{{ item.acMajor }}</view>
								</view>
							</view>
						</view>
						<view class="school-item" v-else>没有可以匹配的学校哦~</view>
					</view>
					<view :class="['school-list', { 'school-list-check': showWeng }]" @click="this.showWeng = !this.showWeng">重点学校</view>
					<view v-if="showWeng">
						<view v-if="baogaoinfo.xuexiao.weng.length > 0">
							<view class="school-item" v-for="item in baogaoinfo.xuexiao.weng" :key="item.id">
								<view class="item-img"><image :src="item.acPrep4"></image></view>
								<view class="item-main">
									<view class="item-main-top" @click="hint(item.acName)">{{ item.acName }}</view>
									<view class="item-main-btm">{{ item.acMajor }}</view>
								</view>
							</view>
						</view>
						<view class="school-item" v-else>没有可以匹配的学校哦~</view>
					</view>
					<view :class="['school-list', { 'school-list-check': showBao }]" @click="this.showBao = !this.showBao">保底学校</view>
					<view v-if="showBao">
						<view v-if="baogaoinfo.xuexiao.bao.length > 0">
							<view class="school-item" v-for="item in baogaoinfo.xuexiao.bao" :key="item.id">
								<view class="item-img"><image :src="item.acPrep4"></image></view>
								<view class="item-main">
									<view class="item-main-top" @click="hint(item.acName)">{{ item.acName }}</view>
									<view class="item-main-btm">{{ item.acMajor }}</view>
								</view>
							</view>
						</view>
						<view class="school-item" v-else>没有可以匹配的学校哦~</view>
					</view>
				</view>
				<!-- 分享 -->
				<view class="share-report">
					<view class="leftsemicircle"></view>
					<view class="rightsemicircle"></view>
					<button type="default" @click="downCanvsImg">保存</button>
				</view>
			</view>
		</view>

		<!-- 会员版 -->
		<view class="reportpro" v-else>
			<view class="content_top">
				<view class="leftsemicircle"></view>
				<view class="rightsemicircle"></view>
				<view class="user-img"><image :src="bgurl"></image></view>

				<view class="university">
					<text>{{ nickName }}的性格评估</text>
				</view>
			</view>
			<!-- content -->
			<view class="reportpro__content">
				<view class="reportpro__content__title">综合得分</view>
				<view class="reportpro__content__nums">{{ Math.round(baogaoinfo.overAllScore) }}</view>
				<view class="reportpro__content__text">继续努力呀~</view>
				<view class="reportpro__content__sug" v-if="permissions === '1'">
					<view class="sug-title">学习时机</view>
					<view class="sug-text">{{ studyTime }}</view>
					<view class="sug-title">整体印象</view>
					<view class="sug-text">{{ studyImpress }}</view>
				</view>
			</view>
			<!-- 分享 -->
			<view class="share-report">
				<view class="leftsemicircle"></view>
				<view class="rightsemicircle"></view>
				<button type="default" open-type="share">分享</button>
			</view>
			<!-- more -->
			<view class="reportpro__more">
				<button type="default" @click="upgrade" v-if="platform !== 'ios'">{{ permissions === '1' ? '升级专业版查看更多' : '升级查看更多' }}</button>
			</view>
		</view>
		<!-- <button type="default" @click="downCanvsImg2">渲染页面</button> -->
		<xWxmlToCanvas ref="xWxmlToCanvas" :hide="true" :width="322" :height="800" :xStyle="style" :xWxml="wxml"></xWxmlToCanvas>
		<xWxmlToCanvas ref="xWxmlToCanvas2" :hide="true" :width="322" :height="mainheight" :xStyle="style" :xWxml="wxml2"></xWxmlToCanvas>
	</view>
</template>

<script>
import { getReportByAskStudyCurve } from '../../../api/api.js';
import xWxmlToCanvas from '../../components/x-wxml-to-canvas/x-wxml-to-canvas';
import zwzHint from '../../components/zwz-hint/zwz-hint.vue'
export default {
	components: {
		xWxmlToCanvas,
		zwzHint
	},
	data() {
		return {
			src: '',
			wxml: '',
			wxml2: '',
			style: '',
			//适配手机高度
			phoneHeight: 0,
			//测试的结果对象
			pingce: [],
			// 体验版的状态
			isTiyan: false,
			// 微信头像
			bgurl: '',
			//微信名字
			nickName: '',
			turenum: '4',
			falsenum: '6',
			score: '0',
			permissions: '0',
			reportData: [],
			chartsData: {},
			baogaoinfo: '',
			showChong: false,
			showWeng: false,
			showBao: false,
			showTextList: [],
			suggestList: '',
			// 学习建议
			studySuggests: '',
			// 学习时机
			studyTime: '',
			// 整体印象
			studyImpress: '',
			// 专业建议
			suitAbleMajor: '',
			// 心理测试
			psychologicalTest: '',
			// 学习曲线图
			studyCurveChartsData: '',
			postData: '',
			congHtml: '',
			wengHtml: '',
			baoHtml: '',
			// 生成图片高度
			mainheight: 120,
			platform: ''
		};
	},
	onLoad() {
		// 判断ios
		if(uni.getSystemInfoSync().platform == 'ios') {
			this.platform = 'ios'
		}
		// 查看用户身份0普通，1会员，2专业会员
		this.permissions = uni.getStorageSync('huiyuan').type;
		console.log('permissions', this.permissions);
		// 获取上一个页面的信息
		uni.$on('baogao', res => {
			this.baogaoinfo = res;
			this.suggestList = res.haomai[1].childAskstudydiagnosiscatalogs;
			this.studySuggests = res.haomai[0].childAskstudydiagnosiscatalogs[0].askstudydiatoselects;
			// 学习时机
			this.studyTime = res.haomai[0].childAskstudydiagnosiscatalogs[1].askstudydiatoselects[0].asdsName;
			// 整体印象
			this.studyImpress = res.haomai[0].childAskstudydiagnosiscatalogs[2].askstudydiatoselects[0].asdsName;
			this.chartsData = res.chartsData;
			this.suitAbleMajor = res.suitAbleMajor;
			this.psychologicalTest = res.haomai[5].childAskstudydiagnosiscatalogs[0].askstudydiatoselects;
			this.postData = res.postData;
			console.log('接受成功', res);
			console.log('this.postData', this.postData);
		});
		uni.$emit('need');
		// 折线图数据
		console.log('发送请求了');
		getReportByAskStudyCurve(this.postData).then(res => {
			console.log('zzslj', res);
			this.studyCurveChartsData = res.data.studyCurveChartsData;
		});
		// 数据显示
		for (let i = 0; i < this.chartsData.categories.length; i++) {
			let dataNums = this.chartsData.series[0].data[i] / 100;
			this.reportData.push({
				title: this.chartsData.categories[i],
				data: Math.round(dataNums * 100) / 100
			});
		}
		// 获取用户信息
		let userinfo = uni.getStorageSync('userinfo');
		console.log('userinfo', userinfo);
		this.bgurl = userinfo.avatarUrl;
		this.nickName = userinfo.nickName;
		// 推荐学校html生成
		this.getSchoolItem();
		// 生成canvs htlm
		this.getWindowHeight();
	},
	onUnload() {
		// 移除监听事件，防止重复监听
		uni.$off('baogao');
	},
	methods: {
		//获取窗口高度，适配手机
		getWindowHeight() {
			const nums = Math.round(this.baogaoinfo.overAllScore);
			this.wxml = `<view class="container">
			<view class="title"><image class="img" src="${this.bgurl}" mode="widthFix"></image><text class="wraptext">${this.nickName}的性格评估</text></view>
			<view class="wrap">
				<text class="comtext">综合得分</text>
			</view>
			<view><text class="numstext">${nums}</text></view>
			<view class="chartsdata">
				<view class="minicircle"></view>
				<text class="datatitle">${this.reportData[0].title}得分:</text>
				<text class="datanum">${this.reportData[0].data}</text>
			</view>
			<view class="chartsdata">
				<view class="minicircle"></view>
				<text class="datatitle">${this.reportData[1].title}得分:</text>
				<text class="datanum">${this.reportData[1].data}</text>
			</view>
			<view class="chartsdata">
				<view class="minicircle"></view>
				<text class="datatitle">${this.reportData[2].title}得分:</text>
				<text class="datanum">${this.reportData[2].data}</text>
			</view>
			<view class="chartsdata">
				<view class="minicircle"></view>
				<text class="datatitle">${this.reportData[3].title}得分:</text>
				<text class="datanum">${this.reportData[3].data}</text>
			</view>
			<view class="wrap">
				<text class="comtext">心理测试结果</text>
			</view>
			<text class="contentext">${this.psychologicalTest[0].asdsName}</text>
			<view class="wrap">
				<text class="comtext">学习建议</text>
			</view>
			<text class="item">${this.studySuggests[0].asdsName}</text>
			<view class="wrap">
				<text class="comtext">专业建议</text>
			</view>
			<text class="item">${this.suitAbleMajor[0]}</text>
			<text class="item">${this.suitAbleMajor[1]}</text>
			<text class="item">${this.suitAbleMajor[2]}</text>
			<text class="item">${this.suitAbleMajor[3]}</text>
			<view class="wrap">
				<text class="comtext">${this.suggestList[0].asdcTitle}</text>
			</view>
			<text class="item">${this.suggestList[0].askstudydiatoselects[0].asdsName}</text>
			<view class="wrap">
				<text class="comtext">${this.suggestList[1].asdcTitle}</text>
			</view>
			<text class="item">${this.suggestList[1].askstudydiatoselects[0].asdsName}</text>
			<view class="wrap">
				<text class="comtext">${this.suggestList[2].asdcTitle}</text>
			</view>
			<text class="item">${this.suggestList[2].askstudydiatoselects[0].asdsName}</text>
			<view class="wrap">
				<text class="comtext">${this.suggestList[3].asdcTitle}</text>
			</view>
			<text class="item">${this.suggestList[3].askstudydiatoselects[0].asdsName}</text>
			
		</view>`;
			this.wxml2 = `<view class="container2"><view class="wrap">
				<text class="comtext">冲刺学校</text>
			</view>
			${this.congHtml}
			<view class="wrap">
				<text class="comtext">重点学校</text>
			</view>
			${this.wengHtml}
			<view class="wrap">
				<text class="comtext">保底学校</text>
			</view>
			${this.baoHtml}</view>`;

			/* const mainheight = 1200; */
			const textlength = this.psychologicalTest[0].asdsName.length;
			const psyheight = Math.ceil(textlength / 17) * 15;
			console.log('psyheight', psyheight);
			this.style = {
				container: {
					width: 322,
					height: 800,
					backgroundColor: '#fff',
					borderRadius: 20,
					padding: 20
				},
				container2: {
					width: 322,
					height: this.mainheight,
					backgroundColor: '#fff',
					borderRadius: 20,
					padding: 20
				},
				title: {
					flexDirection: 'row'
				},
				img: {
					width: 30,
					height: 30
				},
				wraptext: {
					width: 100,
					height: 13,
					fontSize: 13,
					marginLeft: 10,
					marginTop: 9
				},
				wrap: {
					width: 322,
					height: 17,
					flexDirection: 'row',
					justifyContent: 'center',
					marginTop: 5,
					marginBottom: 5
				},
				comtext: {
					width: 71,
					height: 17,
					fontSize: 17,
					color: '#6E7580'
				},
				numstext: {
					width: 322,
					height: 50,
					fontSize: 50,
					fontWeight: 400,
					color: '#FBBE4B',
					textAlign: 'center'
				},
				chartsdata: {
					marginTop: 15,
					flexDirection: 'row'
				},
				minicircle: {
					width: 13,
					height: 13,
					backgroundColor: '#57b5ed',
					borderRadius: 7
				},
				datatitle: {
					width: 90,
					height: 13,
					fontSize: 13,
					marginLeft: 10,
					color: '#a9afb8'
				},
				datanum: {
					width: 60,
					height: 13,
					fontSize: 13,
					marginLeft: 10,
					color: '#57b5ed'
				},
				contentext: {
					color: '#273253',
					marginTop: 5,

					width: 272,
					height: psyheight,
					fontSize: 15,
					letterSpacing: 1,
					overflow: 'hidden'
				},
				item: {
					color: '#273253',
					width: 282,
					height: 15,
					fontSize: 15,
					letterSpacing: 1,
					overflow: 'hidden',
					marginBottom: 10
				},
				schoolitem: {
					width: 282,
					height: 40,
					marginTop: 10
				},
				schoolitemtop: {
					width: 282,
					height: 30,
					flexDirection: 'row'
				},
				img2: {
					width: 30,
					height: 30
				},
				schooltext: {
					width: 242,
					height: 30,
					marginLeft: 10,
					overflow: 'hidden',
					fontSize: 15
				},
				schoolitembtm: {
					width: 242,
					height: 10,
					marginLeft: 40,
					/* marginTop: 10, */
					fontSize: 10
				}
			};
			/* console.log('this.wxml', this.wxml); */
		},
		// 生成学校itemHtml
		setItemHtml(url, school, major) {
			const itemHtml = `<view class="schoolitem">
				<view class="schoolitemtop">
					
				    <text class="schooltext">${school}</text>
				</view>
				<view>
					 <text class="schoolitembtm">${major}</text>
				</view>
			</view>`;
			return itemHtml;
		},
		// 循环遍历学校item
		getSchoolItem() {
			if (this.baogaoinfo.xuexiao.cong.length > 0) {
				for (let i = 0; i < this.baogaoinfo.xuexiao.cong.length; i++) {
					const url = this.baogaoinfo.xuexiao.cong[i].acPrep4;
					const school = this.baogaoinfo.xuexiao.cong[i].acName;
					const major = this.baogaoinfo.xuexiao.cong[i].acMajor;
					this.mainheight = this.mainheight + 50;
					this.congHtml = this.congHtml + this.setItemHtml(url, school, major);
				}
			} else {
				this.congHtml = `<text class="item">没有匹配的学校~</text>`;
			}
			if (this.baogaoinfo.xuexiao.weng.length > 0) {
				for (let i = 0; i < this.baogaoinfo.xuexiao.weng.length; i++) {
					const url = this.baogaoinfo.xuexiao.weng[i].acPrep4;
					const school = this.baogaoinfo.xuexiao.weng[i].acName;
					const major = this.baogaoinfo.xuexiao.weng[i].acMajor;
					this.mainheight = this.mainheight + 50;
					this.wengHtml = this.wengHtml + this.setItemHtml(url, school, major);
				}
			} else {
				this.wengHtml = `<text class="item">没有匹配的学校~</text>`;
			}
			if (this.baogaoinfo.xuexiao.bao.length > 0) {
				for (let i = 0; i < this.baogaoinfo.xuexiao.bao.length; i++) {
					const url = this.baogaoinfo.xuexiao.bao[i].acPrep4;
					const school = this.baogaoinfo.xuexiao.bao[i].acName;
					const major = this.baogaoinfo.xuexiao.bao[i].acMajor;
					this.mainheight = this.mainheight + 50;
					this.baoHtml = this.baoHtml + this.setItemHtml(url, school, major);
				}
			} else {
				this.baoHtml = `<text class="item">没有匹配的学校~</text>`;
			}
		},
		// 渲染canvs
		renderToCanvas() {
			this.$refs.xWxmlToCanvas.renderToCanvas();
		},
		// 保存图片
		downCanvsImg() {
			// 渲染canvs
			this.$refs.xWxmlToCanvas.renderToCanvas();
			// 弹出提示框
			uni.showLoading({
				mask: true,
				title: '图片保存中'
			});
			setTimeout(() => {
				// 生成图片地址
				this.$refs.xWxmlToCanvas
					.canvasToTempFilePath()
					.then(res => {
						this.src = res;
						console.log('src', this.src);
						// 保存图片
						this.loadImage(this.src);
						/* this.downCanvsImg2(); */
					})
					.catch(res => {
						uni.hideLoading();
						console.log('失败了', res);
						uni.showToast({
							title: '保存失败！',
							duration: 2000
						});
					});
			}, 500);
		},
		downCanvsImg2() {
			// 渲染canvs
			this.$refs.xWxmlToCanvas2.renderToCanvas();
			// 弹出提示框
			uni.showLoading({
				mask: true,
				title: '图片保存中'
			});
			setTimeout(() => {
				// 生成图片地址
				this.$refs.xWxmlToCanvas2
					.canvasToTempFilePath()
					.then(res => {
						const src2 = res;
						console.log('src2', src2);
						// 保存图片
						this.loadImage(src2, true);
					})
					.catch(res => {
						uni.hideLoading();
						console.log('失败了', res);
						uni.showToast({
							title: '保存失败！',
							duration: 2000
						});
					});
			}, 500);
		},
		// 保存图片到系统
		loadImage(url, cover) {
			uni.saveImageToPhotosAlbum({
				filePath: url,
				success: function() {
					if (cover) {
						uni.hideLoading();
						uni.showToast({
							title: '保存成功！',
							duration: 2000
						});
					}
					console.log('save success');
				},
				fail: function() {
					uni.hideLoading();
					uni.showToast({
						title: '保存失败！',
						duration: 2000
					});
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
		upgrade() {
			uni.redirectTo({
				url: '../../../pages/huiyuanzhongxin/huiyuanzhongxin?backto=baogao'
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
		}
	}
};
</script>

<style lang="scss" scoped>
// 重新答题
.again {
	width: 643rpx;
	height: 77rpx;
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
		// 条件分享
		.suggest {
			align-self: flex-start;
			width: 100%;
			padding: 40rpx 0;
			border-bottom: 2px dotted #dadbdd;
			.suggest-item {
				padding: 0 60rpx;
				margin: 20rpx 0 0 0;
				.suggest-item-title {
					font-size: 31rpx;
					color: #57b5ed;
					font-weight: 400;
				}
				.suggest-item-check {
					color: #b0b5bd;
				}
				.suggest-item-text {
					padding: 20rpx 0;
					font-size: 27rpx;
					font-weight: 400;
					letter-spacing: 3rpx;
				}
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
				margin: 40rpx 0 40rpx 40rpx;
			}
			.school-list-check {
				color: #b0b5bd;
			}
			.school-item {
				display: flex;
				width: 566rpx;
				margin-left: 60rpx;
				padding: 20rpx 0 30rpx 0;
				border-bottom: 1px solid #dadbdd;
				.item-img {
					width: 40px;
					height: 40px;
					flex-shrink: 0;
					border-radius: 50%;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.item-main {
					flex-grow: 1;
					margin-left: 30rpx;
					.item-main-top {
						height: 35px;
						width: 315rpx;
						line-height: 35px;
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
			}
		}
	}
}
// 会员版
.reportpro {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 40rpx;
	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 643rpx;
		height: 830rpx;
		background-color: #ffffff;
		&__title {
			width: 142rpx;
			height: 48rpx;
			margin-top: 18rpx;
			font-size: 35rpx;
			font-weight: 400;
			line-height: 48rpx;
			color: #6e7580;
		}
		&__nums {
			width: 507rpx;
			height: 177rpx;
			margin-top: 90rpx;
			font-size: 173rpx;
			text-align: center;
			font-weight: 400;
			line-height: 177rpx;
			color: #fbbe4b;
			letter-spacing: 7rpx;
		}
		&__text {
			width: 157rpx;
			height: 38rpx;
			margin-top: 8rpx;
			margin-bottom: 86rpx;
			font-size: 27rpx;
			font-weight: 400;
			line-height: 38rpx;
			color: #f4e9da;
		}
		&__sug {
			width: 567rpx;
			height: 377rpx;
			border-top: 2px dotted #dadbdd;
			.sug-title {
				height: 48rpx;
				margin-top: 67rpx;
				font-size: 35rpx;
				font-weight: 400;
				line-height: 42rpx;
				color: #a9afb8;
				letter-spacing: 7rpx;
			}
			.sug-text {
				width: 567rpx;
				height: 42rpx;
				font-size: 31rpx;
				text-align: center;
				font-weight: 400;
				line-height: 42rpx;
				color: #273253;
				letter-spacing: 3rpx;
			}
		}
		.leftsemicircle1 {
			// background-color: #F0F0F0;
			position: absolute;
			background-color: #f0f0f0;
			height: 40rpx;
			width: 40rpx;
			border-radius: 20rpx;
			margin-top: -150rpx;
			margin-left: 650rpx;
		}
		.rightsemicircle1 {
			position: absolute;
			background-color: #f0f0f0;
			height: 40rpx;
			width: 40rpx;
			border-radius: 20rpx;
			margin-top: -150rpx;
			margin-left: -20rpx;
		}
	}
	&__more {
		button {
			width: 628rpx;
			height: 84rpx;
			margin-top: 48rpx;
			background: #fbbe4b;
			opacity: 1;
			border-radius: 46rpx;
			line-height: 84rpx;
			color: #ffffff;
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
		height: 58rpx;
		width: 245rpx;
		line-height: 58rpx;
		color: #ffffff;
		background-color: #57b5ed;
		border-radius: 46rpx;
	}
}
</style>
