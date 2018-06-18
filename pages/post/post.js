// pages/post/post.js
// var dataObj = require("../../data/data.js");
// var DBPost = require("../../db/DBPost.js").DBPost;
import { DBPost } from '../../db/DBPost.js';//ES6 导入用法


Page({

  /**
   * 页面的初始数据
   */
  data: {
  },


  onTabToDetail: function (event) {
    //组件上获取参数
    var postId = event.currentTarget.dataset.postId;
    console.log(postId)
    wx.navigateTo({
      url: '../post-detail/post-detail?postId='+postId

    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad:页面被加载");
    var dbPost = new DBPost("");
    this.setData({
      postList: dbPost.getAllPostData()
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady:监听页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow:监听页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide:监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload:监听页面卸载");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh:监听用户下拉动作");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom:页面上拉触底事件的处理函数");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage:用户点击右上角分享");
  }
})