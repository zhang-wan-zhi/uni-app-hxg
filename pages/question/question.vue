<template>
  <view class="box">
    <view class="type">
      <text v-show="questionList[currentIndex].type == 1">单选题</text>
      <text v-show="questionList[currentIndex].type == 2">多选题</text>
      <text></text>
      <text>{{ ' ' + (currentIndex + 1) + '/' + questionList.length }}</text>
    </view>
    <view class="questions-box">
      <view class="list-box" :style="{ top: -currentIndex * 800 + 'rpx' }">
        <view class="list" v-for="(item1, index1) in questionList" :key="index1">
          <!-- 如果是单选题 -->
          <view v-if="item1.type == 1">
            <view class="title" v-html="item1.title"></view>
            <view class="options">
              <view class="option " :class="{ checked: index2 === item1.checkedIndex }" v-for="(item2, index2) in item1.options" @click="danxuan(index2)" :key="index2">
                <rich-text :nodes="item2"></rich-text>
              </view>
            </view>
          </view>
          <!-- 如果是多选题 -->
          <view v-else-if="item1.type == 2">
            <view class="title">{{ item1.title }}</view>
            <view class="options">
              <view class="option " :class="{ checked: item1.checkedIndex.indexOf(index2) != -1 }" v-for="(item2, index2) in item1.options" @click="duoxuan(index2)" :key="index2">
                <rich-text :nodes="item2"></rich-text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="control">
      <view class="last" @click="last">上一题</view>
      <view class="next" @click="next" v-show="!(currentIndex == questionList.length - 1)">下一题</view>
      <view class="submit" @click="submit" v-show="currentIndex == questionList.length - 1">提交</view>
    </view>
  </view>
</template>

<script>
import { getyikaoTikuList_one_all } from "../../api/api.js";
export default {
  data() {
    return {
      questionList: [
        {
          title: "海上生明月，天涯共此时是谁的名句？",
          options: ["王勃", "张九龄", "张若虚", "卢照邻"],
          checkedIndex: -1,
          rightIndex: 0,
          type: 1,
          score: 10,
        },
        {
          title: "下面选项中不属于晚清四大谴责小说的是？",
          options: [
            "吴趼人《二十年目睹之怪现状》",
            "关汉卿《窦娥冤》	",
            "李宝嘉《官场现形记》",
            "刘鹗《老残游记》",
          ],
          checkedIndex: -1,
          rightIndex: 1,
          type: 1,
          score: 10,
        },
        {
          title: "选出欧美三大短篇小说大师",
          options: [
            "（法）莫泊桑",
            "（俄）契科夫",
            "（英）狄更斯",
            "（美）欧亨利",
          ],
          checkedIndex: [],
          rightIndex: [0, 1, 3],
          type: 2,
          score: 10,
        },
      ],
      // 当前题目索引
      currentIndex: 0,
    };
  },
  onLoad(id) {
    console.log(id);
    getyikaoTikuList_one_all(id.id).then((res) => {
      console.log(res.data.data);
      res.data.data.forEach((item, index) => {
        let obj = {};
        obj.title = item.content;
        obj.options = [];
        obj.rightIndex = "";
        obj.type = 1;
        obj.score = 10;
        obj.checkedIndex = -1;
        item.answers.forEach((item, index) => {
          obj.options.push(item.content);
          if (item.isRight == 1) {
            obj.rightIndex = index;
          }
        });
        this.questionList.push(obj);
      });
    });
    console.log(this.questionList);
  },
  methods: {
    // 单选题逻辑
    danxuan(index) {
      this.questionList[this.currentIndex].checkedIndex = index;
    },
    // 多选题逻辑
    duoxuan(index) {
      // 判断是否已经选定
      let arr = this.questionList[this.currentIndex].checkedIndex;
      let isCheck = arr.indexOf(index);
      // 如果没有被选定
      if (isCheck == -1) {
        arr.unshift(index);
      } else {
        // 如果被选定
        arr.splice(isCheck, 1);
      }
    },
    // 上一题
    last() {
      if (this.currentIndex <= 0) {
        uni.showToast({
          title: "已经到第一题了",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      this.currentIndex--;
    },
    // 下一题
    next() {
      this.currentIndex++;
    },
    // 提交
    submit() {
      console.log(this.questionList);
      // 判断是否登录
      let openid = uni.getStorageSync("openid");
      if (openid == "") {
        uni.showModal({
          title: "提示",
          content: "请您先去登录，然后开始测试",
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定");
              uni.reLaunch({
                url: "../gerenzhongxin/gerenzhongxin",
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
        return false;
      }
      // 判断是否有题目未作答
      let flag = false;
      this.questionList.forEach((item, index) => {
        if (item.checkedIndex == -1) {
          flag = true;
        }
      });
      if (flag) {
        uni.showToast({
          title: "您有题目未作答",
          duration: 2000,
          icon: "none",
        });
        return false;
      }
      // 计算表示正确数，错误数
      let right = 0;
      let error = 0;
      let score = 0;
      this.questionList.forEach((item, index) => {
        // 如果是多选题
        if (item.checkedIndex instanceof Array) {
          item.checkedIndex.sort();
          // console.log(item.checkedIndex);
          if (
            JSON.stringify(item.checkedIndex) == JSON.stringify(item.rightIndex)
          ) {
            right++;
            score = score + 10;
          } else {
            error++;
          }
        } else {
          // 如果是单选或者判断题
          if (item.checkedIndex == item.rightIndex) {
            right++;
            score = score + 10;
          } else {
            error++;
          }
        }
      });
      console.log(score, right, error);
      uni.redirectTo({
        url:
          "../chengjidan/chengjidan?score=" +
          score +
          "&right=" +
          right +
          "&error=" +
          error,
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  padding: 40rpx;
}
.type {
  height: 50rpx;
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  color: #a9afb8;
}
.questions-box {
  position: relative;
  width: 100%;
  height: 800rpx;
  margin-top: 50rpx;
  overflow: hidden;
}
.list-box {
  position: absolute;
  left: 0rpx;
  width: 100%;
}
.list {
  height: 800rpx;
  width: 100%;
}
.title {
  font-size: 18px;
  font-weight: 400;
  height: 60rpx;
  line-height: 60rpx;
  color: #242448;
}
.option {
  min-width: 200rpx;

  height: 80rpx;
  margin-top: 50rpx;
  padding-left: 30rpx;
  font-size: 14px;
  font-weight: 400;

  line-height: 80rpx;
  color: #273253;

  border-radius: 80rpx;
  background-color: #ffffff;
}
.checked {
  background-color: #fbbe4b;
}
.control {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.last,
.next,
.submit {
  width: 172rpx;

  height: 60rpx;
  text-align: center;

  line-height: 60rpx;
  background: #fbbe4b;

  border-radius: 60rpx;
  color: #ffffff;
}
</style>
