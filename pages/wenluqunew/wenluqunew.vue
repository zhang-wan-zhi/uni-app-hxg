<template>
  <view class="enroll">
    <!-- 问校考 -->
    <view class="examination">
      <view class="enroll__card">
        <image src="../../static/img/wenxiaokao.png"></image>
        <view class="center-text">
          <view class="title-en">xiaokao</view>
          <view class="title-center">问概率</view>
          <view class="title-btm">专业分析</view>
        </view>
        <view class="center-btn" @click="handProbability">
          <view class="iconfont icon-iconfontjiantou2"></view>
        </view>
      </view>
    </view>
    <!-- 问录取 -->
    <view class="ques-enroll">
      <view class="enroll__card">
        <image src="../../static/img/wenluqu.png"></image>
        <view class="center-text">
          <view class="title-en">luquba</view>
          <view class="title-center">问报考</view>
          <view class="title-btm">专业分析</view>
        </view>
        <view class="center-btn" @click="handEnroll">
           <view class="iconfont icon-iconfontjiantou2"></view>
        </view>
      </view>
      <!-- <view class="enroll-btn" v-if="isShowBtn">
        <view class="btn1" @click="handProbability">问概率</view>
        <view class="btn1 btn2" @click="handEnroll">问报考</view>
      </view> -->
    </view>
  </view>
</template>

<script>
export default {
	data() {
		return {
			isShowBtn: false
		};
	},
	methods: {
		// 问报考
		handEnroll() {
			let openid = uni.getStorageSync("openid");
			if (!openid) {
			  uni.navigateTo({
			    url: "../index/index",
			  });
			  return
			}
			uni.showModal({
			    title: '提示',
			    content: '统考是否过线？',
			    success: function (res) {
			        if (res.confirm) {
			            uni.navigateTo({
			                url: '../../myPackageA/pages/wenluqu_baokao/wenluqu_baokao'
			            });
			        } else if (res.cancel) {
			            uni.showToast({
			                title: '需要统考过线，才可以报考。',
			                duration: 2000,
							icon: 'none'
			            });
			        }
			    }
			});
			
			/* uni.navigateTo({
			    url: '../../myPackageA/pages/xinggepinggu2/xinggepinggu2?page=2'
			}); */
		},
		// 问校考
		handExamination() {
			let openid = uni.getStorageSync("openid");
			if (!openid) {
			  uni.navigateTo({
			    url: "../index/index",
			  });
			  return
			}
			uni.navigateTo({
			    url: '../../myPackageA/pages/xinggepinggu2/xinggepinggu2?page=2'
			});
		},
		// 问概率
		handProbability() {
			let openid = uni.getStorageSync("openid");
			if (!openid) {
			  uni.navigateTo({
			    url: "../index/index",
			  });
			  return
			}
			uni.navigateTo({
			    url: '../../myPackageA/pages/wengailv/wengailv'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../style/iconfont.css";
.enroll {
  width: 100vw;
  height: 100vh;
  padding: 80rpx 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #f4f4f4;
}
// 问校考

// 问录取

// 卡片公共样式
.enroll__card {
  position: relative;
  width: 595rpx;
  height: 340rpx;
  background: #ffffff;
  border-radius: 58rpx;
  image {
    position: absolute;
    bottom: 150rpx;
    right: 0rpx;
    width: 418rpx;
    height: 320rpx;
  }
  .center-text {
    position: absolute;
    bottom: 36rpx;
    left: 50rpx;
    .title-en {
      width: 173rpx;
      height: 38rpx;
      font-size: 27rpx;
      font-weight: 300;
      line-height: 38rpx;
      color: #eaeaea;
    }
    .title-center {
      width: 163rpx;
      height: 63rpx;
      font-size: 46rpx;
      font-weight: 400;
      line-height: 63rpx;
      color: #273253;
    }
    .title-btm {
      width: 173rpx;
      height: 38rpx;
      font-size: 27rpx;
      font-weight: 300;
      line-height: 38rpx;
      color: #273253;
    }
  }
  .center-btn {
    position: absolute;

    right: 50rpx;
    bottom: 23rpx;
    width: 92rpx;
    height: 92rpx;
    text-align: center;
    line-height: 92rpx;
    font-size: 54rpx;
    color: #fff;
    background: linear-gradient(270deg, #fe7938 0%, #ed5c4d 100%);
    border-radius: 50%;
  }
}
// 按钮
.enroll-btn {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 10rpx;

  .btn1 {
    width: 200rpx;
    height: 78rpx;
    background: #ed5c4d;
    border-radius: 15rpx;
    font-size: 35rpx;
    color: #ffffff;
    text-align: center;
    line-height: 78rpx;
    font-weight: 400;
  }
  .btn2 {
    background: #fffefe;
    color: #000000;
  }
}
.enroll-btn-emy {
  width: 200rpx;
  height: 118rpx;
}
</style>
