<template>
	<view class="box" >
		<view class="logo"><image src="../../static/img/qzys_logo.png"></image></view>

		<view class="name">掐指艺算</view>

		<view class="introduce">
			掐指艺算诞生于2010年，是一家专业从事幼儿大脑潜能开发和艺术性培养的民办教育机构和教育实体。该机构强调以儿童理想发展为中心，强调全员参与的、全过程的、面向全体的全面教育，并以实现群体儿童理想发展为目标，这也是宋群校长近十年来研究教育成果的集中体现。
		</view>
		<view class="bg-logo">
			
		</view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>

   .box{
	   position: absolute;
	   width: 100%;
	   min-height: 600px;
	   overflow: hidden;
   }


	.logo{
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 200rpx;
		image{
			width: 136rpx;
			height: 136rpx;
			border-radius: 16rpx;
		}
	}
	.name{
		width: 100%;
		height: 50rpx;
		margin-top: 30rpx;
		font-size: 16px;
		font-weight: 400;
		line-height: 50rpx;
		text-align: center;
		color: #273253;
	}
	.introduce{
		width: 600rpx;
		margin: 50rpx auto 0rpx;
		font-size: 28rpx;
		text-indent: 2em;
		line-height: 50rpx;
	}
   .bg-logo{
	   position: absolute;
	   bottom: 0px;
	   left: 0px;
	   width: 100%;
	   height: 676rpx;
	   background: url(../../static/img/my/bgLogo.png) no-repeat bottom center;
	   background-size: 100%;
	   opacity: 0.2;
   }
</style>
