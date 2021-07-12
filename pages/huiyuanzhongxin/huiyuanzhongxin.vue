<template>
  <view class="box">
    <!-- 轮播图区域 -->
    <view style="margin: 30rpx 0rpx;">
      <swiper :current="currentIndex" :duration="duration" @animationfinish="swierChange" previous-margin="60rpx" next-margin="40rpx" class="swiper-box">
        <swiper-item>
          <view class="professional">
            <view class="user-info">
              <image :src="userInfo.avatarUrl" class="img" v-show="memberInfo.type == 2"></image>
              <view class="detail">
                <view class="name">
                  {{ userInfo.nickName }}
                  <image src="../../static/img/my/jiangpaixunzhang1.png" v-show="memberInfo.type == 2"></image>
                </view>
                <view class="deadline" v-show="memberInfo.type == 2 || memberInfo.type == 3">会员有效期至：{{ memberInfo.deadline2 }}</view>
              </view>
            </view>
            <view class="renew" v-show="memberInfo.type == 2" @click="delay2">立即续费</view>
            <view class="renew" v-show="memberInfo.type == 3" @click="delay3">立即续费</view>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="members">
            <view class="user-info">
              <image :src="userInfo.avatarUrl" class="img"></image>
              <view class="detail">
                <view class="name">
                  {{ userInfo.nickName }}
                  <image src="../../static/img/my/jiangpaixunzhang.png" v-show="memberInfo.type == 1"></image>
                </view>
                <view class="deadline" v-show="memberInfo.type == 1 || memberInfo.type == 3">会员有效期至：{{ memberInfo.deadline1 }}</view>
              </view>
            </view>
            <view class="handle">
              <view class="renew" v-show="memberInfo.type == 1" @click="delay1">立即续费</view>
              <view class="renew" v-show="memberInfo.type == 3" @click="delay3">立即续费</view>
              <view class="renew" style="margin-left: 40rpx;" v-show="memberInfo.type == 1" @click="upgrade()">升级会员</view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 特权区域 -->
    <view class="privilege">
      <!-- 专业版特权 -->
      <view class="pro" v-show="currentIndex === 0">
        <view class="title">专业版特权</view>
        <view class="items">
          <view class="item">
            <view class="item-img">
              <image src="../../static/img/my/apinion.png" mode=""></image>
            </view>
            <text>优质建议</text>
          </view>
          <view class="item">
            <view class="item-img">
              <image src="../../static/img/my/c1.png" mode=""></image>
            </view>
            <text>专属铭牌</text>
          </view>
          <view class="item">
            <view class="item-img">
              <image src="../../static/img/my/mark.png" mode=""></image>
            </view>
            <text>资源优享</text>
          </view>
          <view class="item">
            <view class="item-img">
              <image src="../../static/img/my/face.png" mode=""></image>
            </view>
            <text>贴心交流</text>
          </view>
        </view>
        <!-- 支付 -->
        <view class="cost" @click="charge">支付99元</view>
      </view>
      <!-- 会员版特权 -->
      <view class="pro" v-show="currentIndex == 1">
        <view class="title">会员版特权</view>
        <view class="items">
          <view class="item">
            <view class="item-img">
              <image src="../../static/img/my/apinion.png" mode=""></image>
            </view>
            <text>优质建议</text>
          </view>
          <view class="item">
            <view class="item-img">
              <image src="../../static/img/my/c1.png" mode=""></image>
            </view>
            <text>专属铭牌</text>
          </view>
        </view>
        <!-- 支付 -->
        <view class="cost" @click="charge">支付9.9元</view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  userCharge,
  putongCharge,
  zhuanyeCharge,
  getCharges,
  getMemberInfo,
  getProviderInfo,
  doubleCharge,
} from "../../api/member.js";
export default {
  data() {
    return {
      // 索引代表会员类型 0 专业 1 非专业
      currentIndex: 0,
      duration: 0,
      // 会员信息
      memberInfo: {},
      // 用户信息
      userInfo: {
		  avatarUrl:'',
		  nickName:''
	  },
      //禁止轮播图滚动时用户触摸
      touch: false,
      // 专业版ID
      zhuanyeId: "",
      // 专业钱数
      zhuanyeMoney: "",
      // 普通会员id
      putongId: "",
      // 普通钱数
      putongMoney: "",
      // 续费钱数
      continueMoney: "",
      // 从哪个页面来
      backto: "",
    };
  },
  onLoad(res) {
    this.currentIndex = res.key;
    this.backto = res.backto;
    console.log("this.backto", this.backto);
    this.duration = 500;
    // 获取用户信息
    this.memberInfo = uni.getStorageSync("huiyuan");
    this.userInfo = uni.getStorageSync("userinfo");
    // 会员信息
    this.getMemberInfo();
  },
  methods: {
    // 轮播图转动时
    swierChange(obj) {
      this.touch = true;
      this.currentIndex = obj.detail.current;
      // console.log(this.currentIndex);
    },
    // 查询会员信息
    getMemberInfo() {
      // 储存会员信息
      getMemberInfo().then((res) => {
        // console.log(res);
        const type = res.data.prep2;
        const deadline1 = res.data.toTime.slice(0, 10);
        const deadline2 = res.data.majortoTime.slice(0, 10);
        this.memberInfo.type = type;
        this.memberInfo.deadline1 = deadline1;
        this.memberInfo.deadline2 = deadline2;
        uni.setStorage({
          key: "huiyuan",
          data: {
            type,
            deadline1,
            deadline2,
          },
        });
      });
      // 查询会员充值钱数
      getCharges().then((res) => {
        console.log(res);
        this.zhuanyeId = res.data[1].id;
        this.zhuanyeMoney = res.data[1].cMoney;
        this.putongId = res.data[0].id;
        this.putongMoney = res.data[0].cMoney;
        this.continueMoney = res.data[1].needMoney;
      });
    },
    // 放回上一个页面
    async backToPre() {
      let index = this.currentIndex;
      await this.getMemberInfo();
      if (this.backto == "baogao") {
        // console.log('backto', this.backto);
        uni.redirectTo({
          url: "../../myPackageA/pages/wenxuexiBaogao/wenxuexiBaogao",
        });
      }
    },
    //支付功能
    async charge() {
      // 判断是否是会员
      let type = this.memberInfo.type;
      if (type == 1 || type == 2 || type == 3) {
        uni.showToast({
          title: "你已是会员，请勿重复充值",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      // 获取充值信息
      let index = this.currentIndex;
      let money, id;
      if (index == 0) {
        money = this.zhuanyeMoney;
        id = this.zhuanyeId;
      } else {
        money = this.putongMoney;
        id = this.putongId;
      }
      // 获取充值信息
      let res = await userCharge(id, money);
      console.log(res);
      let timeStamp = res.timeStamp;
      let orderInfo = res.product_id;
      let nonceStr = res.nonceStr;
      let packages = res.package;
      let signType = res.signType;
      let paySign = res.paySign;
      //获取provider
      let provider = await getProviderInfo();
      // 调用支付接口
      let self = this;
      uni.requestPayment({
        provider,
        timeStamp,
        nonceStr,
        signType,
        paySign,
        orderInfo,
        package: packages,
        success(res) {
          console.log("成功支付了", res);
          self.backToPre();
        },
        fail(res) {
          console.log(res);
        },
      });
    },
    // 普通会员付费封装
    async putongCharge(id, money) {
      // 获取充值信息
      let res = await putongCharge(id, money);
      let timeStamp = res.timeStamp;
      let orderInfo = res.product_id;
      let nonceStr = res.nonceStr;
      let packages = res.package;
      let signType = res.signType;
      let paySign = res.paySign;
      //获取provider
      let provider = await getProviderInfo();
      // 调用支付接口
      let self = this;
      uni.requestPayment({
        provider,
        timeStamp,
        nonceStr,
        signType,
        paySign,
        orderInfo,
        package: packages,
        success(res) {
          self.backToPre();
        },
        fail(res) {
          console.log(res);
        },
      });
    },

    // 普通会员续费
    delay1() {
      let money = this.putongMoney;
      let id = this.putongId;
      this.putongCharge(id, money);
    },
    //普通会员升级
    async upgrade() {
      let money = this.continueMoney;
      let id = this.zhuanyeId;
      this.putongCharge(id, money);
    },

    // 专业会员续费
    async delay2() {
      let money = this.zhuanyeMoney;
      let id = this.zhuanyeId;
      // 获取充值信息
      let res = await zhuanyeCharge(id, money);
      let timeStamp = res.timeStamp;
      let orderInfo = res.product_id;
      let nonceStr = res.nonceStr;
      let packages = res.package;
      let signType = res.signType;
      let paySign = res.paySign;
      //获取provider
      let provider = await getProviderInfo();
      // 调用支付接口
      let that = this;
      uni.requestPayment({
        provider,
        timeStamp,
        nonceStr,
        signType,
        paySign,
        orderInfo,
        package: packages,
        success(res) {
          that.getMemberInfo();
        },
        fail(res) {
          console.log(res);
        },
      });
    },
    //双会员用户专业会员续费
    async delay3() {
      let index = this.currentIndex;
      let money, id;
      if (index == 0) {
        money = this.zhuanyeMoney;
        id = this.zhuanyeId;
      } else {
        money = this.putongMoney;
        id = this.putongId;
      }
      // 获取充值信息
      let res = await doubleCharge(id, money);
      let timeStamp = res.timeStamp;
      let orderInfo = res.product_id;
      let nonceStr = res.nonceStr;
      let packages = res.package;
      let signType = res.signType;
      let paySign = res.paySign;
      //获取provider
      let provider = await getProviderInfo();
      // 调用支付接口
      let that = this;
      uni.requestPayment({
        provider,
        timeStamp,
        nonceStr,
        signType,
        paySign,
        orderInfo,
        package: packages,
        success(res) {
          that.getMemberInfo();
        },
        fail(res) {
          console.log(res);
        },
      });
    },
  },
};
</script>

<style>
.box {
  width: 100%;
  padding-top: 30rpx;
}
.swiper-box {
  height: 320rpx;
}

.professional,
.members {
  width: 95%;
  height: 320rpx;
  background: url(../../static/img/my/huiyuan1.png) no-repeat 0px 0px;
  background-size: 100% 320rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.members {
  background: url(../../static/img/my/huiyuan2.png) no-repeat 0px 0px;
}
  
.user-info {
  display: flex;
  width: 100%;
  height: 100rpx;
  align-items: center;
  margin: 40rpx 0rpx 60rpx;
  letter-spacing: 2rpx;
}

.user-info .img {
  display: block;
  border-radius: 50%;
  width: 84rpx;
  height: 84rpx;
  margin: 0rpx 40rpx;
}

.detail {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100rpx;
}

.name {
  display: flex;
  align-items: center;

  font-size: 16px;
  font-weight: 400;
  line-height: 44rpx;
  color: #ffffff;
}

.name image {
  width: 36rpx;
  height: 36rpx;
  margin-left: 20rpx;
}

.deadline {
  font-size: 12px;
  font-weight: 400;
  line-height: 34rpx;
  color: #ffffff;
}

.handle {
  display: flex;
  width: 100%;
}

.renew {
  width: 152rpx;
  height: 60rpx;
  margin-left: 164rpx;
  background: #ffffff;
  text-align: center;
  line-height: 60rpx;
  font-size: 24rpx;
  color: #273253;
  border-radius: 30rpx;
}

.privilege {
  padding: 0rpx 60rpx;
}

.pro .title {
  width: 100%;
  height: 44rpx;
  font-size: 16px;
  font-weight: 400;
  line-height: 44rpx;
  color: #273253;
}
.pro {
  position: relative;
}
.items {
  display: flex;
  flex-wrap: wrap;
}

.item {
  display: flex;
  width: 25%;
  flex-direction: column;
  align-items: center;
  margin-top: 60rpx;
}

.item-img {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100rpx;
  height: 100rpx;
  background: #ffffff;
  border: 1px solid #ed5c4d;
  border-radius: 50%;
}

.item-img image {
  width: 60rpx;
  height: 60rpx;
}
.item text {
  font-size: 24rpx;
  font-weight: 400;
  line-height: 40rpx;
  margin-top: 20rpx;
  color: #273253;
}
.cost {
  position: absolute;
  top: 300rpx;
  left: 0rpx;
  width: 100%;
  height: 88rpx;
  background: #ed5c4d;
  margin-top: 300rpx;
  line-height: 88rpx;
  text-align: center;
  border-radius: 24px;
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
}
</style>
