<template>
	<view class="opinion-box">
		<view class="opinion">
			<textarea type="text" :placeholder="placeholders" v-model="textAreaValue" class="content" @focus="getFocus" @blur="getBlur" placeholder-style="color:#bbb;"></textarea>
			<uni-file-picker
				fileMediatype="image"
				mode="grid"
				@progress="progress"
				@success="uploadSuccess"
				@fail="fail"
				@delete="deleteImg"
				limit="3"
				:image-styles="imageStyles"
			/>
		</view>
		<view class="type">
			<view class="title">选择要反馈的类型</view>
			<view class="type-item">
				<view class="item-box" v-for="(item, index) in typeList" :key="index" @click="check(index)">
					<view class="radio" :class="{ checked: index === currentIndex }"></view>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>

		<view class="submit" @click="submits">提交</view>
	</view>
</template>

<script>
import { Yijianfankui,uploadPicture } from '../../api/api.js';
export default {
	data() {
		return {
			placeholders: '请输入您想反馈的问题....',
			textAreaValue: '',
			// 图片列表
			imageList: [],
			uploadImg:['','',''],
			imageStyles: {
				width: 100,
				height: 100,
				backgroundColor: '#F8D5D2',
				border: {
					color: '#F8D5D2',
					width: 1,
					style: 'solid',
					radius: '6px'
				}
			},
			currentIndex: -1,
			checkedType: '',
			typeList: [
				{
					value: 1,
					name: '程序bug'
				},
				{
					value: 2,
					name: '内容意见'
				},
				{
					value: 3,
					name: '功能意见'
				},
				{
					value: 4,
					name: '举报'
				},
				{
					value: 5,
					name: '其他'
				}
			]
		};
	},
	methods: {
		submits() {
			// 把图片取出来
			this.imageList.forEach((item,index)=>{
				this.uploadImg[index]=item.url;
			})
			let img1=this.uploadImg[0];
			let img2=this.uploadImg[1];
			let img3=this.uploadImg[2];
			let opOpenid = uni.getStorageSync('openid');
			let opContent = this.textAreaValue;
			let opType=this.checkedType;
			//如果没有登录
			if (!opOpenid) {
				uni.showToast({
					title: '请先登录!',
					icon: 'none',
					duration: 2000
				});
			} else {
				//如果输入的意见为空
				if (opContent.trim() === ''|| opType=='') {
					uni.showToast({
						title: '未输入意见或选择类型',
						icon: 'none',
						duration: 2000
					});

				} else {
					Yijianfankui(opOpenid, opContent,opType,img1,img2,img3).then(res => {
						 console.log(res.data.code);
						if (res.data.code == 200) {
							uni.redirectTo({
								url: '../yijianFangkuiSuccess/yijianFangkuiSuccess'
							});
						}
					});
				}
			}
		},
		//点击输入框，获得焦点时
		getFocus() {
			this.placeholders = '';
		},
		//点击输入框，失去焦点时
		getBlur() {
			this.placeholders = '请输入您想反馈的问题....';
		},
		// 图片上传成功时
		uploadSuccess(e) {
			console.log('e:',e)
			const filePaths = e.tempFiles[0].image.location;
			const fileName = e.tempFiles[0].name;
			      uploadPicture(filePaths)
					.then((res)=>{
					 res=JSON.parse(res.data)
					 console.log(res);
					 let obj={};
					 obj.url=res.path;
					 obj.name=fileName;
					 this.imageList.push(obj);
					 console.log(this.imageList)
					}).catch(res=>{
						uni.showToast({
							title: '图片上传失败',
							icon: 'none',
							duration: 2000
						});
					})
		},
		// 删除图片时
		deleteImg(e) {
			let name=e.tempFile.name;
			let index=this.imageList.findIndex((item,index)=>{
				return item.fileName=name;
			})
			// console.log(index)
			this.imageList.splice(index,1);
		},
		// 点击选择类型时
		check(index) {
			this.currentIndex = index;
			this.checkedType = this.typeList[index].value;
			console.log(this.checkedType);
		},
	}
};
</script>

<style lang="scss" scoped>
.opinion-box {
	width: 100%;
	padding: 30rpx 40rpx;
}
.opinion {
	width: 100%;
	padding: 40rpx;
	min-height: 500rpx;
	background: #ffffff;
	border-radius: 8px;
}
.content {
	width: 100%;
	min-height: 200rpx;
	margin-bottom: 30rpx;
}
// 选择类型
.type {
	width: 100%;
}
.type .title {
	height: 44rpx;
	margin-top: 40rpx;
	margin-bottom: 20rpx;
	font-size: 16px;
	font-weight: 400;
	line-height: 22px;
	color: #6e7580;
}
.type-item {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}

.item-box {
	display: flex;
	align-items: center;
	width: 33%;
	height: 80rpx;
}

.radio {
	width: 28rpx;
	height: 28rpx;
	margin: 4rpx 10rpx 0px 0px;
	border: 1px solid #ed5c4d;
	border-radius: 50%;
}
.checked {
	background: #ed5c4d;
}
.submit {
	width: 600rpx;
	height: 88rpx;
	margin: 200rpx auto 0rpx;
	text-align: center;
	line-height: 88rpx;
	background: #ed5c4d;
	border-radius: 24px;
	font-size: 18px;
	font-weight: 400;
	color: #ffffff;
	letter-spacing: 5px;
}
</style>
