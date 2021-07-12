<template>
	<view>
		<view class="content_contents" :style="{height:phoneHeight*0.62+'px;'}">
					<view class="content_content"  @click="yikaoDongtai" :style="{height:phoneHeight*0.15+'px;'}">
						<view class="content_content1">
							<view class="content_content1_left">
								<view class="content_content1_left_top">重磅 | 央美公布复试成绩及合格线！快
		看你过线没？！</view>
								<view class="content_content1_left_bottom">
									<view class="content_content1_left_bottom1">清华大学</view>
									<view class="content_content1_left_bottom2">2021.04.02</view>
								</view>
							</view>
							<view class="content_content1_right">
								<image src="../../static/img/yikaodongtai_img1.png"></image>
							</view>
						</view>
					</view>
					
					<view class="content_content" :style="{height:phoneHeight*0.15+'px;'}">
						<view class="content_content1">
							<view class="content_content1_left">
								<view class="content_content1_left_top">速看！新高考方案公布！时间延长、分
		值改变、投档志愿均要改革！</view>
								<view class="content_content1_left_bottom">
									<view class="content_content1_left_bottom1">北京大学</view>
									<view class="content_content1_left_bottom2">2021.04.02</view>
								</view>
							</view>
							<view class="content_content1_right">
								<image src="../../static/img/yikaodongtai_img2.png"></image>
							</view>
						</view>
					</view>
					
					<view class="content_content" :style="{height:phoneHeight*0.15+'px;'}">
						<view class="content_content1">
							<view class="content_content1_left">
								<view class="content_content1_left_top">艺术类院校专业实力分析，你适合考哪
		所学校！</view>
								<view class="content_content1_left_bottom">
									<view class="content_content1_left_bottom1">复旦大学</view>
									<view class="content_content1_left_bottom2">2021.04.02</view>
								</view>
							</view>
							<view class="content_content1_right">
								<image src="../../static/img/yikaodongtai_img3.png"></image>
							</view>
						</view>
					</view>
					
					<view class="content_content" :style="{height:phoneHeight*0.15+'px;'}">
						<view class="content_content1">
							<view class="content_content1_left">
								<view class="content_content1_left_top">多省公布2021年联考合格线，赶紧看看
		过线没！附各省成绩查询时间和地址！</view>
								<view class="content_content1_left_bottom">
									<view class="content_content1_left_bottom1">浙江传媒学院</view>
									<view class="content_content1_left_bottom2">2021.04.02</view>
								</view>
							</view>
							<view class="content_content1_right">
								<image src="../../static/img/yikaodongtai_img4.png"></image>
							</view>
						</view>
					</view>
					
					<view class="see_more">
						<view class="see_more_title">查看更多</view>
					</view>
					
								
				</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//适配手机高度
				phoneHeight:0
			}
		},
		onLoad(){
			uni.getSystemInfo({
				success:(res)=>{
					// console.log(res);
					// console.log("手机可用高度:"+res.windowHeight*2+"rpx");
					this.phoneHeight=res.windowHeight;
					console.log(res.windowHeight);
					console.log(this.phoneHeight);
					// this.$store.commit('set_window_height',res.windowHeight*2);
				}
			})
		},
	}
</script>

<style lang="scss">
		.content_contents{
			width:100%;
			height:auto;
			border:1px solid green;
			.content_content{
				width:100%;
				height:150rpx;
				// border:1px solid green;
				margin-top:5rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.content_content1{
					width:90%;
					height:150rpx;
					// border:1px solid pink;
					border-bottom:1px solid #BBBBBB;
					.content_content1_left{
						width:70%;
						height:150rpx;
						// border:1px solid red;
						float:left;
						.content_content1_left_top{
							width:100%;
							height:90rpx;
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
						.content_content1_left_bottom{
							width:100%;
							height:50rpx;
							// border:1px solid blue;
							color:#9B9B9B;
							font-size:20rpx;
							.content_content1_left_bottom1{
								width:150rpx;
								height:50rpx;
								line-height:50rpx;
								text-align: left;
								float:left;
								// border:1px solid red;
							}
							.content_content1_left_bottom2{
								width:110rpx;
								height:50rpx;
								line-height:50rpx;
								text-align: right;
								float:right;
								// border:1px solid red;
							}
						}
					}
					.content_content1_right{
						width:25%;
						height:150rpx;
						margin-left:10rpx;
						// border:1px solid green;
						float:left;
						image{
							width:100%;
							height:90%;
						}
					}
				}
			}
			.see_more{
				width:100%;
				height:100rpx;
				border:1px solid pink;
				display: flex;
				align-items: center;
				justify-content: center;
				.see_more_title{
					width:150rpx;
					height:50rpx;
					// border:1px solid blue;
					text-align: center;
					border-radius: 25rpx;
					background-color: #196AD4;
					color:#fff;
					font-weight: bold;
				}
			}
			
		}
</style>
