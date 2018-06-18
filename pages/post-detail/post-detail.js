// pages/post-detail/pots-detail.js
import { DBPost } from '../../db/DBPost.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onCollectionTab: function (event) {
    var newData = this.dbPost.collect();
    //选择更新部分数据
    this.setData({
      'data.collectNum': newData.collectNum,
      'data.collectStatus': newData.collectStatus
    });

    wx.showToast({
      title: newData.collectStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    });

  },

  onUpTab: function (event) {
    var newData = this.dbPost.up();
    //选择更新部分数据
    this.setData({
      'data.readingNum': newData.readingNum,
      'data.upStatus': newData.upStatus
    });

    wx.showToast({
      title: newData.upStatus ? "点赞成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    });

  },
  //点击评论
  onCommentTab: function (event) {
    var postId = event.currentTarget.dataset.postId;
    console.log("post-detail : postId = " + postId);
    wx.navigateTo({
      url: '../post-comment/post-comment?postId=' + postId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.postId;
    this.dbPost = new DBPost(postId);
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
      data: this.postData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.data.title,
    })
  },
  onCollectionTab: function (event) {
    var newData = this.dbPost.collect();
    //选择更新部分数据
    this.setData({
      'data.collectNum': newData.collectNum,
      'data.collectStatus': newData.collectStatus
    });

    wx.showToast({
      title: newData.collectStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    });

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.postId;
    this.dbPost = new DBPost(postId);
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
      data: this.postData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.data.title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})