<template>
	<view class="wenluqu_submited" :style="{height:phoneHeight+'px;'}">
		<view class="leftsemicircle">
		</view>
		<view class="rightsemicircle">
		</view>
		<view class="content_top">
			<view class="user-img">
				<image src="../../static/img/hubeimeishu.jpg"></image>
				</view>
			<view class="university">
				<text>{{Objs.acName}}</text>
			</view>
		</view>
		<view class="content_center">
			<view class="content_center_top">
				<view class="content_center_3">
					2018年造型艺术总分240（满分300分）
				</view>
				<view class="content_center_2">
					2019年造型艺术总分238（满分300分）
				</view>
				<view class="content_center_1">
					2020年造型艺术总分246（满分300分）
				</view>
				
			</view>
			<view class="content_center_bottom">
				<view class="content_center_bottom_head">
					录取概率
				</view>
				<view class="content_center_bottom_head2">
					{{Objs.stableProp}}%
				</view>
				<view class="content_center_bottom_foot">
					升级专业立即一对一名师交流
					<hr style=" margin-left:-78rpx; width: 590rpx; height:2rpx;border:none;border-top:1px dotted #DADBDD;" />
				</view>
				
				<view class="content_center_bottom_share">
					<button style="height: 60rpx;width: 240rpx;line-height: 60rpx; color: #FFFFFF;background-color: #57B5ED;border-radius:20px ;" type="default">分享</button>
				</view>	
				
			</view>
			<view class="content_bottom">
				<button style="width: 654rpx;height: 88rpx;background: #FBBE4B;opacity: 1;border-radius: 24px;color: #FFFFFF;" @click="backTo">返回</button>
			</view>
		</view>
		<view class="leftsemicircle1">
		</view>
		<view class="rightsemicircle1">
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//适配手机高度
				phoneHeight:0,
				//测试的结果对象
				Objs:{},
				// 体验版的状态
				isTiyan:false,
				nickName:'',
				bgurl:''
			}
		},
		onLoad(objs) {
			let arrs=uni.getStorageSync('wenluqu_lists');
			// console.log(arrs);
			let userData=uni.getStorageSync('userData');
			this.bgurl = userData.userInfo.avatarUrl;
			this.nickName = userData.userInfo.nickName;
			this.Objs=arrs[0];
		    this.Objs.stableProp=this.Objs.stableProp.toFixed(2);
			// console.log(this.Objs.acCode);
			// console.log(this.Objs.stableProp);
			this.getWindowHeight();
		},
		methods:{
			//点击体验版触发
			click_tiyan(){
				console.log(111);
				this.isTiyan=true;
			},
			//获取窗口高度，适配手机
			getWindowHeight(){
				uni.getSystemInfo({
					success:(res)=>{
						// console.log(res);
						// console.log("手机可用高度:"+res.windowHeight*2+"rpx");
						this.phoneHeight=res.windowHeight;
						// console.log(res.windowHeight);
						// console.log(this.phoneHeight);
						// this.$store.commit('set_window_height',res.windowHeight*2);
					}
				})
			},
			backTo(){
				uni.reLaunch({
				            // url: 'test?id=1&name=uniapp'  c传递参数
				
				            url:"/pages/shouye/shouye"
				
				        })
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wenluqu_submited{
		width:750rpx;
		height:1454rpx;
		padding-top:92rpx;
		padding-left:40rpx;
		padding-right: 40rpx;
		background-color: #F0F0F0;
		.leftsemicircle{
			// background-color: #F0F0F0;
			position: absolute;
			background-color: #F0F0F0;
			height: 40rpx;
			width: 40rpx;
			border-radius: 20rpx;
			margin-left: 650rpx;
			margin-top: 130rpx;
		}
		.rightsemicircle{
			position: absolute;
			background-color: #F0F0F0;
			height: 40rpx;
			width: 40rpx;
			border-radius: 20rpx;
			margin-top: 130rpx;
			margin-left: -20rpx;
		}
		.content_top{
			width: 670rpx;
			height: 152rpx;
			display: flex;
			background-color: #f6f7fb;
			justify-content: center;
			align-items: center;
			.user-img {
				width: 80rpx;
				height: 80rpx;
				margin-right: 32rpx;
				// border: 2rpx solid #ed5c4d;
				border-radius: 40rpx;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.university{
				color:#273253 ;
				height: 40rpx;
				font-size: 36rpx;
				font-weight: bold;
				line-height: 40rpx;
			}
			
			
			
		}
		.content_center{
			height: 776rpx;
			width: 670rpx;
			background-color:#FFFFFF ;
			.content_center_top{
				border: 1px solid #FFFFFF;
				.content_center_3{
					width: 630rpx;
					height: 40rpx;
					margin-left: 40rpx;
					margin-top: 74rpx;
					color: #273253;
				}
				.content_center_2{
					width: 630rpx;
					height: 40rpx;
					margin-left: 40rpx;
					margin-top: 20rpx;
					color: #273253;
				}
				.content_center_1{
					width: 630rpx;
					height: 40rpx;
					margin-left: 40rpx;
					margin-top: 20rpx;
					color: #273253;
				}
			}
			.content_center_bottom{
				width: 670rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				// border: 1px solid red;
				.content_center_bottom_head{
					margin-top: 80rpx;
					height: 50rpx;
					width:148rpx ;
					text-align: center;
					color: #ED5C4D;
				}
				.content_center_bottom_head2{
					height: 170rpx;
					width: 528rpx;
					color: #FBBE4B;
					font-size: 140rpx;
					text-align: center;
				}
				.content_center_bottom_foot{
					width: 432rpx ;
					height: 44rpx ;
					font-size: 32rpx;
					font-family: '.PingFang SC';
					margin-top: 65rpx;
					font-weight: 400;
					line-height: 44rpx;
					color: #FCD58C;
				}
				.content_center_bottom_share{
					width: 240rpx;
					height: 60px;
					margin-top: 52rpx;
					
				}
			
			}
			.content_bottom{
				margin-top:10rpx;
			}
		}
		.leftsemicircle1{
			// background-color: #F0F0F0;
			position: absolute;
			background-color: #F0F0F0;
			height: 40rpx;
			width: 40rpx;
			border-radius: 20rpx;
			margin-top: -150rpx;
			margin-left: 650rpx;
		}
		.rightsemicircle1{
			position: absolute;
			background-color: #F0F0F0;
			height: 40rpx;
			width: 40rpx;
			border-radius: 20rpx;
			margin-top: -150rpx;
			margin-left: -20rpx;
		}
	}
	
</style>
