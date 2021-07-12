<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
@import "./colorui/main.css";
@import "./colorui/icon.css";
@import "./style/webfont.css";
@import "./style/iconfont.css";
page {
  height: 100%;
  /* padding-top: 20rpx; */
  font-family: "webfont" !important;
  font-style: normal;
}
</style>
